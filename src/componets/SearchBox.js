// SearchBox.js
import * as DomUtils from '../utils/domUtils';
import eventHandlers from '../utils/eventHandlers';
import suggestionsService from '../services/suggestionsService';

const SearchBox = (() => {
    const searchInput = DomUtils.getById('searchInput');
    const searchBtn = DomUtils.getById('searchBtn');
    const searchBoxElement = DomUtils.getById('searchBox');
    const suggestionsElement = DomUtils.getById('suggestions');

    const init = (performSearchCallback) => {
        eventHandlers.add(searchInput, 'input', (e) => handleSearchInput(e, performSearchCallback));
        eventHandlers.add(searchInput, 'focus', handleFocus);
        eventHandlers.add(searchInput, 'blur', handleBlur);
        eventHandlers.add(searchBtn, 'click', performSearchCallback);
    };

    const handleSearchInput = (e, performSearchCallback) => {
        const query = e.target.value.trim();
        if (query.length > 2) {
            showSuggestions(query, performSearchCallback);
        } else {
            hideSuggestions();
        }
    };

    const handleFocus = () => {
        searchBoxElement.classList.add('focused');
    };

    const handleBlur = () => {
        setTimeout(() => {
            searchBoxElement.classList.remove('focused');
            hideSuggestions();
        }, 200); // Pequeño retraso para permitir clics en sugerencias
    };

    const showSuggestions = (query, performSearchCallback) => {
        const filteredSuggestions = suggestionsService.getSuggestions(query);

        if (filteredSuggestions.length > 0) {
            suggestionsElement.innerHTML = filteredSuggestions.map(s =>
                `<div class="suggestion-item" data-suggestion="${s}">${s}</div>`
            ).join('');
            suggestionsElement.style.display = 'block';

            // Añadir event listeners a los nuevos elementos de sugerencia
            suggestionsElement.querySelectorAll('.suggestion-item').forEach(item => {
                eventHandlers.add(item, 'click', () => {
                    selectSuggestion(item.dataset.suggestion, performSearchCallback);
                });
            });
        } else {
            hideSuggestions();
        }
    };

    const hideSuggestions = () => {
        suggestionsElement.style.display = 'none';
        suggestionsElement.innerHTML = ''; // Limpiar para evitar eventos duplicados
    };

    const selectSuggestion = (suggestion, performSearchCallback) => {
        searchInput.value = suggestion;
        hideSuggestions();
        performSearchCallback(); // Ejecutar búsqueda con la sugerencia seleccionada
    };

    const getSearchQuery = () => searchInput.value.trim();
    const clearSearchInput = () => { searchInput.value = ''; };


    return {
        init,
        getSearchQuery,
        clearSearchInput,
    };
})();

export default SearchBox;