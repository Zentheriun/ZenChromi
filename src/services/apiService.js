// apiService.js
import AdvancedSearch from '../componets/AdvancedSearch'; // Importar para obtener filtros avanzados

const API_KEY = 'AIzaSyDmOh5q_9vRT8G3mnjB_jQSDKsaqM_RsiI'; // Reemplaza con tu clave API real
const CX = 'e45b4d823a45b464b'; // Reemplaza con tu CX real
const BASE_URL = 'https://www.googleapis.com/customsearch/v1';

const apiService = (() => {
    const performSearch = async (query, filterType, currentPage) => {
        if (!query) throw new Error('Query cannot be empty.');

        let searchQuery = query;
        const advancedFilters = AdvancedSearch.getAdvancedFilters();

        if (advancedFilters.site) searchQuery += ` ${advancedFilters.site}`;
        if (advancedFilters.fileType) searchQuery += ` filetype:${advancedFilters.fileType}`;

        let url = `${BASE_URL}?key=${API_KEY}&cx=${CX}&q=${encodeURIComponent(searchQuery)}`;

        if (advancedFilters.language) url += `&lr=lang_${advancedFilters.language}`;
        if (advancedFilters.dateRestrict) url += `&dateRestrict=${advancedFilters.dateRestrict}`;

        const start = (currentPage - 1) * 10 + 1;
        if (start > 1) url += `&start=${start}`;

        // Aplicar tipo de búsqueda (images, news, etc.)
        if (filterType === 'images') url += '&searchType=image';
        // Aquí podrías añadir lógica para otros tipos de búsqueda si la API lo soporta,
        // o si los filtros "news", "videos", "books" son solo para la visualización o para modificar la query.
        // Google Custom Search API tiene `searchType=image`, pero no tiene tipos directos para "news", "videos", "books"
        // a menos que uses otros parámetros o busques en sitios específicos.
        // Para "news", "videos", "books" se necesitaría una lógica más avanzada, como añadir "news" a la query,
        // o usar otras APIs si no se satisface con Custom Search.
        // Por simplicidad, en este ejemplo solo se maneja 'images' directamente.

        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'Error en la petición API');
        }
        return response.json();
    };

    return {
        performSearch,
    };
})();

export default apiService;