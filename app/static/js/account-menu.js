// Base path del servidor: vacio en local, "/tutawayta" en produccion.
const accountMenuBasePath = window.TUTA_BASE_PATH || (window.location.pathname.startsWith('/tutawayta') ? '/tutawayta' : '');

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const claseActiva = 'open'; 

  // =========================================================
  // CONFIGURACIÓN DE MENÚS DESPLEGABLES
  // =========================================================
  const dropdownsConfig = [
    { btnId: 'accountMenuBtn', menuId: 'accountMenu' },
    { btnId: 'languageMenuBtn', menuId: 'languageMenu' }
  ];

  const menus = dropdownsConfig.map(d => ({
    button: document.getElementById(d.btnId),
    menu: document.getElementById(d.menuId)
  })).filter(item => item.button && item.menu);

  // =========================================================
  // LÓGICA DE APERTURA/CIERRE DE DROPDOWNS
  // =========================================================
  menus.forEach(item => {
    item.button.addEventListener('click', (event) => {
      event.stopPropagation();
      const isOpen = item.menu.classList.contains(claseActiva);

      menus.forEach(other => {
        if (other !== item) {
          other.menu.classList.remove(claseActiva);
          other.button.setAttribute('aria-expanded', 'false');
        }
      });

      if (isOpen) {
        item.menu.classList.remove(claseActiva);
        item.button.setAttribute('aria-expanded', 'false');
      } else {
        item.add = item.menu.classList.add(claseActiva);
        item.button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Evita cerrar menú al hacer clic dentro (salvo en enlaces de idioma controlados arriba)
  menus.forEach(item => {
    item.menu.addEventListener('click', (event) => {
      if (event.target.tagName !== 'A') {
        event.stopPropagation();
      }
    });
  });

  // Cierre general por clics fuera o Escape
  document.addEventListener('click', () => {
    menus.forEach(item => {
      item.menu.classList.remove(claseActiva);
      item.button.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      menus.forEach(item => {
        item.menu.classList.remove(claseActiva);
        item.button.setAttribute('aria-expanded', 'false');
      });
    }
  });
});




document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const claseActiva = 'open'; 

  // =========================================================
  // CONFIGURACIÓN DE MENÚS DESPLEGABLES
  // =========================================================
  const dropdownsConfig = [
    { btnId: 'accountMenuBtn', menuId: 'accountMenu' },
    { btnId: 'languageMenuBtn', menuId: 'languageMenu' }
  ];

  const menus = dropdownsConfig.map(d => ({
    button: document.getElementById(d.btnId),
    menu: document.getElementById(d.menuId)
  })).filter(item => item.button && item.menu);

  // =========================================================
  // LÓGICA DE APERTURA/CIERRE DE DROPDOWNS
  // =========================================================
  menus.forEach(item => {
    item.button.addEventListener('click', (event) => {
      event.stopPropagation();
      const isOpen = item.menu.classList.contains(claseActiva);

      menus.forEach(other => {
        if (other !== item) {
          other.menu.classList.remove(claseActiva);
          other.button.setAttribute('aria-expanded', 'false');
        }
      });

      if (isOpen) {
        item.menu.classList.remove(claseActiva);
        item.button.setAttribute('aria-expanded', 'false');
      } else {
        item.add = item.menu.classList.add(claseActiva);
        item.button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Evita cerrar menú al hacer clic dentro (salvo en enlaces de idioma controlados arriba)
  menus.forEach(item => {
    item.menu.addEventListener('click', (event) => {
      if (event.target.tagName !== 'A') {
        event.stopPropagation();
      }
    });
  });

  // Cierre general por clics fuera o Escape
  document.addEventListener('click', () => {
    menus.forEach(item => {
      item.menu.classList.remove(claseActiva);
      item.button.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      menus.forEach(item => {
        item.menu.classList.remove(claseActiva);
        item.button.setAttribute('aria-expanded', 'false');
      });
    }
  });
});













document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const claseActiva = 'open'; 

  // =========================================================
  // CONFIGURACIÓN DE MENÚS DESPLEGABLES
  // =========================================================
  const dropdownsConfig = [
    { btnId: 'accountMenuBtn', menuId: 'accountMenu' },
    { btnId: 'languageMenuBtn', menuId: 'languageMenu' }
  ];

  const menus = dropdownsConfig.map(d => ({
    button: document.getElementById(d.btnId),
    menu: document.getElementById(d.menuId)
  })).filter(item => item.button && item.menu);

  // =========================================================
  // LÓGICA DE APERTURA/CIERRE DE DROPDOWNS
  // =========================================================
  menus.forEach(item => {
    item.button.addEventListener('click', (event) => {
      event.stopPropagation();
      const isOpen = item.menu.classList.contains(claseActiva);

      menus.forEach(other => {
        if (other !== item) {
          other.menu.classList.remove(claseActiva);
          other.button.setAttribute('aria-expanded', 'false');
        }
      });

      if (isOpen) {
        item.menu.classList.remove(claseActiva);
        item.button.setAttribute('aria-expanded', 'false');
      } else {
        item.add = item.menu.classList.add(claseActiva);
        item.button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Evita cerrar menú al hacer clic dentro (salvo en enlaces de idioma controlados arriba)
  menus.forEach(item => {
    item.menu.addEventListener('click', (event) => {
      if (event.target.tagName !== 'A') {
        event.stopPropagation();
      }
    });
  });

  // Cierre general por clics fuera o Escape
  document.addEventListener('click', () => {
    menus.forEach(item => {
      item.menu.classList.remove(claseActiva);
      item.button.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      menus.forEach(item => {
        item.menu.classList.remove(claseActiva);
        item.button.setAttribute('aria-expanded', 'false');
      });
    }
  });
});





async function setLang(lang) {
  try {
    const res = await fetch(`${accountMenuBasePath}/static/lang/${lang}.json`);
    if (!res.ok) throw new Error(`No se pudo cargar el idioma: ${lang}`);
    const data = await res.json();

    // Traducir todos los elementos marcados con data-i18n
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (data[key]) {
        // Preserva estructuras internas o flechas como ▼ si se requiere
        if (el.querySelector('.nav-arrow')) {
          const arrow = el.querySelector('.nav-arrow').outerHTML;
          el.innerHTML = data[key] + arrow;
        } else {
          el.textContent = data[key];
        }
      }
    });

    document.documentElement.lang = lang;
    localStorage.setItem("lang", lang);

    // Sincronizar selectores si existen múltiples en la página (Desktop y Mobile)
    document.querySelectorAll(".lang-selector-select").forEach(select => {
      select.value = lang;
    });

  } catch (error) {
    console.error("Error en i18n:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Escuchar cambios en cualquier selector de idioma del DOM
  document.body.addEventListener("change", (e) => {
    if (e.target.classList.contains("lang-selector-select")) {
      setLang(e.target.value);
    }
  });

  // Carga inicial basada en localStorage o Español por defecto
  const savedLang = localStorage.getItem("lang") || "es";
  setLang(savedLang);
});


/* =========================================================
   SISTEMA DE IDIOMAS
========================================================= */

async function setLang(lang) {

  try {

    const res = await fetch(`${accountMenuBasePath}/static/lang/${lang}.json`);

    if (!res.ok) throw new Error(`No se pudo cargar ${lang}.json`);

    const data = await res.json();

    document.querySelectorAll("[data-i18n]").forEach(el => {

      const key = el.dataset.i18n;

      if (!data[key]) return;

      const arrow = el.querySelector(".nav-arrow");

      if (arrow) {

        el.childNodes[0].textContent = data[key] + " ";

      } else {

        el.textContent = data[key];

      }

    });

    document.documentElement.lang = lang;

    localStorage.setItem("language", lang);

    // Selector móvil
    const mobile = document.getElementById("langSelectorMobile");

    if (mobile) {

      mobile.value = lang;

    }

    // Selector escritorio
    const textDesktop = document.getElementById("current-lang-text-desktop");

    const flagDesktop = document.querySelector(
      "#lang-selector-desktop .current-lang .flag-icon"
    );

    const flags = {
      es: "flag-icon-pe",
      en: "flag-icon-gb",
      de: "flag-icon-de",
      fr: "flag-icon-fr",
      it: "flag-icon-it",
      pt: "flag-icon-pt",
      zh: "flag-icon-cn"
    };

    const names = {
      es: "Español",
      en: "English",
      de: "Deutsch",
      fr: "Français",
      it: "Italiano",
      pt: "Português",
      zh: "中文"
    };

    if (textDesktop) {

      textDesktop.textContent = names[lang];

    }

    if (flagDesktop) {

      flagDesktop.className = `flag-icon ${flags[lang]}`;

    }

  } catch (err) {

    console.error(err);

  }

}

/* Disponible globalmente */

window.changeLanguage = setLang;

/* Eventos */

document.addEventListener("DOMContentLoaded", () => {

  const saved = localStorage.getItem("language") || "es";

  setLang(saved);

  // Selector escritorio

  document.querySelectorAll("#lang-selector-desktop a[data-lang]")

    .forEach(item => {

      item.addEventListener("click", function(e){

        e.preventDefault();

        setLang(this.dataset.lang);

      });

    });

  // Selector móvil

  const mobile = document.getElementById("langSelectorMobile");

  if(mobile){

    mobile.addEventListener("change",function(){

      setLang(this.value);

    });

  }

});