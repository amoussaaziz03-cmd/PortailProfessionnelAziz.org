document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Menu Mobile ---
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Changement d'icône (optionnel)
            menuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });

        // Fermer le menu quand on clique sur un lien
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuBtn.textContent = '☰';
            });
        });
    }

    // --- 2. Validation du Formulaire ---
    const form = document.getElementById('contactForm');
    const successMsg = document.getElementById('form-success');

    if (form) {
        const isRequired = value => value.trim() !== '';
        const isEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

        const showError = (input, message) => {
            const formGroup = input.closest('.form-group');
            const errorDisplay = formGroup.querySelector('.error-message');
            
            if (errorDisplay) {
                errorDisplay.textContent = message;
                input.setAttribute('aria-invalid', 'true');
            }
            input.style.borderColor = '#d32f2f';
        };

        const showSuccess = (input) => {
            const formGroup = input.closest('.form-group');
            const errorDisplay = formGroup.querySelector('.error-message');
            
            if (errorDisplay) {
                errorDisplay.textContent = '';
                input.setAttribute('aria-invalid', 'false');
            }
            input.style.borderColor = '#2a9d8f'; // Vert émeraude
        };

        const validateInput = (input) => {
            if (input.id === 'name') {
                if (!isRequired(input.value)) {
                    showError(input, 'Le nom est requis.');
                    return false;
                } else {
                    showSuccess(input);
                    return true;
                }
            }
            
            if (input.id === 'email') {
                if (!isRequired(input.value)) {
                    showError(input, 'L\'email est requis.');
                    return false;
                } else if (!isEmail(input.value)) {
                    showError(input, 'Format d\'email invalide.');
                    return false;
                } else {
                    showSuccess(input);
                    return true;
                }
            }

            if (input.id === 'message') {
                if (!isRequired(input.value)) {
                    showError(input, 'Le message ne peut pas être vide.');
                    return false;
                } else {
                    showSuccess(input);
                    return true;
                }
            }
            return true;
        };

        // Écouteurs d'événements (validation au flou et à la frappe)
        form.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('blur', () => validateInput(input));
            input.addEventListener('input', () => {
                if (input.getAttribute('aria-invalid') === 'true') {
                    validateInput(input);
                }
            });
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isFormValid = true;
            form.querySelectorAll('input, textarea').forEach(input => {
                if (!validateInput(input)) isFormValid = false;
            });

            if (isFormValid) {
                // Simulation d'envoi
                form.reset();
                successMsg.hidden = false;
                
                // Cacher le message après 5s
                setTimeout(() => {
                    successMsg.hidden = true;
                }, 5000);
            }
        });
    }

    // --- 3. Animation des barres de progression ---
    // Déclenchée quand la section est visible
    const observerOptions = { threshold: 0.5 };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('.progress-bar .fill');
                bars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0'; // Reset pour l'animation
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const expertisesSection = document.querySelector('.expertises');
    if (expertisesSection) {
        observer.observe(expertisesSection);
    }
});
// --- Animation du Footer au scroll ---
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Déclenche quand 15% du footer est visible
};

const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            footerObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const footer = document.querySelector('footer');
if (footer) {
    footerObserver.observe(footer);
}
