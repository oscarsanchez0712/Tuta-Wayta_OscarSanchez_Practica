/**
 * i18n.js
 * Motor de traducción global para Tuta Wayta.
 * Este script proporciona una función `applyTranslations` que puede ser
 * llamada por cualquier otro script para actualizar el contenido de la página
 * cuando el idioma cambia.
 */

// Objeto para cachear las traducciones ya cargadas
window.i18nData = window.i18nData || {};

// Base path del servidor: vacío en local, "/tutawayta" en producción.
const i18nBasePath = window.TUTA_BASE_PATH || (window.location.pathname.startsWith('/tutawayta') ? '/tutawayta' : '');

async function applyTranslations(lang) {
  try {
    let translations = window.i18nData[lang];

    // Si el idioma no está en caché, lo pedimos al servidor
    if (!translations) {
      const response = await fetch(`${i18nBasePath}/static/lang/${lang}.json`);
      if (!response.ok) {
        console.warn(`Archivo de idioma '${lang}.json' no encontrado. Usando 'es' por defecto.`);
        return applyTranslations('es');
      }
      translations = await response.json();
      // Guardamos la traducción en el caché global
      window.i18nData[lang] = translations;
    }

    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (translations[key]) {
        element.innerHTML = translations[key];
      }
    });
  } catch (error) {
    console.error('Error al aplicar las traducciones:', error);
  }
}

window.applyTranslations = applyTranslations;