// ParticlesBackground.js
import * as DomUtils from '../utils/domUtils';

const ParticlesBackground = (() => {
    const particlesContainer = DomUtils.getById('particles');

    const createParticles = () => {
        const particleCount = 50;
        if (!particlesContainer) return; // Asegurarse de que el contenedor existe

        for (let i = 0; i < particleCount; i++) {
            const particle = DomUtils.create('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
            particlesContainer.appendChild(particle);
        }
    };

    return {
        createParticles,
    };
})();

export default ParticlesBackground;