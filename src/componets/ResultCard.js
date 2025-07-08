// ResultCard.js
const ResultCard = (() => {
    const create = (item) => {
        const title = item.title || 'Sin título';
        const url = item.link || '#';
        const snippet = item.snippet || 'Sin descripción disponible';
        const displayLink = item.displayLink || new URL(url).hostname;

        // Nota: Las fechas, vistas y estrellas son estáticas/aleatorias en el original.
        // En una app real, vendrían de la API o serían calculadas dinámicamente.
        return `
            <div class="result-card">
                <a href="${url}" target="_blank" class="result-title">${title}</a>
                <a href="${url}" target="_blank" class="result-url">${displayLink}</a>
                <p class="result-snippet">${snippet}</p>
                <div class="result-meta">
                    <span><i class="fas fa-clock"></i> ${new Date().toLocaleDateString()}</span>
                    <span><i class="fas fa-eye"></i> ${Math.floor(Math.random() * 1000)} vistas</span>
                    <span><i class="fas fa-star"></i> ${(Math.random() * 5).toFixed(1)}</span>
                </div>
            </div>
        `;
    };

    return {
        create,
    };
})();

export default ResultCard;