// keyboardShortcuts.js
import * as DomUtils from './domUtils';
import eventHandlers from './eventHandlers';

const KeyboardShortcuts = (() => {
    const searchInput = DomUtils.getById('searchInput');
    const suggestions = DomUtils.getById('suggestions');

    const init = () => {
        eventHandlers.add(document, 'keydown', handleKeyDown);
    };

    const handleKeyDown = (e) => {
        // Ctrl + K para enfocar búsqueda
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }

        // Escape para limpiar búsqueda y ocultar sugerencias
        if (e.key === 'Escape') {
            searchInput.value = '';
            searchInput.blur();
            if (suggestions) suggestions.style.display = 'none'; // Asegurarse de que suggestions existe
        }
    };

    return {
        init,
    };
})();

export default KeyboardShortcuts;