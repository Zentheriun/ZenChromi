// Filters.js
import * as DomUtils from '../utils/domUtils';
import eventHandlers from '../utils/eventHandlers';

const Filters = (() => {
    let onFilterChangeCallback = null;
    let onSortChangeCallback = null;

    const init = (filterChangeCallback, sortChangeCallback) => {
        onFilterChangeCallback = filterChangeCallback;
        onSortChangeCallback = sortChangeCallback;

        DomUtils.getAll('.filter-btn').forEach(btn => {
            eventHandlers.add(btn, 'click', function() {
                DomUtils.getAll('.filter-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                if (onFilterChangeCallback) {
                    onFilterChangeCallback(this.dataset.filter);
                }
            });
        });

        DomUtils.getAll('.sort-btn').forEach(btn => {
            eventHandlers.add(btn, 'click', function() {
                DomUtils.getAll('.sort-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                if (onSortChangeCallback) {
                    onSortChangeCallback(this.dataset.sort);
                }
            });
        });
    };

    // Funciones para obtener los filtros activos si son necesarios desde fuera
    const getCurrentFilter = () => {
        const activeFilterBtn = DomUtils.get('.filter-btn.active');
        return activeFilterBtn ? activeFilterBtn.dataset.filter : 'all';
    };

    const getCurrentSort = () => {
        const activeSortBtn = DomUtils.get('.sort-btn.active');
        return activeSortBtn ? activeSortBtn.dataset.sort : 'relevance';
    };

    const addExportButton = (exportCallback) => {
        const exportBtn = document.createElement('button');
        exportBtn.innerHTML = '<i class="fas fa-download"></i> Exportar';
        exportBtn.className = 'sort-btn';
        exportBtn.style.marginLeft = '10px';
        eventHandlers.add(exportBtn, 'click', exportCallback);

        const resultsSort = DomUtils.get('.results-sort');
        if (resultsSort && !DomUtils.get('.results-sort .sort-btn.export-btn')) { // Evitar duplicados
            resultsSort.appendChild(exportBtn);
        }
    };

    return {
        init,
        getCurrentFilter,
        getCurrentSort,
        addExportButton
    };
})();

export default Filters;