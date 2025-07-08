// Messages.js
import * as DomUtils from '../utils/domUtils';

const Messages = (() => {
    const resultsGrid = DomUtils.getById('resultsGrid');
    const resultsSection = DomUtils.getById('resultsSection');
    const loadingElement = DomUtils.getById('loading');

    const showLoading = () => {
        loadingElement.style.display = 'block';
    };

    const hideLoading = () => {
        loadingElement.style.display = 'none';
    };

    const showResultsSection = () => {
        resultsSection.style.display = 'block';
    };

    const hideResultsSection = () => {
        resultsSection.style.display = 'none';
        resultsGrid.innerHTML = ''; // Limpiar resultados al ocultar la sección
    };

    const showNoResults = () => {
        showResultsSection();
        resultsGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No se encontraron resultados</h3>
                <p>Intenta con términos de búsqueda diferentes o más específicos.</p>
            </div>
        `;
    };

    const showError = (message) => {
        showResultsSection();
        resultsGrid.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                ${message}
            </div>
        `;
    };

    const showWelcomeMessage = () => {
        const welcomeDiv = DomUtils.create('div');
        welcomeDiv.className = 'success-message';
        welcomeDiv.innerHTML = `
            <i class="fas fa-hand-peace"></i>
            ¡Bienvenido a ZenChromi! Tu experiencia de búsqueda zen está lista.
        `;
        welcomeDiv.style.position = 'fixed';
        welcomeDiv.style.top = '20px';
        welcomeDiv.style.right = '20px';
        welcomeDiv.style.zIndex = '1000';
        welcomeDiv.style.animation = 'slideInRight 0.5s ease';

        document.body.appendChild(welcomeDiv);

        setTimeout(() => {
            welcomeDiv.remove();
        }, 4000);
    };

    return {
        showLoading,
        hideLoading,
        showResultsSection,
        hideResultsSection,
        showNoResults,
        showError,
        showWelcomeMessage,
    };
})();

export default Messages;