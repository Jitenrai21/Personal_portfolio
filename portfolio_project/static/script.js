document.addEventListener('DOMContentLoaded', () => {
    const addSkillButton = document.getElementById('add-new-skill');
    if (addSkillButton) {
        addSkillButton.addEventListener('click', () => {
            const skillName = document.getElementById('name').value;
            if (!skillName) {
                alert('Enter a skill');
                return;
            }
            fetch('/add_skill/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken'),
                },
                body: JSON.stringify({ skill: skillName }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const skillsList = document.getElementById('skills-list');
                    const li = document.createElement('li');
                    li.textContent = skillName;
                    skillsList.appendChild(li);
                    document.getElementById('name').value = '';
                } else {
                    alert('Error adding skill');
                }
            });
        });
    }

    const homeBtn = document.getElementById('home-btn');
    if (homeBtn) {
        homeBtn.addEventListener('click', () => {
            window.location.href = '/';
        });
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    // Add toggleMenu function for responsive menu
    window.toggleMenu = function() {
        const menu = document.querySelector('.menu');
        menu.classList.toggle('active');
    };
});