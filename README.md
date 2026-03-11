# Jiten Rai — Personal Portfolio

> A clean, responsive personal portfolio website built with vanilla HTML, CSS, and JavaScript.

**Live Site:** [jitenrai.com.np](https://jitenrai.com.np)

---

## Overview

This is the source code for my personal portfolio website — a fully static site designed to showcase who I am, my skills, projects, and how to get in touch with me. It requires no backend, no build tools, and no frameworks — just open the files in a browser.

---

## Pages

| Page | Description |
|---|---|
| `index.html` | Landing page with hero section, featured projects, and skills overview |
| `about.html` | Personal background, mission, education, and live GitHub language stats |
| `resume.html` | Work experience, education timeline, and downloadable CV |
| `contact.html` | Contact form (Formspree), email, phone, and social links |

---

## Features

- **Fully Responsive** — Mobile-first layout that adapts across all screen sizes
- **GitHub-Powered Skills** — Live language usage statistics fetched from the GitHub API and displayed as animated skill bars
- **Animated Skill Bars** — Smooth scroll-triggered bar animations using `IntersectionObserver`
- **Typed Text Effect** — Dynamic typewriter effect on the hero section
- **Scroll Reveal Animations** — Elements animate into view as you scroll
- **Static Contact Form** — Powered by [Formspree](https://formspree.io) — no backend required
- **Client-Side Form Validation** — Real-time input validation with helpful error messages
- **Sticky Header** — Navigation bar with scroll-aware shadow effect
- **Hamburger Mobile Menu** — Accessible toggle menu for small screens
- **Font Awesome Icons** — Consistent iconography throughout
- **Google Fonts** — Custom typography using Noto Serif Display & Questrial

---

## Technologies Used

| Category | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 (Custom Properties, Flexbox, Grid) |
| Scripting | Vanilla JavaScript (ES6+) |
| Icons | Font Awesome 6.5 |
| Fonts | Google Fonts (Noto Serif Display, Questrial) |
| Contact Form | Formspree |
| Language Stats | GitHub REST API v3 |
| Hosting | Cloudflare Pages |

---

## Local Setup

No installation or build step is required.

1. **Clone the repository**
   ```bash
   git clone https://github.com/Jitenrai21/Personal_portfolio.git
   cd Personal_portfolio
   ```

2. **Open in browser**

   Simply open `index.html` in any modern browser:
   ```bash
   # Windows
   start index.html

   # macOS
   open index.html

   # Linux
   xdg-open index.html
   ```

   Or use the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension in VS Code for hot reload during development.

3. **Configure the contact form** *(optional)*

   To receive messages from the contact form:
   - Sign up at [formspree.io](https://formspree.io)
   - Create a new form and copy your form endpoint ID
   - Replace `YOUR_FORM_ID` in `contact.html` with your actual ID:
     ```html
     <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
     ```

---

## Project Structure

```
Personal_portfolio/
├── index.html          # Home page
├── about.html          # About page
├── resume.html         # Resume page
├── contact.html        # Contact page
├── script.js           # All JavaScript (typed effect, scroll reveal, form, GitHub API)
└── assets/
    ├── css/
    │   └── style.css   # All styles
    └── images/         # Logo, profile photos, project images
```

---

## Credits

- [Font Awesome](https://fontawesome.com) — Icon library
- [Google Fonts](https://fonts.google.com) — Noto Serif Display & Questrial typefaces
- [Formspree](https://formspree.io) — Static form backend
- [GitHub REST API](https://docs.github.com/en/rest) — Live language statistics

---

<p align="center">Designed & built by <a href="https://jitenrai.com.np">Jiten Rai</a> &copy; 2026</p>
