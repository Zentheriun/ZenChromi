// Pagination.js
import * as DomUtils from '../utils/domUtils';
import eventHandlers from '../utils/eventHandlers';

const Pagination = (() => {
    const paginationElement = DomUtils.getById('pagination');
    let onPageChangeCallback = null;

    const init = (callback) => {
        onPageChangeCallback = callback;
    };

    const show = (searchInfo, currentPage) => {
        const totalResults = parseInt(searchInfo.formattedTotalResults?.replace(/,/g, '') || '0');
        const totalPages = Math.min(Math.ceil(totalResults / 10), 10); // Limitar a 10 páginas como en el original

        if (totalPages <= 1) {
            hide();
            return;
        }

        let paginationHTML = '';

        // Botón anterior
        if (currentPage > 1) {
            paginationHTML += `<button class="page-btn" data-page="${currentPage - 1}">
                <i class="fas fa-chevron-left"></i> Anterior
            </button>`;
        }

        // Números de página
        for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
            const activeClass = i === currentPage ? 'active' : '';
            paginationHTML += `<button class="page-btn ${activeClass}" data-page="${i}">${i}</button>`;
        }

        // Botón siguiente
        if (currentPage < totalPages) {
            paginationHTML += `<button class="page-btn" data-page="${currentPage + 1}">
                Siguiente <i class="fas fa-chevron-right"></i>
            </button>`;
        }

        paginationElement.innerHTML = paginationHTML;
        paginationElement.style.display = 'flex';

        // Añadir event listeners a los nuevos botones de paginación
        paginationElement.querySelectorAll('.page-btn').forEach(btn => {
            eventHandlers.add(btn, 'click', () => {
                const page = parseInt(btn.dataset.page);
                if (onPageChangeCallback) {
                    onPageChangeCallback(page);
                }
            });
        });
    };

    const hide = () => {
        paginationElement.style.display = 'none';
        paginationElement.innerHTML = '';
    };

    return {
        init,
        show,
        hide,
    };
})();

export default Pagination;