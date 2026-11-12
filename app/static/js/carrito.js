const ENVIO_COST = 15.00;
const cartBasePath = window.TUTA_BASE_PATH || (window.location.pathname.startsWith('/tutawayta') ? '/tutawayta' : '');
const cartAppUrl = (path) => `${cartBasePath}${path}`;

// Los textos ahora se cargan desde el backend a través de la variable `I18N_CARRITO_DATA`
// que se inyecta en la plantilla `base.html`.
const T_CARRITO = window.I18N_CARRITO_DATA || {
    loginRequired: "Inicie sesión para comprar",
    buyerOnly: "Solo los compradores pueden realizar pedidos",
    productAdded: "Producto agregado al carrito",
    productRemoved: "Producto eliminado del carrito",
    quantityUpdated: "Cantidad actualizada",
    confirmDelete: "¿Desea eliminar {productName} del carrito?",
    cartEmptied: "Carrito vaciado",
    cartAlreadyEmpty: "El carrito ya está vacío",
    confirmEmpty: "¿Está seguro de vaciar el carrito?"
};

function getUsuarioSesion() {
  try {
    return JSON.parse(localStorage.getItem('tuta_session_user'));
  } catch (error) {
    return null;
  }
}

function validarCompradorParaCompra() {
  const usuario = getUsuarioSesion();

  if (!usuario) {
    alert(T_CARRITO.loginRequired);
    window.location.href = `${cartBasePath}/login`;
    return false;
  }

  if (usuario.role !== 'comprador') {
    alert(T_CARRITO.buyerOnly);
    return false;
  }

  return true;
}

function getCarrito() {
  return JSON.parse(localStorage.getItem('carrito')) || [];
}

function setCarrito(carrito) {
  const prevRaw = localStorage.getItem('carrito');
  const prevCarrito = prevRaw ? JSON.parse(prevRaw) : [];
  const prevCantidad = prevCarrito.reduce((s, it) => s + (it.cantidad || 0), 0);

  localStorage.setItem('carrito', JSON.stringify(carrito));

  const newCantidad = (carrito || []).reduce((s, it) => s + (it.cantidad || 0), 0);

  try {
    window.dispatchEvent(new CustomEvent('carrito:changed', {
      detail: {
        prevCantidad,
        newCantidad,
        carrito: carrito
      }
    }));
  } catch (err) {
    const ev = document.createEvent('CustomEvent');
    ev.initCustomEvent('carrito:changed', true, true, { prevCantidad, newCantidad, carrito });
    window.dispatchEvent(ev);
  }
}

function actualizarCarritoHeader() {
  const carrito = getCarrito();
  let subtotal = 0;
  carrito.forEach(item => subtotal += (item.precio || 0) * (item.cantidad || 0));
  const totalCount = (carrito || []).reduce((s, it) => s + (it.cantidad || 0), 0);
  
  const totalEnvio = carrito.length > 0 ? ENVIO_COST : 0.00;
  const total = subtotal + totalEnvio;
  
  try {
    localStorage.setItem('cart_subtotal', subtotal.toFixed(2));
    localStorage.setItem('cart_shipping', totalEnvio.toFixed(2));
    localStorage.setItem('cart_total', total.toFixed(2));
  } catch (e) { /* ignore */ }
  
  const badge = document.getElementById('cart-count-badge');
  if (badge) {
    badge.textContent = totalCount;
    if (Number(totalCount) <= 0) badge.classList.add('hidden'); else badge.classList.remove('hidden');
  }

  const priceDisplay = document.getElementById('cart-total-price');
  if (priceDisplay) {
    priceDisplay.textContent = `S/${(subtotal).toFixed(2)}`;
  }
}

let __cart_thumb_timer = null;
function showLastThumb(imgSrc, duration = 5000) {
  if (!imgSrc) return;
  const img = document.getElementById('cart-last-thumb');
  if (!img) return;
  
  img.src = imgSrc.replace(/ /g, "%20");
  img.classList.remove('hidden');
  if (__cart_thumb_timer) {
    clearTimeout(__cart_thumb_timer);
    __cart_thumb_timer = null;
  }
  __cart_thumb_timer = setTimeout(() => {
    if (img) img.classList.add('hidden');
  }, duration);
}

let __ferre_toast_timeout = null;

function ensureSingleToastElement() {
  const nodes = Array.from(document.querySelectorAll('#toast'));
  if (nodes.length > 1) {
    nodes.slice(1).forEach(n => n.parentNode && n.parentNode.removeChild(n));
  }
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.className = 'fixed top-6 right-6 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg font-semibold text-base opacity-0 pointer-events-none transition-opacity duration-500';
    Object.assign(toast.style, {
      position: 'fixed',
      top: '1.5rem',
      right: '1.5rem',
      zIndex: 9999,
      color: '#ffffff',
      padding: '0.75rem 1.5rem',
      borderRadius: '0.5rem',
      boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
      opacity: '0',
      pointerEvents: 'none',
      transition: 'opacity 0.25s ease-in-out, transform 0.25s ease-in-out',
      transform: 'translateY(-6px)'
    });
    toast.style.setProperty('background-color', '#16a34a', 'important');
    toast.style.setProperty('background-image', 'none', 'important');
    toast.style.setProperty('background-blend-mode', 'normal', 'important');
    toast.style.setProperty('-webkit-backdrop-filter', 'none', 'important');
    toast.style.setProperty('backdrop-filter', 'none', 'important');
    toast.style.setProperty('box-shadow', '0 10px 15px rgba(0,0,0,0.12)', 'important');

    const span = document.createElement('span');
    span.id = 'toast-msg';
    span.textContent = T_CARRITO.productAdded;
    span.style.color = '#ffffff';
    toast.appendChild(span);
    document.body.appendChild(toast);
  } else {
    if (!toast.querySelector('#toast-msg')) {
      const span = document.createElement('span');
      span.id = 'toast-msg';
      span.textContent = T_CARRITO.productAdded;
      span.style.color = '#ffffff';
      toast.appendChild(span);
    }
    toast.style.setProperty('background-color', toast.style.backgroundColor || '#16a34a', 'important');
    toast.style.setProperty('background-image', 'none', 'important');
    toast.style.setProperty('background-blend-mode', 'normal', 'important');
    toast.style.setProperty('-webkit-backdrop-filter', 'none', 'important');
    toast.style.setProperty('backdrop-filter', 'none', 'important');
    toast.style.setProperty('box-shadow', '0 10px 15px rgba(0,0,0,0.12)', 'important');

    Object.assign(toast.style, {
      position: toast.style.position || 'fixed',
      top: toast.style.top || '1.5rem',
      right: toast.style.right || '1.5rem',
      zIndex: toast.style.zIndex || 9999
    });
    const span = toast.querySelector('#toast-msg');
    if (span) span.style.color = '#ffffff';
  }
  return toast;
}

function showToast(message = T_CARRITO.productAdded, duration = 2000) {
  const toast = ensureSingleToastElement();
  const toastMsg = document.getElementById('toast-msg');
  if (toastMsg) {
    toastMsg.textContent = message;
    toastMsg.style.color = '#ffffff';
  }

  toast.style.setProperty('background-color', '#16a34a', 'important');
  toast.style.setProperty('background-image', 'none', 'important');
  toast.style.setProperty('background-blend-mode', 'normal', 'important');
  toast.style.setProperty('-webkit-backdrop-filter', 'none', 'important');
  toast.style.setProperty('backdrop-filter', 'none', 'important');

  toast.style.display = 'block';
  toast.offsetHeight;
  toast.style.opacity = '1';
  toast.style.pointerEvents = 'auto';
  toast.style.transform = 'translateY(0)';
  toast.classList.remove('opacity-0', 'pointer-events-none');
  toast.classList.add('opacity-100');

  if (__ferre_toast_timeout) {
    clearTimeout(__ferre_toast_timeout);
    __ferre_toast_timeout = null;
  }
  __ferre_toast_timeout = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.pointerEvents = 'none';
    toast.style.transform = 'translateY(-6px)';
    toast.classList.remove('opacity-100');
    toast.classList.add('opacity-0', 'pointer-events-none');
    setTimeout(() => {
      if (toast && toast.style) toast.style.display = 'none';
    }, 300);
  }, duration);
}

function mostrarToast(mensaje = T_CARRITO.productAdded) {
  try {
    showToast(mensaje, 2000);
  } catch (err) {
    console.log('mostrarToast fallback:', mensaje, err);
    try { alert(mensaje); } catch (e) { /* ignore */ }
  }
}

function renderCarrito() {
  const carrito = getCarrito();
  const carritoItems = document.getElementById("carrito-items");
  const subtotalEl = document.getElementById("subtotal");
  const totalEl = document.getElementById("total");
  const envioEl = document.getElementById("envio");
  const cartHeaderTotal = document.getElementById("cart-header-total");

  if (!carritoItems) return;

  carritoItems.innerHTML = "";
  let subtotal = 0;

  if (carrito.length === 0) {
    const emptyTemplate = document.getElementById('template-carrito-vacio');
    if (emptyTemplate) carritoItems.appendChild(emptyTemplate.content.cloneNode(true));
  } else {
    carrito.forEach((item, index) => {
      subtotal += (item.precio || 0) * (item.cantidad || 0);
      
      const itemTemplate = document.getElementById('template-carrito-item');
      if (!itemTemplate) return;
      
      const clone = itemTemplate.content.cloneNode(true);
      const img = clone.querySelector('.carrito-img');
      const nombre = clone.querySelector('.carrito-nombre');
      const precio = clone.querySelector('.carrito-precio');
      const cantidad = clone.querySelector('.carrito-cantidad');
      const subtotalItem = clone.querySelector('.carrito-subtotal');
      const btnMenos = clone.querySelector('.carrito-btn-menos');
      const btnMas = clone.querySelector('.carrito-btn-mas');
      const btnEliminar = clone.querySelector('.carrito-btn-eliminar');

      const rutaOrigen = item.img || item.imagen || "";
      if (img) {
          img.src = rutaOrigen.replace(/ /g, "%20");
          img.alt = item.nombre;
      }
      if (nombre) nombre.textContent = item.nombre;
      if (precio) precio.textContent = `S/ ${Number(item.precio).toFixed(2)}`;
      if (cantidad) cantidad.textContent = item.cantidad;
      if (subtotalItem) subtotalItem.textContent = `S/ ${(Number(item.precio) * item.cantidad).toFixed(2)}`;

      if (btnMenos) btnMenos.onclick = () => cambiarCantidad(index, -1);
      if (btnMas) btnMas.onclick = () => cambiarCantidad(index, 1);
      if (btnEliminar) btnEliminar.onclick = () => eliminarProductoConfirm(index);

      carritoItems.appendChild(clone);
    });
  }

  if (subtotalEl) subtotalEl.textContent = `S/ ${subtotal.toFixed(2)}`;

  const totalEnvio = carrito.length > 0 ? ENVIO_COST : 0.00;
  if (envioEl) envioEl.textContent = `S/ ${totalEnvio.toFixed(2)}`;

  const total = subtotal + totalEnvio;
  if (totalEl) totalEl.textContent = `S/ ${total.toFixed(2)}`;
  
  const totalCount = (carrito || []).reduce((s, it) => s + (it.cantidad || 0), 0);
  if (cartHeaderTotal) cartHeaderTotal.textContent = `Carrito (${totalCount})`;

  const badge = document.getElementById('cart-count-badge');
  if (badge) {
    badge.textContent = totalCount;
    if (Number(totalCount) <= 0) badge.classList.add('hidden'); else badge.classList.remove('hidden');
  }
  const priceDisplay = document.getElementById('cart-total-price');
  if (priceDisplay) {
    priceDisplay.textContent = `S/${subtotal.toFixed(2)}`;
  }

  try {
    localStorage.setItem('cart_subtotal', subtotal.toFixed(2));
    localStorage.setItem('cart_shipping', totalEnvio.toFixed(2));
    localStorage.setItem('cart_total', total.toFixed(2));
  } catch (e) { /* ignore */ }
}

function cambiarCantidad(index, delta) {
  const carrito = getCarrito();
  if (!carrito[index]) return;
  carrito[index].cantidad += delta;
  if (carrito[index].cantidad <= 0) {
    carrito.splice(index, 1);
  }
  // Mutamos silenciosamente para evitar bucles con renderCarrito
  localStorage.setItem('carrito', JSON.stringify(carrito));
  renderCarrito();
  actualizarCarritoHeader();
}

function eliminarProducto(index) {
  const carrito = getCarrito();
  carrito.splice(index, 1);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  renderCarrito();
  actualizarCarritoHeader();
}

function eliminarProductoConfirm(index) {
  const carrito = getCarrito();
  const item = carrito[index];
  const nombre = item ? item.nombre : 'este producto';
  if (confirm(T_CARRITO.confirmDelete.replace('{productName}', nombre))) {
    eliminarProducto(index);
  }
}

function vaciarCarrito() {
  setCarrito([]);
  renderCarrito();
  actualizarCarritoHeader();
  mostrarToast(T_CARRITO.cartEmptied);
}

function vaciarCarritoConfirm() {
  const carrito = getCarrito();
  if (carrito.length === 0) {
    mostrarToast(T_CARRITO.cartAlreadyEmpty);
    return;
  }
  if (confirm(T_CARRITO.confirmEmpty)) {
    vaciarCarrito();
  }
}

document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll('button').forEach(btn => {
    const txt = (btn.textContent || '').trim().toLowerCase();
    if (txt && txt.includes('agregar') && (txt.includes('carrito') || txt.includes('al carrito'))) {
      btn.addEventListener('click', function() {
        if (!validarCompradorParaCompra()) return;
        const card = btn.closest('.product-card');
        if (!card) return;
        const h3 = card.querySelector('h3');
        const nombre = h3 ? h3.textContent.trim() : 'Producto';
        const precioEl = card.querySelector('.product-price') || card.querySelector('.related-price');

        const precioTexto = precioEl
        ? precioEl.textContent.replace(/[^\d.,]/g, '').replace(',', '.')
        : '0';

        const precio = parseFloat(precioTexto) || 0;
        const imgEl = card.querySelector('img');
        
        let img = imgEl ? (imgEl.getAttribute('src') || '') : '';
        img = img.replace(/ /g, "%20");

        let carrito = getCarrito();
        const existente = carrito.find(item => item.nombre === nombre);
        if (existente) {
          existente.cantidad += 1;
          mostrarToast(T_CARRITO.quantityUpdated);
        } else {
          carrito.push({ nombre, precio, cantidad: 1, img: img, imagen: img });
          mostrarToast(T_CARRITO.productAdded);
        }
        setCarrito(carrito);
        actualizarCarritoHeader();
        try { showLastThumb(img); } catch (e) { /* ignore */ }
      });
      btn.dataset.bound = '1';
    }
  });

  document.addEventListener('click', function(e) {
    const btn = e.target.closest && e.target.closest('button');
    if (!btn) return;
    if (btn.dataset && btn.dataset.bound) return;
    const txt = (btn.textContent || '').trim().toLowerCase();
    if (txt && txt.includes('agregar') && (txt.includes('carrito') || txt.includes('al carrito'))) {
      if (!validarCompradorParaCompra()) return;
      const card = btn.closest('.product-card');
      if (!card) return;
      const h3 = card.querySelector('h3');
      const nombre = h3 ? h3.textContent.trim() : 'Producto';
      const precioEl = card.querySelector('.product-price') || card.querySelector('.related-price');

      const precioTexto = precioEl
      ? precioEl.textContent.replace(/[^\d.,]/g, '').replace(',', '.')
      : '0';

      const precio = parseFloat(precioTexto) || 0;
      const imgEl = card.querySelector('img');
      
      let img = imgEl ? (imgEl.getAttribute('src') || '') : '';
      img = img.replace(/ /g, "%20");

      let carrito = getCarrito();
      const existente = carrito.find(item => item.nombre === nombre);
      if (existente) {
        existente.cantidad += 1;
        mostrarToast(T_CARRITO.quantityUpdated);
      } else {
        carrito.push({ nombre, precio, cantidad: 1, img: img, imagen: img });
        mostrarToast(T_CARRITO.productAdded);
      }
      setCarrito(carrito);
      actualizarCarritoHeader();
      try { showLastThumb(img); } catch (e) { /* ignore */ }
      btn.dataset.bound = '1';
    }
  });

  actualizarCarritoHeader();
  renderCarrito();
});

// Evitamos el bucle infinito controlando flujos de mutación locales
window.addEventListener('carrito:changed', function(e) {
    actualizarCarritoHeader();
    renderCarrito();
});

// ===== MODAL DE PAGO AND FORM HANDLERS =====
(function() {
  const modal = document.getElementById('modalPago');
  const btnAbrir = document.getElementById('abrirModalPago');
  const btnCerrar = document.getElementById('cerrarModalPago');
  const btnCancelar = document.getElementById('cancelarPago');
  const form = document.getElementById('formPago');
  const radios = document.querySelectorAll('input[name="metodo"]');
  const camposTarjeta = document.getElementById('camposTarjeta');
  const camposBilletera = document.getElementById('camposBilletera');

  if (btnAbrir) {
    btnAbrir.addEventListener('click', function() {
      if (!validarCompradorParaCompra()) return;
      if (modal) modal.classList.remove('hidden');
      
      const subtotalEl = document.getElementById('subtotal');
      const envioEl = document.getElementById('envio');
      const totalEl = document.getElementById('total');

      const subtotal = subtotalEl ? subtotalEl.innerText : 'S/ 0.00';
      const envio = envioEl ? envioEl.innerText : 'S/ 0.00';
      const total = totalEl ? totalEl.innerText : 'S/ 0.00';
      
      const mSub = document.getElementById('modalSubtotal');
      const mEnv = document.getElementById('modalEnvio');
      const mTot = document.getElementById('modalTotal');

      if (mSub) mSub.innerText = subtotal;
      if (mEnv) mEnv.innerText = envio;
      if (mTot) mTot.innerText = total;
    });
  }

  function cerrarModal() {
    if (modal) modal.classList.add('hidden');
  }

  if (btnCerrar) btnCerrar.addEventListener('click', cerrarModal);
  if (btnCancelar) btnCancelar.addEventListener('click', cerrarModal);

  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        cerrarModal();
      }
    });
  }

  radios.forEach(radio => {
    radio.addEventListener('change', function() {
      if (this.value === 'visa' || this.value === 'mastercard') {
        if (camposTarjeta) camposTarjeta.classList.remove('hidden');
        if (camposBilletera) camposBilletera.classList.add('hidden');
      } else {
        if (camposTarjeta) camposTarjeta.classList.add('hidden');
        if (camposBilletera) camposBilletera.classList.remove('hidden');
      }
    });
  });

  const metodoChecked = document.querySelector('input[name="metodo"]:checked');
  if (metodoChecked) {
    metodoChecked.dispatchEvent(new Event('change'));
  }

  function mostrarError(mensaje) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-msg');
    if (toastMsg) toastMsg.innerText = '✗ ' + mensaje;
    if (toast) {
        toast.classList.remove('hidden', 'opacity-0');
        toast.classList.add('opacity-100');
        toast.style.backgroundColor = '#ef4444';
        toast.style.pointerEvents = 'auto';
    }
    setTimeout(() => {
      if (toast) {
          toast.classList.remove('opacity-100');
          toast.classList.add('opacity-0');
      }
    }, 3000);
  }

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const checkedMetodo = document.querySelector('input[name="metodo"]:checked');
      const metodo = checkedMetodo ? checkedMetodo.value : 'visa';
      
      if (metodo === 'visa' || metodo === 'mastercard') {
        const numeroTarjeta = document.getElementById('numeroTarjeta')?.value.replace(/\s/g, '') || '';
        const cvc = document.getElementById('cvc')?.value.trim() || '';
        
        if (numeroTarjeta !== '4242424242424242') {
          mostrarError('Número de tarjeta inválido. Use: 4242 4242 4242 4242');
          return;
        }
        
        if (!cvc || cvc.length < 3 || cvc.length > 4) {
          mostrarError('CVC inválido (3-4 dígitos)');
          return;
        }
      }
      
      localStorage.removeItem('carrito');
      localStorage.removeItem('cart_subtotal');
      localStorage.removeItem('cart_shipping');
      localStorage.removeItem('cart_total');
      
      const cItems = document.getElementById('carrito-items');
      const sub = document.getElementById('subtotal');
      const env = document.getElementById('envio');
      const tot = document.getElementById('total');

      if (cItems) cItems.innerHTML = '';
      if (sub) sub.innerText = 'S/ 0.00';
      if (env) env.innerText = 'S/ 0.00';
      if (tot) tot.innerText = 'S/ 0.00';
      
      const badge = document.getElementById('cart-count-badge');
      if (badge) {
        badge.textContent = '0';
        badge.classList.add('hidden');
      }
      
      cerrarModal();
      
      const toast = document.getElementById('toast');
      const toastMsg = document.getElementById('toast-msg');
      if (toastMsg) toastMsg.innerText = '✓ ¡Pago exitoso! Redirigiendo...';
      if (toast) {
          toast.classList.remove('hidden', 'opacity-0');
          toast.classList.add('opacity-100');
          toast.style.backgroundColor = '#10b981';
          toast.style.pointerEvents = 'auto';
      }
      
      setTimeout(() => {
        window.location.href = `${cartBasePath}/envio?t=` + Date.now();
      }, 2000);
    });
  }
})();