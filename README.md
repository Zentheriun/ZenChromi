# ZenChromi - Tu Buscador Zen (Reestructuración Profesional)

Este proyecto es una reestructuración del archivo HTML original de ZenChromi para seguir una arquitectura más modular y profesional, utilizando Webpack para la gestión de assets y la compilación.

## Estructura del Proyecto

La aplicación sigue una estructura de directorios moderna, separando el HTML, CSS (SCSS), y JavaScript en componentes y módulos lógicos.

zenchromi/
├── public/ # Archivos estáticos servidos directamente (HTML, favicon, etc.)
│ ├── index.html
│ └── ...
├── src/ # Código fuente de la aplicación
│ ├── assets/ # Recursos estáticos (CSS/SCSS, imágenes, fuentes)
│ │ ├── css/
│ │ │ ├── base/ # Estilos base (variables, reset, tipografía)
│ │ │ ├── components/ # Estilos por componente UI
│ │ │ ├── layout/ # Estilos de la estructura general
│ │ │ ├── pages/ # Estilos específicos de página
│ │ │ └── style.scss # Archivo principal SCSS (importa todo)
│ │ ├── fonts/
│ │ └── images/
│ ├── components/ # Módulos JavaScript para componentes de UI
│ │ ├── SearchBox.js
│ │ ├── ResultCard.js
│ │ └── ...
│ ├── services/ # Lógica de negocio e interacción con APIs/datos
│ │ ├── apiService.js
│ │ ├── statsService.js
│ │ └── ...
│ ├── utils/ # Funciones de utilidad genéricas
│ │ ├── domUtils.js
│ │ ├── eventHandlers.js
│ │ └── ...
│ ├── app.js # Orquestador principal de la aplicación
│ └── index.js # Punto de entrada de JavaScript
├── .gitignore # Archivos/carpetas a ignorar por Git
├── package.json # Metadatos del proyecto y dependencias
├── webpack.config.js # Configuración de Webpack
├── babel.config.js # Configuración de Babel
└── README.md # Este archivo

## Tecnologías Utilizadas

- **HTML5**
- **SCSS (Sass)**: Preprocesador CSS para estilos modularizados.
- **JavaScript (ES6+)**: Lógica de la aplicación modularizada.
- **Webpack**: Empaquetador de módulos para compilar y optimizar el código.
- **Babel**: Transpilador de JavaScript para compatibilidad con navegadores.
- **Font Awesome**: Iconos.
- **Google Custom Search API**: Para la funcionalidad de búsqueda (requiere clave API y CX).

## Configuración e Instalación

1.  **Clona el repositorio** (si es un repositorio Git) o **descarga el código**.
2.  **Navega al directorio del proyecto** en tu terminal.
3.  **Instala las dependencias**:
    ```bash
    npm install
    # o
    yarn install
    ```
4.  **Configura tu API Key y CX**:
    Abre `src/services/apiService.js` y reemplaza los placeholders `API_KEY` y `CX` con tus credenciales reales de Google Custom Search API.
    ```javascript
    const API_KEY = 'TU_CLAVE_API_AQUI'
    const CX = 'TU_CX_AQUI'
    ```

## Scripts Disponibles

En el `package.json`, encontrarás los siguientes scripts:

- **`npm start`** o **`yarn start`**:
  Inicia un servidor de desarrollo local con Hot Module Replacement (HMR). La aplicación se abrirá automáticamente en tu navegador (generalmente en `http://localhost:3000`). Ideal para el desarrollo.
- **`npm run build`** o **`yarn build`**:
  Compila y optimiza el código para producción. Los archivos listos para desplegar se generarán en la carpeta `dist/`.
- **`npm run watch`** o **`yarn watch`**:
  Compila el código en modo desarrollo y lo "vigila" para cambios, recompilando automáticamente cuando detecta modificaciones. Útil si no quieres usar el servidor de desarrollo.

## Despliegue

Después de ejecutar `npm run build`, la carpeta `dist/` contendrá todos los archivos necesarios (`index.html`, `css/style.css`, `js/bundle.js`, etc.) que puedes subir a cualquier servidor web para desplegar tu aplicación.

---

Este es un punto de partida sólido. La modularización te permitirá añadir nuevas características
