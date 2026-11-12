document.addEventListener('DOMContentLoaded', () => {
  // La lógica de traducción ahora está centralizada en i18n.js y es llamada por main.js.
  // Este script solo necesita escuchar por si se requiere alguna acción específica para "nosotros.html"
  // al cambiar el idioma.
  const updateContent = () => {
    // Por ahora, no se necesita una acción adicional aquí, pero mantenemos el listener
    // por si se añade funcionalidad futura específica para esta página.
  };
  window.addEventListener('languageChanged', updateContent);
});