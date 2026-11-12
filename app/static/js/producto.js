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

// ==========================================================================
// MEJORAS DE LA PÁGINA DE PRODUCTOS (agregado al final; el código de arriba no se modificó)
// - Buscador por nombre (ignora tildes y mayúsculas)
// - Orden por precio (menor a mayor / mayor a menor) y por nombre A-Z
// - Mensaje de "sin resultados"
// - Botón "Ver más" (reemplaza el límite fijo de 9 productos)
// Trabaja junto a producto.js: no lo modifica, solo toma el control final de
// qué tarjetas se muestran (se carga después de producto.js).
// ==========================================================================
(function () {
  const PAGE_SIZE = 9;

  document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.productos-grid');
    const input = document.getElementById('prodBuscador');
    const clearBtn = document.getElementById('prodBuscadorLimpiar');
    const select = document.getElementById('prodOrden');
    const noResults = document.getElementById('prodSinResultados');
    const resetBtn = document.getElementById('prodRestablecer');
    const moreWrap = document.getElementById('prodVerMasWrap');
    const moreBtn = document.getElementById('prodVerMas');
    const counter = document.getElementById('prodContador');
    const filterBtns = document.querySelectorAll('.filtro-btn');
    if (!grid || !input || !select) return;

    let categoria = 'all';
    let texto = '';
    let orden = 'default';
    let visibles = PAGE_SIZE;

    const active = document.querySelector('.filtro-btn.active');
    if (active) categoria = (active.dataset.filter || 'all').toLowerCase();

    // ---------- utilidades ----------
    const normalizar = (v) => String(v || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();

    const cards = () => Array.from(grid.querySelectorAll(':scope > .product-card'));

    // Guarda el orden original para poder volver a "Relevancia"
    let ordenOriginal = new Map();
    function guardarOrdenOriginal() {
      cards().forEach((c) => {
        if (!ordenOriginal.has(c)) ordenOriginal.set(c, ordenOriginal.size);
      });
    }

    function nombreCard(c) {
      const h3 = c.querySelector('h3');
      if (!h3) return '';
      // Nombre actual (idioma activo) + nombre original en español
      return `${h3.textContent} ${h3.getAttribute('data-i18n') || ''}`;
    }

    function descCard(c) {
      const p = c.querySelector('.product-info p');
      return p ? p.textContent : '';
    }

    function precioCard(c) {
      const el = c.querySelector('.product-price');
      if (!el) return null;
      const m = el.textContent.replace(',', '.').match(/[\d.]+/);
      const n = m ? parseFloat(m[0]) : NaN;
      return isNaN(n) ? null : n;
    }

    function coincide(c) {
      const cat = (c.dataset.category || '').toLowerCase();
      if (categoria !== 'all' && cat !== categoria) return false;
      if (!texto) return true;
      const q = normalizar(texto);
      return normalizar(nombreCard(c)).includes(q) || normalizar(descCard(c)).includes(q);
    }

    // ---------- traducciones de los textos nuevos ----------
    function idioma() {
      return document.documentElement.lang || localStorage.getItem('tuta_lang') || 'es';
    }
    function t(key, fallback) {
      const dict = (window.i18nData || {})[idioma()];
      return (dict && dict[key]) || fallback;
    }
    function aplicarPlaceholder() {
      input.placeholder = t('prod_buscar_ph', 'Buscar producto por nombre...');
    }

    // ---------- render principal ----------
    function ordenar(lista) {
      const arr = lista.slice();
      if (orden === 'asc' || orden === 'desc') {
        arr.sort((a, b) => {
          const pa = precioCard(a), pb = precioCard(b);
          // Los productos sin precio (solo tienen "Ver detalles") van al final
          if (pa === null && pb === null) return ordenOriginal.get(a) - ordenOriginal.get(b);
          if (pa === null) return 1;
          if (pb === null) return -1;
          return orden === 'asc' ? pa - pb : pb - pa;
        });
      } else if (orden === 'az') {
        arr.sort((a, b) => normalizar(a.querySelector('h3')?.textContent)
          .localeCompare(normalizar(b.querySelector('h3')?.textContent)));
      } else {
        arr.sort((a, b) => ordenOriginal.get(a) - ordenOriginal.get(b));
      }
      return arr;
    }

    function render() {
      guardarOrdenOriginal();
      const todas = cards();
      const ordenadas = ordenar(todas);

      // Reordena el DOM siguiendo el orden elegido
      ordenadas.forEach((c) => grid.appendChild(c));

      const filtradas = ordenadas.filter(coincide);
      const totalOk = filtradas.length;
      const mostrar = new Set(filtradas.slice(0, visibles));

      ordenadas.forEach((c) => {
        if (mostrar.has(c)) {
          c.style.display = 'block';
          c.classList.add('active', 'visible');   // que la animación "reveal" no las deje ocultas
        } else {
          c.style.display = 'none';
        }
      });

      const sinResultados = totalOk === 0;
      if (noResults) noResults.hidden = !sinResultados;
      grid.style.display = sinResultados ? 'none' : '';

      const hayMas = totalOk > mostrar.size;
      if (moreWrap) moreWrap.hidden = sinResultados || (!hayMas && totalOk <= PAGE_SIZE);
      if (moreBtn) moreBtn.hidden = !hayMas;
      if (counter) {
        counter.textContent = t('prod_mostrando', 'Mostrando {a} de {b} productos')
          .replace('{a}', mostrar.size).replace('{b}', totalOk);
      }
      if (clearBtn) clearBtn.hidden = !texto;
    }

    function reiniciar() { visibles = PAGE_SIZE; render(); }

    // ---------- eventos (se registran después de los de producto.js) ----------
    let timer;
    input.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => { texto = input.value; reiniciar(); }, 150);
    });

    if (clearBtn) clearBtn.addEventListener('click', () => {
      input.value = ''; texto = ''; input.focus(); reiniciar();
    });

    select.addEventListener('change', () => { orden = select.value; reiniciar(); });

    filterBtns.forEach((b) => b.addEventListener('click', () => {
      categoria = (b.dataset.filter || 'all').toLowerCase();
      reiniciar();
    }));

    if (moreBtn) moreBtn.addEventListener('click', () => { visibles += PAGE_SIZE; render(); });

    if (resetBtn) resetBtn.addEventListener('click', () => {
      input.value = ''; texto = ''; select.value = 'default'; orden = 'default';
      categoria = 'all';
      filterBtns.forEach((b) => b.classList.toggle('active', (b.dataset.filter || 'all') === 'all'));
      reiniciar();
    });

    // Cambio de idioma: el nombre visible cambia, así que se vuelve a evaluar
    window.addEventListener('languageChanged', () => {
      let intentos = 0;
      const esperar = setInterval(() => {
        intentos++;
        if ((window.i18nData || {})[idioma()] || intentos > 15) {
          clearInterval(esperar);
          aplicarPlaceholder();
          render();
        }
      }, 100);
    });

    // Los precios pueden actualizarse después (precios del admin desde el servidor)
    let timerPrecios;
    const observador = new MutationObserver(() => {
      if (orden !== 'asc' && orden !== 'desc') return;
      clearTimeout(timerPrecios);
      timerPrecios = setTimeout(render, 150);
    });
    grid.querySelectorAll('.product-price').forEach((el) =>
      observador.observe(el, { childList: true, characterData: true, subtree: true }));

    aplicarPlaceholder();
    render();
    // Reintento por si las traducciones se cargan después del primer render
    setTimeout(() => { aplicarPlaceholder(); render(); }, 600);
  });
})();