// StatsSection.js
import * as DomUtils from '../utils/domUtils';

const StatsSection = (() => {
    const totalSearchesElement = DomUtils.getById('totalSearches');
    const avgTimeElement = DomUtils.getById('avgTime');
    const topQueryElement = DomUtils.getById('topQuery');
    const successRateElement = DomUtils.getById('successRate');

    const update = (stats) => {
        totalSearchesElement.textContent = stats.totalSearches;
        avgTimeElement.textContent = stats.avgTime.toFixed(1) + 's';
        topQueryElement.textContent = stats.topQuery || '-';
        successRateElement.textContent = stats.successRate + '%';
    };

    return {
        update,
    };
})();

export default StatsSection;