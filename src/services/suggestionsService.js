// suggestionsService.js
const suggestionsService = (() => {
    const defaultSuggestions = [
        'cómo hacer una página web',
        'inteligencia artificial',
        'recetas de cocina',
        'noticias del día',
        'clima bogotá',
        'tutorial javascript',
        'mejores películas 2024',
        'cómo aprender programación',
        'historia de colombia',
        'efectos css modernos',
        'frameworks javascript 2024',
        'desarrollo web frontend',
        'inteligencia emocional',
        'libros de ciencia ficción'
    ];

    const getSuggestions = (query) => {
        const lowerCaseQuery = query.toLowerCase();
        return defaultSuggestions.filter(s =>
            s.toLowerCase().includes(lowerCaseQuery)
        );
    };

    return {
        getSuggestions,
    };
})();

export default suggestionsService;