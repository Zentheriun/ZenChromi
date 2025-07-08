// voiceSearch.js
import * as DomUtils from './domUtils';
import eventHandlers from './eventHandlers';

const VoiceSearch = (() => {
    const searchInput = DomUtils.getById('searchInput');
    const searchBox = DomUtils.getById('searchBox');
    let performSearchCallback = null;

    const init = (callback) => {
        performSearchCallback = callback;
        if ('webkitSpeechRecognition' in window) {
            addVoiceButton();
        }
    };

    const addVoiceButton = () => {
        const voiceBtn = DomUtils.create('button');
        voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        voiceBtn.className = 'voice-btn';
        voiceBtn.style.cssText = `
            position: absolute;
            right: 70px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: var(--text-secondary);
            cursor: pointer;
            font-size: 1.2rem;
            transition: color 0.3s ease;
        `;

        eventHandlers.add(voiceBtn, 'click', startVoiceRecognition);
        DomUtils.appendChild(searchBox, voiceBtn);

        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'es-ES';

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            if (searchInput) searchInput.value = transcript;
            voiceBtn.style.color = 'var(--text-secondary)';
            if (performSearchCallback) {
                performSearchCallback();
            }
        };

        recognition.onerror = () => {
            voiceBtn.style.color = 'var(--text-secondary)';
            console.error('Error en reconocimiento de voz.');
        };

        recognition.onend = () => {
            voiceBtn.style.color = 'var(--text-secondary)';
        };

        function startVoiceRecognition() {
            voiceBtn.style.color = 'var(--error-color)';
            recognition.start();
        }
    };

    return {
        init,
    };
})();

export default VoiceSearch;