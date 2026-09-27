// ==========================================================================
// FUNCIONES AUXILIARES DE PRODUCTOS (FUERA DEL DOM PARA DISPONIBILIDAD)
// ==========================================================================
function escapeProductText(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderAdminCatalogProducts() {
  const grid = document.querySelector('.productos-grid');
  if (!grid) return;

  // Eliminar productos previos de administración para evitar duplicados al re-renderizar
  document.querySelectorAll('.admin-catalog-product').forEach(el => el.remove());

  let adminProducts = [];
  try {
    adminProducts = JSON.parse(localStorage.getItem('tuta_admin_products')) || [];
  } catch (error) {
    adminProducts = [];
  }

  adminProducts.forEach((product) => {
    const id = escapeProductText(product.id);
    const name = escapeProductText(product.name);
    const description = escapeProductText(product.description);
    const image = escapeProductText(product.image);
    const category = escapeProductText(product.category || 'derivados');
    const price = Number(product.price || 0).toFixed(2);

    let priceHtml = '';
    let cartButtonHtml = '';
    if (category.toLowerCase() === 'fruta') {
      priceHtml = `<span class="product-price">S/ ${price}</span>`;
      cartButtonHtml = `<button class="product-btn add-cart" data-id="${id}" data-name="${name}" data-price="${price}" data-image="${image}">
                          <span class="material-symbols-outlined">add_shopping_cart</span>
                          <span class="btn-text">Agregar</span>
                        </button>`;
    }

    grid.insertAdjacentHTML('beforeend', `
      <div class="product-card reveal admin-catalog-product" data-category="${category}">
        <img src="${image}" alt="${name}">
        <div class="product-info">
          <h3>${name}</h3>
          <p>${description}</p>
          <div class="product-footer">
            ${priceHtml}
            <div class="product-actions">
              <a href="/detalles?p=${id}" class="product-btn-details">Ver detalles</a>
              ${cartButtonHtml}
            </div>
          </div>
        </div>
      </div>
    `);
  });
}

function applyProductPriceOverrides() {
  let overrides = {};
  try {
    overrides = JSON.parse(localStorage.getItem('tuta_product_price_overrides')) || {};
  } catch (error) {
    overrides = {};
  }

  document.querySelectorAll('.product-card').forEach((card) => {
    const title = card.querySelector('h3');
    const priceEl = card.querySelector('.product-price');
    const cartButton = card.querySelector('[data-price]');
    if (!title || !priceEl) return;

    const productName = title.textContent.trim();
    const override = overrides[productName];
    if (!override) return;

    const formattedPrice = Number(override).toFixed(2);
    priceEl.textContent = `S/ ${formattedPrice}`;
    if (cartButton) cartButton.dataset.price = formattedPrice;
  });
}

// ==========================================================================
// BLOQUE PRINCIPAL - DOM READY CONSOLIDADO
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  
  // ------------------------------------------------------------------------
  // LÓGICA DE PRODUCTOS Y FILTROS DE CATEGORÍAS
  // ------------------------------------------------------------------------
  renderAdminCatalogProducts();
  applyProductPriceOverrides();

  const botonesFiltro = document.querySelectorAll(".filtro-btn");
  let filtroActual = "all";
  const MAX_VISIBLE = 9;

  function renderProductos() {
    // Volvemos a seleccionar las tarjetas (incluyendo las recién agregadas por admin)
    const productos = document.querySelectorAll(".product-card");
    let contador = 0;

    productos.forEach(producto => {
      const categoria = producto.dataset.category ? producto.dataset.category.toLowerCase() : '';
      const coincide = (filtroActual === "all" || categoria === filtroActual.toLowerCase());

      if (coincide && contador < MAX_VISIBLE) {
        producto.style.display = "block";
        contador++;
      } else {
        producto.style.display = "none";
      }
    });
  }

  // Eventos para botones de categorías de productos
  botonesFiltro.forEach(boton => {
    boton.addEventListener("click", () => {
      botonesFiltro.forEach(btn => btn.classList.remove("active"));
      boton.classList.add("active");
      filtroActual = boton.dataset.filter || "all";
      renderProductos();
    });
  });

  // Ejecución inicial de visibilidad
  renderProductos();

  // Escuchador del evento de cambio de idioma global para actualizar los productos
  window.addEventListener('languageChanged', () => {
    applyProductPriceOverrides();
    renderProductos();
  });

  // ------------------------------------------------------------------------
  // LÓGICA CENTRAL DE IDIOMAS
  // ------------------------------------------------------------------------
  const desktopSelector = document.getElementById('lang-selector-desktop');
  const mobileSelector = document.getElementById('langSelectorMobile');
  const mobileCustomSelector = document.getElementById('lang-selector-mobile-custom');

  const languages = {
    es: { text: 'Español', flag: 'flag-icon-es' },
    en: { text: 'English', flag: 'flag-icon-gb' },
    de: { text: 'Deutsch', flag: 'flag-icon-de' },
    fr: { text: 'Français', flag: 'flag-icon-fr' },
    it: { text: 'Italiano', flag: 'flag-icon-it' },
    pt: { text: 'Português', flag: 'flag-icon-pt' },
    zh: { text: '中文', flag: 'flag-icon-cn' }
  };

  function updateAllSelectors(lang) {
    if (!languages[lang]) return;
    const details = languages[lang];

    if (desktopSelector) {
      desktopSelector.querySelector('.current-lang-text').textContent = details.text;
      desktopSelector.querySelector('.flag-icon').className = 'flag-icon ' + details.flag;
    }

    if (mobileSelector) mobileSelector.value = lang;

    if (mobileCustomSelector) {
      mobileCustomSelector.querySelector('.current-lang-text').textContent = details.text;
      mobileCustomSelector.querySelector('.flag-icon').className = 'flag-icon ' + details.flag;
    }
  }

  window.changeLanguage = function(lang) {
    if (!languages[lang]) return;

    localStorage.setItem('tuta_lang', lang);
    document.documentElement.lang = lang;
    updateAllSelectors(lang);

    if (window.applyTranslations) {
      window.applyTranslations(lang);
    }

    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
  };

  if (desktopSelector) {
    const button = desktopSelector.querySelector('.current-lang');
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      desktopSelector.classList.toggle('open');
    });

    desktopSelector.querySelectorAll('.lang-options a').forEach(option => {
      option.addEventListener('click', (e) => {
        e.preventDefault();
        window.changeLanguage(option.dataset.lang);
        desktopSelector.classList.remove('open');
      });
    });
  }

  if (mobileCustomSelector) {
    const mobileButton = mobileCustomSelector.querySelector('.current-lang-mobile');
    mobileButton.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileCustomSelector.classList.toggle('open');
    });

    mobileCustomSelector.querySelectorAll('.lang-options-mobile a').forEach(option => {
      option.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.changeLanguage(option.dataset.lang);
        mobileCustomSelector.classList.remove('open');
        document.getElementById('dropdownMenu')?.classList.remove('active');
        document.getElementById('menuBtn')?.setAttribute('aria-expanded', 'false');
      });
    });
  }

  document.addEventListener('click', (e) => {
    if (desktopSelector && !desktopSelector.contains(e.target)) {
      desktopSelector.classList.remove('open');
    }
  });

  // Carga e inicialización del idioma guardado
  const savedLang = localStorage.getItem('tuta_lang') || 'es';
  window.changeLanguage(savedLang);

  // ------------------------------------------------------------------------
  // ANIMACIONES CON INTERSECTION OBSERVER (Scroll reveal)
  // ------------------------------------------------------------------------
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));

  // ------------------------------------------------------------------------
  // LÓGICA DEL CARRUSEL DE IMÁGENES
  // ------------------------------------------------------------------------
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
  }
});



function escapeProductText(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderAdminCatalogProducts() {
  const grid = document.querySelector('.productos-grid');
  if (!grid) return;

  let adminProducts = [];
  try {
    adminProducts = JSON.parse(localStorage.getItem('tuta_admin_products')) || [];
  } catch (error) {
    adminProducts = [];
  }

  adminProducts.forEach((product) => {
    const id = escapeProductText(product.id);
    const name = escapeProductText(product.name);
    const description = escapeProductText(product.description);
    const image = escapeProductText(product.image);
    const category = escapeProductText(product.category || 'derivados');
    const price = Number(product.price || 0).toFixed(2);

    grid.insertAdjacentHTML('beforeend', `
      <div class="product-card reveal admin-catalog-product" data-category="${category}">
        <img src="${image}" alt="${name}">
        <div class="product-info">
          <h3>${name}</h3>
          <p>${description}</p>
          <div class="product-footer">
            <span class="product-price">S/ ${price}</span>
            <button
              class="product-btn add-cart"
              data-id="${id}"
              data-name="${name}"
              data-price="${price}"
              data-image="${image}">
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    `);
  });
}

renderAdminCatalogProducts();

function applyProductPriceOverrides() {
  let overrides = {};
  try {
    overrides = JSON.parse(localStorage.getItem('tuta_product_price_overrides')) || {};
  } catch (error) {
    overrides = {};
  }

  document.querySelectorAll('.product-card').forEach((card) => {
    const title = card.querySelector('h3');
    const priceEl = card.querySelector('.product-price');
    const cartButton = card.querySelector('[data-price]');
    if (!title || !priceEl) return;

    const productName = title.textContent.trim();
    const override = overrides[productName];
    if (!override) return;

    const formattedPrice = Number(override).toFixed(2);
    priceEl.textContent = `S/ ${formattedPrice}`;
    if (cartButton) cartButton.dataset.price = formattedPrice;
  });
}

applyProductPriceOverrides();

async function syncProductPriceOverrides() {
  try {
    // CORREGIDO: Usar la variable global TUTA_BASE_PATH que inyecta el servidor
    const basePath = window.TUTA_BASE_PATH || '';
    const response = await fetch(`${basePath}/api/admin/price-overrides`);
    if (!response.ok) throw new Error('No se pudieron cargar precios');
    const data = await response.json();
    localStorage.setItem('tuta_product_price_overrides', JSON.stringify(data.overrides || {}));
    applyProductPriceOverrides();
  } catch (error) {
    applyProductPriceOverrides();
  }
}

syncProductPriceOverrides();

const botones = document.querySelectorAll(".filtro-btn");
const productos = document.querySelectorAll(".product-card");

let filtroActual = "all";
const MAX_VISIBLE = 9;

// Render con límite de 9 productos visibles
function renderProductos() {
  let contador = 0;

  productos.forEach(producto => {
    const categoria = producto.dataset.category;
    const coincide = (filtroActual === "all" || categoria === filtroActual);

    if (coincide && contador < MAX_VISIBLE) {
      producto.style.display = "block";
      contador++;
    } else {
      producto.style.display = "none";
    }
  });
}

// Eventos de filtros
botones.forEach(boton => {
  boton.addEventListener("click", () => {

    botones.forEach(btn => btn.classList.remove("active"));
    boton.classList.add("active");

    filtroActual = boton.dataset.filter;

    renderProductos();
  });
});

// Inicial
renderProductos();