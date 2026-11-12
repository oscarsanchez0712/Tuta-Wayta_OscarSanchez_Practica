document.addEventListener('DOMContentLoaded', () => {

  const menuBtn = document.getElementById('menuBtn');
  const dropdownMenu = document.getElementById('dropdownMenu');

  if (!menuBtn || !dropdownMenu) return;

  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();

    const isActive = dropdownMenu.classList.toggle('active');

    menuBtn.setAttribute('aria-expanded', isActive);
  });

  dropdownMenu.querySelectorAll('a').forEach(link => {

    link.addEventListener('click', () => {

      dropdownMenu.classList.remove('active');

      menuBtn.setAttribute('aria-expanded', 'false');

    });

  });

  document.addEventListener('click', (e) => {

    if (
      !dropdownMenu.contains(e.target) &&
      !menuBtn.contains(e.target)
    ) {

      dropdownMenu.classList.remove('active');

      menuBtn.setAttribute('aria-expanded', 'false');

    }

  });

  window.addEventListener('resize', () => {

    if (window.innerWidth > 768) {

      dropdownMenu.classList.remove('active');

      menuBtn.setAttribute('aria-expanded', 'false');

    }

  });

});

/* =========================================================
   10. LÓGICA PARA SUBMENÚS DESPLEGABLES EN MÓVIL
   ========================================================= */
document.addEventListener('DOMContentLoaded', function () {
    const dropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const wrapper = this.parentElement;
            wrapper.classList.toggle('open');
            const submenu = this.nextElementSibling;
            if (submenu.style.maxHeight) {
                submenu.style.maxHeight = null;
            } else {
                submenu.style.maxHeight = submenu.scrollHeight + "px";
            }
        });
    });
});


/* =========================================================
   11. MEJORAS MENUS (acordeon movil, Escape, cierre a 992px)
   Se agrego al final; no modifica la logica anterior.
   ========================================================= */
document.addEventListener('DOMContentLoaded', function () {

  var menuBtn = document.getElementById('menuBtn');
  var dropdownMenu = document.getElementById('dropdownMenu');

  function cerrarMenuMovil() {
    if (!dropdownMenu) return;
    dropdownMenu.classList.remove('active');
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
  }

  /* 1) Acordeón móvil: al abrir un submenú se cierran los demás
        y se actualiza aria-expanded (menu.js ya alterna la clase 'open'). */
  var toggles = document.querySelectorAll('.mobile-dropdown-toggle');

  toggles.forEach(function (toggle) {
    toggle.setAttribute('aria-expanded', 'false');

    toggle.addEventListener('click', function () {
      var wrapper = toggle.parentElement;
      var abierto = wrapper.classList.contains('open');
      toggle.setAttribute('aria-expanded', abierto ? 'true' : 'false');

      if (!abierto) return;

      toggles.forEach(function (otro) {
        if (otro === toggle) return;
        var otroWrapper = otro.parentElement;
        var submenu = otro.nextElementSibling;
        otroWrapper.classList.remove('open');
        otro.setAttribute('aria-expanded', 'false');
        if (submenu) submenu.style.maxHeight = null;
      });
    });
  });

  /* 2) Tecla Escape: cierra el menú móvil y quita el foco de los menús de escritorio */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;

    if (dropdownMenu && dropdownMenu.classList.contains('active')) {
      cerrarMenuMovil();
      if (menuBtn) menuBtn.focus();
    }

    var foco = document.activeElement;
    if (foco && foco.closest && foco.closest('.dropdown-wrapper')) {
      foco.blur();
    }
  });

  /* 3) El CSS cambia a escritorio en 992px; menu.js cierra en 768px.
        Aquí se cierra también al cruzar los 992px. */
  window.addEventListener('resize', function () {
    if (window.innerWidth > 992) cerrarMenuMovil();
  });

});


/* =========================================================
   12. GLOBITO DEL CARRITO: OCULTO CUANDO ES 0
   ========================================================= */
document.addEventListener('DOMContentLoaded', function () {
  var badge = document.getElementById('cart-count-badge');
  if (!badge) return;

  function sincronizar() {
    var n = parseInt(badge.textContent, 10) || 0;
    badge.classList.toggle('hidden', n <= 0);
  }

  sincronizar();
  new MutationObserver(sincronizar).observe(badge, {
    childList: true,
    characterData: true,
    subtree: true
  });
});