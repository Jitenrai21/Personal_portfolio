/* =============================================
   JITEN RAI PORTFOLIO — script.js
   Features:
     1. Sticky header shadow on scroll
     2. Hamburger mobile menu toggle
     3. Typed text effect on hero
     4. Scroll reveal (IntersectionObserver)
     5. Animated skill bars (about page)
     6. Contact form validation + success state
     7. Active nav link highlight
   ============================================= */

'use strict';

/* -------------------------------------------
   1. STICKY HEADER — add shadow when scrolled
------------------------------------------- */
const siteHeader = document.getElementById('site-header');
if (siteHeader) {
    window.addEventListener('scroll', () => {
        siteHeader.classList.toggle('scrolled', window.scrollY > 10);
    });
}

/* -------------------------------------------
   2. HAMBURGER MENU TOGGLE
------------------------------------------- */
const menuToggle = document.getElementById('menu-toggle');
const mainMenu   = document.getElementById('main-menu');

if (menuToggle && mainMenu) {
    const toggleMenu = () => {
        const isOpen = mainMenu.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', isOpen);
        // swap icon
        const icon = menuToggle.querySelector('i');
        icon.classList.toggle('fa-bars',  !isOpen);
        icon.classList.toggle('fa-times',  isOpen);
    };

    menuToggle.addEventListener('click', toggleMenu);
    menuToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleMenu(); }
    });

    // Close menu when a link is clicked (mobile UX)
    mainMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mainMenu.classList.remove('active');
            menuToggle.querySelector('i').className = 'fas fa-bars';
        });
    });
}

/* -------------------------------------------
   3. TYPED TEXT EFFECT (hero tagline)
------------------------------------------- */
const typedEl = document.getElementById('typed-text');
if (typedEl) {
    const phrases = [
        'BIT Student',
        'Python Developer',
        'ML Enthusiast',
        'Aspiring AI Engineer',
        'Data Science Learner',
        'Footballer for Fun'
    ];
    let pIdx = 0, cIdx = 0, deleting = false;

    const TYPE_SPEED   = 80;
    const DELETE_SPEED = 40;
    const PAUSE_AFTER  = 1800;
    const PAUSE_BEFORE = 400;

    function type() {
        const current = phrases[pIdx];
        if (!deleting) {
            typedEl.textContent = current.slice(0, ++cIdx);
            if (cIdx === current.length) {
                deleting = true;
                return setTimeout(type, PAUSE_AFTER);
            }
        } else {
            typedEl.textContent = current.slice(0, --cIdx);
            if (cIdx === 0) {
                deleting = false;
                pIdx = (pIdx + 1) % phrases.length;
                return setTimeout(type, PAUSE_BEFORE);
            }
        }
        setTimeout(type, deleting ? DELETE_SPEED : TYPE_SPEED);
    }
    setTimeout(type, 600);
}

/* -------------------------------------------
   4. SCROLL REVEAL (IntersectionObserver)
------------------------------------------- */
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealEls.forEach(el => revealObserver.observe(el));
}

/* -------------------------------------------
   5. ANIMATED SKILL BARS (about.html)
------------------------------------------- */
const skillBars = document.querySelectorAll('.skill-bar-fill');
if (skillBars.length) {
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.getAttribute('data-width') + '%';
                // Small delay so the reveal animation plays first
                setTimeout(() => { bar.style.width = targetWidth; }, 200);
                barObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });

    skillBars.forEach(bar => barObserver.observe(bar));
}

/* -------------------------------------------
   6. CONTACT FORM — client-side validation
      Works with Formspree (static-hosting safe)
------------------------------------------- */
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

if (contactForm) {
    const validate = () => {
        let valid = true;
        const rules = [
            { id: 'contact-name',    fg: 'fg-name',    test: v => v.trim().length >= 2 },
            { id: 'contact-email',   fg: 'fg-email',   test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
            { id: 'contact-subject', fg: 'fg-subject', test: v => v.trim().length >= 2 },
            { id: 'contact-message', fg: 'fg-message', test: v => v.trim().length >= 10 },
        ];

        rules.forEach(({ id, fg, test }) => {
            const input = document.getElementById(id);
            const group = document.getElementById(fg);
            if (!input || !group) return;
            const ok = test(input.value);
            group.classList.toggle('has-error', !ok);
            if (!ok) valid = false;
        });

        return valid;
    };

    // Live clearing of error on input
    contactForm.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('input', () => {
            const fg = field.closest('.form-group');
            if (fg) fg.classList.remove('has-error');
        });
    });

    // Keep _replyto and _subject in sync with user inputs
    const emailInput   = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const replyToField = document.getElementById('_replyto');
    const subjectField = document.getElementById('_subject');

    if (emailInput && replyToField) {
        emailInput.addEventListener('input', () => { replyToField.value = emailInput.value; });
    }
    if (subjectInput && subjectField) {
        subjectInput.addEventListener('input', () => {
            subjectField.value = subjectInput.value.trim() || 'New message from portfolio contact form';
        });
    }

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!validate()) return;

        // Guard: warn if Formspree ID hasn't been set yet
        if (contactForm.action.includes('YOUR_FORM_ID')) {
            alert('Contact form is not yet configured. Please set up your Formspree form ID.');
            return;
        }

        // Sync hidden fields one final time before submitting
        if (emailInput && replyToField)   replyToField.value = emailInput.value;
        if (subjectInput && subjectField) subjectField.value = subjectInput.value.trim() || 'New message from portfolio contact form';

        const btn = contactForm.querySelector('[type="submit"]');
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                contactForm.reset();
                // Reset synced hidden fields too
                if (replyToField)  replyToField.value  = '';
                if (subjectField)  subjectField.value  = 'New message from portfolio contact form';
                contactForm.style.display = 'none';
                if (formSuccess) formSuccess.classList.add('show');
            } else {
                const data = await response.json().catch(() => ({}));
                const msg  = data?.errors?.[0]?.message || 'Something went wrong.';
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                alert(msg + ' You can also email me directly at info@jitenrai.com.np');
            }
        } catch {
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            alert('Network error. Please try again or email me directly at info@jitenrai.com.np');
        }
    });
}

/* -------------------------------------------
   7. ACTIVE NAV LINK HIGHLIGHT (based on URL)
------------------------------------------- */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.menu ul li a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
    } else {
        // Remove active class set in HTML if it doesn't match the current page
        // (prevents highlighting the wrong link when navigating)
        if (href !== currentPage) link.classList.remove('active');
    }
});

