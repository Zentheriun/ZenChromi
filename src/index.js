// index.js (Punto de entrada de JavaScript)
import app from './app';
import './assets/css/style.scss'; // Importar el SCSS para que Webpack lo compile

document.addEventListener('DOMContentLoaded', app.init);

import themeManager from './services/themeManager';
import SearchBox from './componets/SearchBox';
// ... otras importaciones

document.addEventListener('DOMContentLoaded', () => {
  themeManager.init();
  SearchBox.init(/* tu callback de búsqueda */);
  // …más inicializadores
});
