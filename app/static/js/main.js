document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // LÓGICA CENTRAL DE IDIOMAS
  // ==========================================================================
  const desktopSelector = document.getElementById('lang-selector-desktop');
  const mobileSelector = document.getElementById('langSelectorMobile');
  const mobileCustomSelector = document.getElementById('lang-selector-mobile-custom');

  const languages = {
    es: { text: 'Español',flag: 'flag-icon-pe' },
    en: { text: 'English', flag: 'flag-icon-gb' },
    de: { text: 'Deutsch', flag: 'flag-icon-de' },
    fr: { text: 'Français', flag: 'flag-icon-fr' },
    it: { text: 'Italiano', flag: 'flag-icon-it' },
    pt: { text: 'Português', flag: 'flag-icon-pt' },
    zh: { text: '中文', flag: 'flag-icon-cn' }
  };

  // Función para actualizar la apariencia de TODOS los selectores
  function updateAllSelectors(lang) {
    if (!languages[lang]) return;
    const details = languages[lang];

    // Selector de escritorio
    if (desktopSelector) {
      const textEl = desktopSelector.querySelector('.current-lang-text');
      const flagEl = desktopSelector.querySelector('.flag-icon');
      if (textEl) textEl.textContent = details.text;
      if (flagEl) flagEl.className = 'flag-icon ' + details.flag;
    }

    // Selector móvil (nativo)
    if (mobileSelector) mobileSelector.value = lang;

    // Selector móvil (custom)
    if (mobileCustomSelector) {
      const textEl = mobileCustomSelector.querySelector('.current-lang-text');
      const flagEl = mobileCustomSelector.querySelector('.flag-icon');
      if (textEl) textEl.textContent = details.text;
      if (flagEl) flagEl.className = 'flag-icon ' + details.flag;
    }
  }

  // Función ÚNICA y GLOBAL para cambiar el idioma
  window.changeLanguage = function(lang) {
    if (!languages[lang]) return;

    localStorage.setItem('tuta_lang', lang);
    document.documentElement.lang = lang;
    updateAllSelectors(lang);

    // Llama a la función de traducción global si existe
    if (window.applyTranslations) {
      window.applyTranslations(lang);
    }

    // Notifica a toda la aplicación que el idioma ha cambiado
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
  };

  // --- Eventos para el selector de escritorio ---
  if (desktopSelector) {
    const button = desktopSelector.querySelector('.current-lang');
    if (button) {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        desktopSelector.classList.toggle('open');
      });
    }

    desktopSelector.querySelectorAll('.lang-options a').forEach(option => {
      option.addEventListener('click', (e) => {
        e.preventDefault();
        window.changeLanguage(option.dataset.lang);
        desktopSelector.classList.remove('open');
      });
    });
  }

  // --- Eventos para el selector móvil (custom) ---
  if (mobileCustomSelector) {
    const mobileButton = mobileCustomSelector.querySelector('.current-lang-mobile');
    if (mobileButton) {
      mobileButton.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileCustomSelector.classList.toggle('open');
      });
    }

    mobileCustomSelector.querySelectorAll('.lang-options-mobile a').forEach(option => {
      option.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.changeLanguage(option.dataset.lang);
        mobileCustomSelector.classList.remove('open');
        // Cierra el menú principal del móvil también
        document.getElementById('dropdownMenu')?.classList.remove('active');
        document.getElementById('menuBtn')?.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Cierra el selector de escritorio si se hace clic fuera
  document.addEventListener('click', (e) => {
    if (desktopSelector && !desktopSelector.contains(e.target)) {
      desktopSelector.classList.remove('open');
    }
    if (mobileCustomSelector && !mobileCustomSelector.contains(e.target)) {
      mobileCustomSelector.classList.remove('open');
    }
  });

  // Carga inicial del idioma
  const savedLang = localStorage.getItem('tuta_lang') || 'es';
  window.changeLanguage(savedLang);

  // ==========================================================================
  // OTRAS FUNCIONALIDADES DE MAIN.JS (Scroll, Carrusel, etc.)
  // ==========================================================================
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length > 0) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => observer.observe(el));
  }

  const contenedorImg = document.getElementById('carruselImat');
  if (contenedorImg) {
    let indexImagen = 0;
    const totalImagenes = document.querySelectorAll('.slide').length;
    
    function aplicarCambio() {
      contenedorImg.style.transform = `translateX(${-indexImagen * 100}%)`;
    }
    
    window.moverDerecha = function () {
      if (totalImagenes > 0) {
        indexImagen = (indexImagen + 1) % totalImagenes;
        aplicarCambio();
      }
    };
    
    window.moverIzquierda = function () {
      if (totalImagenes > 0) {
        indexImagen = (indexImagen - 1 + totalImagenes) % totalImagenes;
        aplicarCambio();
      }
    };
    
    // Auto-avance del carrusel cada 5 segundos
    setInterval(() => {
      if (typeof window.moverDerecha === 'function') {
        window.moverDerecha();
      }
    }, 5000);
  }
});