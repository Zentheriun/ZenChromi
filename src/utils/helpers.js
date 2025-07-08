// helpers.js
import * as DomUtils from './domUtils';

const helpers = (() => {
    const exportResults = (currentQuery) => {
        const results = DomUtils.getAll('.result-card');
        let exportData = `Resultados de búsqueda para: "${currentQuery}"\n\n`;

        results.forEach((result, index) => {
            const title = result.querySelector('.result-title')?.textContent || 'N/A';
            const url = result.querySelector('.result-url')?.textContent || 'N/A';
            const snippet = result.querySelector('.result-snippet')?.textContent || 'N/A';

            exportData += `${index + 1}. ${title}\n`;
            exportData += `URL: ${url}\n`;
            exportData += `Descripción: ${snippet}\n\n`;
        });

        const blob = new Blob([exportData], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = DomUtils.create('a');
        a.href = url;
        a.download = `zenchroni_results_${currentQuery}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const detectDarkMode = () => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            DomUtils.addClass(document.body, 'dark-mode');
        }
    };

    return {
        exportResults,
        detectDarkMode,
    };
})();

export default helpers;