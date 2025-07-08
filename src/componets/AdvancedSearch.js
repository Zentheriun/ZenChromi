// AdvancedSearch.js
import * as DomUtils from '../utils/domUtils';
import eventHandlers from '../utils/eventHandlers';

const AdvancedSearch = (() => {
    const toggleAdvancedBtn = DomUtils.getById('toggleAdvanced');
    const advancedSearchElement = DomUtils.getById('advancedSearch');
    const siteFilterInput = DomUtils.getById('siteFilter');
    const fileTypeSelect = DomUtils.getById('fileType');
    const languageSelect = DomUtils.getById('language');
    const dateFilterSelect = DomUtils.getById('dateFilter');

    const init = () => {
        eventHandlers.add(toggleAdvancedBtn, 'click', toggle);
    };

    const toggle = (e) => {
        if (e) e.preventDefault();
        advancedSearchElement.classList.toggle('show');
    };

    const getAdvancedFilters = () => {
        return {
            site: siteFilterInput.value.trim(),
            fileType: fileTypeSelect.value,
            language: languageSelect.value,
            dateRestrict: dateFilterSelect.value,
        };
    };

    return {
        init,
        getAdvancedFilters,
    };
})();

export default AdvancedSearch;