// animations.js
import * as DomUtils from './domUtils';

const animations = (() => {
    const searchInput = DomUtils.getById('searchInput');

    const addScrollEffects = () => {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = DomUtils.get('.animated-bg');
            if (parallax) {
                const speed = scrolled * 0.5;
                parallax.style.transform = `translateY(${speed}px)`;
            }
        });
    };

    const addTypingEffect = () => {
        const phrases = [
            'Busca cualquier cosa...',
            'Encuentra tu información...',
            'Descubre nuevos contenidos...',
            'Explora el conocimiento...'
        ];

        let currentPhraseIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;

        function type() {
            if (!searchInput) return;

            const phrase = phrases[currentPhraseIndex];

            if (isDeleting) {
                searchInput.placeholder = phrase.substring(0, currentCharIndex - 1);
                currentCharIndex--;
            } else {
                searchInput.placeholder = phrase.substring(0, currentCharIndex + 1);
                currentCharIndex++;
            }

            if (!isDeleting && currentCharIndex === phrase.length) {
                setTimeout(() => { isDeleting = true; }, 2000);
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            }

            setTimeout(type, isDeleting ? 50 : 100);
        }

        setTimeout(type, 1000);
    };

    const addEntryAnimations = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                }
            });
        });

        DomUtils.getAll('.result-card').forEach(card => {
            observer.observe(card);
        });
    };

    return {
        addScrollEffects,
        addTypingEffect,
        addEntryAnimations,
    };
})();

export default animations;