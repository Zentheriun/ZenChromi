// statsService.js
const STATS_KEY = 'zenchromiSearchStats'; // Clave para localStorage

const statsService = (() => {
    let searchStats = {
        totalSearches: 0,
        avgTime: 0,
        topQuery: '',
        successRate: 100,
        searchHistory: []
    };

    const loadStats = () => {
        const storedStats = localStorage.getItem(STATS_KEY);
        if (storedStats) {
            searchStats = JSON.parse(storedStats);
        }
        return { ...searchStats }; // Devolver una copia para no modificar directamente el estado interno
    };

    const saveStats = () => {
        localStorage.setItem(STATS_KEY, JSON.stringify(searchStats));
    };

    const updateStats = (query, searchTime, success) => {
        searchStats.totalSearches++;
        searchStats.searchHistory.push({ query, time: searchTime, success });

        // Limitar historial para no sobrecargar el localStorage
        if (searchStats.searchHistory.length > 50) {
            searchStats.searchHistory.shift();
        }

        // Calcular tiempo promedio
        const successfulSearches = searchStats.searchHistory.filter(s => s.success);
        if (successfulSearches.length > 0) {
            searchStats.avgTime = successfulSearches.reduce((sum, s) => sum + s.time, 0) / successfulSearches.length;
        } else {
            searchStats.avgTime = 0;
        }

        // Encontrar consulta más popular
        const queryCount = {};
        searchStats.searchHistory.forEach(s => {
            queryCount[s.query] = (queryCount[s.query] || 0) + 1;
        });

        let maxCount = 0;
        searchStats.topQuery = '-'; // Reset por si no hay búsquedas
        Object.entries(queryCount).forEach(([q, count]) => {
            if (count > maxCount) {
                maxCount = count;
                searchStats.topQuery = q;
            }
        });

        // Calcular tasa de éxito
        const successCount = searchStats.searchHistory.filter(s => s.success).length;
        searchStats.successRate = searchStats.totalSearches === 0 ? 100 : Math.round((successCount / searchStats.totalSearches) * 100);

        saveStats();
        return { ...searchStats }; // Devolver la copia actualizada
    };

    return {
        loadStats,
        updateStats,
    };
})();

export default statsService;