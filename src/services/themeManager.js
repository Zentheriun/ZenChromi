const THEME_KEY = 'zenchromiTheme';

const themeManager = (() => {
  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  };

  const updateButtonLabel = (theme) => {
    const btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = theme === 'dark' ? '☀️ Claro' : '🌙 Oscuro';
  };

  const toggleTheme = () => {
    const current = localStorage.getItem(THEME_KEY) || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    updateButtonLabel(next);
  };

  const init = () => {
    const saved = localStorage.getItem(THEME_KEY) || 'light';
    applyTheme(saved);
    updateButtonLabel(saved);
    const btn = document.getElementById('themeToggle');
    if (btn) btn.addEventListener('click', toggleTheme);
  };

  return { init };
})();

export default themeManager;
