// eventHandlers.js
const eventHandlers = (() => {
    // Un simple registro de event listeners para facilitar la limpieza o el debug
    const listeners = [];

    const add = (element, eventType, handler, options = false) => {
        if (!element) {
            console.warn(`Elemento no encontrado para el evento ${eventType}.`);
            return;
        }
        element.addEventListener(eventType, handler, options);
        listeners.push({ element, eventType, handler, options });
    };

    const remove = (element, eventType, handler, options = false) => {
        if (!element) return;
        element.removeEventListener(eventType, handler, options);
        // Opcional: remover del array de listeners si se implementa una gestión más robusta
    };

    const removeAll = () => {
        listeners.forEach(({ element, eventType, handler, options }) => {
            element.removeEventListener(eventType, handler, options);
        });
        listeners.length = 0; // Vaciar el array
    };

    return {
        add,
        remove,
        removeAll, // Útil para limpiar en tests o al desmontar componentes complejos
    };
})();

export default eventHandlers;