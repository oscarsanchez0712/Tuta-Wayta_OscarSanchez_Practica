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