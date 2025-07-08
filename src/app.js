// app.js (Orquestador principal)
import Header from './componets/Header';
import SearchBox from './componets/SearchBox';
import AdvancedSearch from './componets/AdvancedSearch';
import Filters from './componets/Filters';
import ResultCard from './componets/ResultCard';
import Pagination from './componets/Pagination';
import StatsSection from './componets/StatsSection';
import Messages from './componets/Messages';
import ParticlesBackground from './componets/ParticlesBackground';

import apiService from './services/apiService';
import statsService from './services/statsService';

import * as DomUtils from './utils/domUtils';
import eventHandlers from './utils/eventHandlers';
import animations from './utils/animations';
import KeyboardShortcuts from './utils/keyboardShortcuts';
import VoiceSearch from './utils/voiceSearch';
import helpers from './utils/helpers';

const app = (() => {
    // Estado global de la aplicación (variables antes globales)
    let currentPage = 1;
    let currentQuery = '';
    let currentFilter = 'all';
    let currentSort = 'relevance'; // Añadido para el ordenamiento

    const resultsGrid = DomUtils.getById('resultsGrid');
    const resultsInfoElement = DomUtils.getById('resultsInfo');

    const init = () => {
        // Inicializar componentes que no dependen de la búsqueda
        ParticlesBackground.createParticles();
        Header.init();
        AdvancedSearch.init();
        KeyboardShortcuts.init();
        helpers.detectDarkMode();
        Messages.showWelcomeMessage(); // Muestra el mensaje de bienvenida
        animations.addScrollEffects();
        animations.addTypingEffect();

        // Cargar estadísticas iniciales y actualizar UI
        const initialStats = statsService.loadStats();
        StatsSection.update(initialStats);

        // Inicializar SearchBox, pasándole la función de búsqueda principal
        SearchBox.init(handleSearch);

        // Inicializar VoiceSearch, pasándole la función de búsqueda principal
        VoiceSearch.init(handleSearch);

        // Inicializar Filters y Sort, pasándoles los callbacks
        Filters.init(handleFilterChange, handleSortChange);

        // Inicializar paginación
        Pagination.init(handlePageChange);

        // setTimeout para animaciones que no son críticas en el primer renderizado
        setTimeout(() => {
            animations.addEntryAnimations(); // Para las tarjetas de resultados cuando aparezcan
        }, 500); // Pequeño retraso
    };

    const handleSearch = async () => {
        const query = SearchBox.getSearchQuery();
        if (!query) {
            Messages.showError('Por favor, ingresa un término de búsqueda.');
            return;
        }

        currentQuery = query;
        currentPage = 1; // Siempre resetear a la primera página en una nueva búsqueda
        performSearchAPI();
    };

    const handleFilterChange = (filter) => {
        currentFilter = filter;
        currentPage = 1; // Resetear página al cambiar filtro
        if (currentQuery) { // Solo si ya hay una búsqueda activa
            performSearchAPI();
        }
    };

    const handleSortChange = (sort) => {
        currentSort = sort;
        // La API de Google Custom Search no tiene un parámetro de ordenación directo.
        // Si se necesitara, habría que ordenar los resultados DESPUÉS de recibirlos,
        // o si usaras otra API que sí lo soporte, pasarle el parámetro.
        // Por ahora, solo se actualizaría `currentSort` para un uso futuro.
        if (currentQuery) { // Solo si ya hay una búsqueda activa
            performSearchAPI();
        }
    };

    const handlePageChange = (page) => {
        currentPage = page;
        performSearchAPI();
    };

    const performSearchAPI = async () => {
        const startTime = Date.now();
        Messages.showLoading();
        Messages.hideResultsSection();

        try {
            const data = await apiService.performSearch(currentQuery, currentFilter, currentPage);

            const endTime = Date.now();
            const searchTime = ((endTime - startTime) / 1000).toFixed(2);

            if (data.items && data.items.length > 0) {
                displayResults(data.items, data.searchInformation, searchTime);
                const updatedStats = statsService.updateStats(currentQuery, parseFloat(searchTime), true);
                StatsSection.update(updatedStats);
            } else {
                Messages.showNoResults();
                const updatedStats = statsService.updateStats(currentQuery, parseFloat(searchTime), false);
                StatsSection.update(updatedStats);
            }
        } catch (error) {
            console.error('Error en la búsqueda:', error);
            Messages.showError('Error al realizar la búsqueda. Por favor, intenta nuevamente.');
            const updatedStats = statsService.updateStats(currentQuery, 0, false);
            StatsSection.update(updatedStats);
        } finally {
            Messages.hideLoading();
        }
    };

    const displayResults = (items, searchInfo, searchTime) => {
        Messages.showResultsSection();

        // Actualizar información de resultados
        resultsInfoElement.textContent = `Aproximadamente ${searchInfo.formattedTotalResults || items.length} resultados (${searchTime} segundos)`;

        // Generar HTML de resultados
        const resultsHTML = items.map(item => ResultCard.create(item)).join('');
        resultsGrid.innerHTML = resultsHTML;

        // Mostrar paginación
        Pagination.show(searchInfo, currentPage);

        // Añadir botón de exportación si no existe
        Filters.addExportButton(() => helpers.exportResults(currentQuery));

        // Scroll a resultados
        DomUtils.getById('resultsSection').scrollIntoView({ behavior: 'smooth' });

        // Aplicar animaciones a los resultados recién cargados
        animations.addEntryAnimations();
    };


    return {
        init,
        // Cualquier otra función o estado que deba ser accesible globalmente si es necesario
    };
})();

export default app;