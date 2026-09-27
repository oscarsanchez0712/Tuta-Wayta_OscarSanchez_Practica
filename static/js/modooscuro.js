document.addEventListener('DOMContentLoaded', () => {
  const btnToggle = document.getElementById('themeToggle');
  const btnToggleMobile = document.getElementById('themeToggleMobile');
  const labelToggle = document.getElementById('themeLabel');
  const iconToggle = document.getElementById('themeIcon');

  if (!btnToggle && !btnToggleMobile) return;

  const actualizarTexto = (modoOscuroActivo) => {
    const textoToggle = modoOscuroActivo ? 'Modo claro' : 'Modo oscuro';

    if (labelToggle) labelToggle.textContent = textoToggle;
    if (btnToggle) btnToggle.setAttribute('aria-label', `Cambiar a ${textoToggle.toLowerCase()}`);
    if (btnToggleMobile) btnToggleMobile.textContent = textoToggle;
  };

  const aplicarModo = (modoOscuroActivo) => {
    document.documentElement.classList.toggle('dark', modoOscuroActivo);
    document.body.classList.toggle('dark', modoOscuroActivo);
    document.documentElement.setAttribute('data-theme', modoOscuroActivo ? 'dark' : 'light');
    document.body.setAttribute('data-theme', modoOscuroActivo ? 'dark' : 'light');
    localStorage.setItem('modo', modoOscuroActivo ? 'oscuro' : 'claro');

    if (iconToggle) iconToggle.textContent = 'dark_mode';

    actualizarTexto(modoOscuroActivo);
  };

  aplicarModo(localStorage.getItem('modo') === 'oscuro');

  if (btnToggle) {
    btnToggle.addEventListener('click', () => {
      aplicarModo(!document.body.classList.contains('dark'));
    });
  }

  if (btnToggleMobile) {
    btnToggleMobile.addEventListener('click', (event) => {
      event.preventDefault();
      aplicarModo(!document.body.classList.contains('dark'));
    });
  }
});