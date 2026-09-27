// =========================================================================
// 1. GESTIÓN DE APERTURA, CIERRE E INTERFACES DEL MODAL
// =========================================================================
const pagoBasePath = window.TUTA_BASE_PATH || (window.location.pathname.startsWith('/tutawayta') ? '/tutawayta' : '');
const pagoAppUrl = (path) => `${pagoBasePath}${path}`;

document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('modalPago');
  const btnAbrir = document.getElementById('abrirModalPago');
  const btnCerrar = document.getElementById('cerrarModalPago');
  const payBtn = document.getElementById('payBtn');

  function validarCompradorParaPago() {
    let usuario = null;
    try {
      usuario = JSON.parse(localStorage.getItem('tuta_session_user'));
    } catch (error) {
      usuario = null;
    }

    if (!usuario) {
      alert('Para finalizar la compra debes iniciar sesión o crear una cuenta.');
      window.location.href = pagoAppUrl('/login');
      return false;
    }

    if (usuario.role !== 'comprador') {
      alert('Solo las cuentas de comprador pueden finalizar compras.');
      return false;
    }

    return true;
  }

  if (btnAbrir && modal) {
    btnAbrir.addEventListener('click', () => {
      if (!validarCompradorParaPago()) return;
      // Sincronizar montos actuales antes de mostrar la pasarela
      updateAmountInput();
      try { prefillUserAndSummary(); } catch(e){}
      
      // Pasar de oculto a Flexbox para centrar matemáticamente en pantalla
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      
      // Actualizar dinámicamente el texto del botón de pago principal
      const currentAmt = document.getElementById('amount').value || '0.00';
      if(payBtn) payBtn.textContent = `PAGAR S/ ${currentAmt}`;
    });
  }

  if (btnCerrar && modal) {
    btnCerrar.addEventListener('click', () => {
      modal.classList.remove('flex');
      modal.classList.add('hidden');
    });
  }

  // Cerrar el modal si el usuario hace clic en el fondo gris exterior
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('flex');
        modal.classList.add('hidden');
      }
    });
  }
});

// =========================================================================
// 2. UTILIDADES DE VALIDACIÓN (Luhn, Expiración y Alertas)
// =========================================================================
function luhnCheck(number) {
  const digits = number.replace(/\D/g, '').split('').reverse().map(d => parseInt(d, 10));
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    let d = digits[i];
    if (i % 2 === 1) { d *= 2; if (d > 9) d -= 9; }
    sum += d;
  }
  return sum % 10 === 0;
}

function validateExpiry(value) {
  if (!/^\d{2}\/\d{2}$/.test(value)) return false;
  const [mm, yy] = value.split('/').map(s => parseInt(s, 10));
  if (mm < 1 || mm > 12) return false;
  
  const now = new Date();
  const thisYY = parseInt(String(now.getFullYear()).slice(-2), 10);
  const thisMM = now.getMonth() + 1;
  
  if (yy < thisYY) return false;
  if (yy === thisYY && mm < thisMM) return false;
  return true;
}

function showMessage(text, type = 'success') {
  const out = document.getElementById('output');
  if (!out) return;
  out.innerHTML = `<div style="margin-top:14px; padding:12px; border-radius:8px; font-weight:600; text-align:center; font-size:13px; ${type==='error'?'background:#fff1f2; color:#991b1b; border:1px solid #ffb4b4;':'background:#ecfdf5; color:#065f46; border:1px solid #bbf7d0;'}">${text}</div>`;
}

// =========================================================================
// 3. CAPTURA Y CARGA DE MONTOS DESDE LOCALSTORAGE
// =========================================================================
function getCartAmount() {
  try {
    const storedTotal = localStorage.getItem('cart_total');
    if (storedTotal && /^[\d\.,]+$/.test(storedTotal)) return Number(storedTotal.replace(',', '.'));
  } catch (e) {}
  return 0;
}

function updateAmountInput() {
  const input = document.getElementById('amount');
  if (!input) return;
  const amt = getCartAmount();
  input.value = amt.toFixed(2);
}

function prefillUserAndSummary() {
  try {
    const storedName = localStorage.getItem('user_name') || localStorage.getItem('name') || '';
    const storedEmail = localStorage.getItem('user_email') || localStorage.getItem('email') || '';
    const storedAddress = localStorage.getItem('user_address') || localStorage.getItem('direccion') || '';
    const storedPhone = localStorage.getItem('user_phone') || localStorage.getItem('telefono') || '';
    const n = document.getElementById('name'); if (n && storedName) n.value = storedName;
    const e = document.getElementById('email'); if (e && storedEmail) e.value = storedEmail;
    const a = document.getElementById('direccion'); if (a && storedAddress) a.value = storedAddress;
    const p = document.getElementById('telefono'); if (p && storedPhone) p.value = storedPhone;
  } catch (e) {}

  try {
    const sub = localStorage.getItem('cart_subtotal') || '0.00';
    const ship = localStorage.getItem('cart_shipping') || '0.00';
    const tot = localStorage.getItem('cart_total') || '0.00';
    const summaryEl = document.getElementById('amount-summary');
    if (summaryEl) {
      summaryEl.style.display = 'block';
      summaryEl.innerHTML = `
        <div class="flex justify-between"><span>Subtotal:</span><strong>S/ ${sub}</strong></div>
        <div class="flex justify-between"><span>Envío:</span><strong>S/ ${ship}</strong></div>
        <div class="flex justify-between border-t border-gray-200 pt-1 mt-1 font-bold text-[#e0006e]"><span>Total:</span><span>S/ ${tot}</span></div>
      `;
    }
  } catch (e) {}
}

// =========================================================================
// 4. MÁSCARAS DE ENTRADA Y ENVÍO DEL FORMULARIO
// =========================================================================
document.addEventListener('DOMContentLoaded', function() {
  updateAmountInput();
  
  const form = document.getElementById('paymentForm');
  const payBtn = document.getElementById('payBtn');

  // Separador automático de tarjeta (cada 4 dígitos)
  const cardInput = document.getElementById('cardNumber');
  if (cardInput) {
    cardInput.addEventListener('input', (e) => {
      const v = e.target.value.replace(/\D/g, '').slice(0, 16);
      const groups = v.match(/.{1,4}/g);
      e.target.value = groups ? groups.join(' ') : v;
    });
  }

  // Separador automático de expiración (MM/AA)
  const expiry = document.getElementById('expiry');
  if (expiry) {
    expiry.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '').slice(0, 4);
      if (v.length >= 3) v = v.slice(0, 2) + '/' + v.slice(2);
      e.target.value = v;
    });
  }

  const phoneInput = document.getElementById('telefono');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').slice(0, 9);
    });
  }

  // Intercambio visual limpio entre Tarjeta y Yape/Plin
  function updatePaymentMethodFields() {
    const checkedRadio = document.querySelector('input[name="paymethod"]:checked');
    if (!checkedRadio) return;
    const method = checkedRadio.value;
    const walletSection = document.getElementById('wallet-fields');
    const cardSection = document.getElementById('credit-card-fields');
    
    if (method === 'yape' || method === 'plin') {
      if (walletSection) walletSection.style.display = 'block';
      if (cardSection) cardSection.style.display = 'none';
    } else {
      if (walletSection) walletSection.style.display = 'none';
      if (cardSection) cardSection.style.display = 'block';
    }
    
    // Sincronizar el texto del botón al cambiar método
    const currentAmt = document.getElementById('amount').value || '0.00';
    if(payBtn) payBtn.textContent = `PAGAR S/ ${currentAmt}`;
  }

  document.querySelectorAll('input[name="paymethod"]').forEach(r => r.addEventListener('change', updatePaymentMethodFields));
  updatePaymentMethodFields();

  // ENVÍO FINAL DEL FORMULARIO Y VALIDACIÓN
  if (form) {
    form.addEventListener('submit', async (ev) => {
      ev.preventDefault();
      payBtn.disabled = true;
      showMessage('Validando pago...', 'success');

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const direccion = document.getElementById('direccion').value.trim();
      const telefono = document.getElementById('telefono').value.trim();
      const method = document.querySelector('input[name="paymethod"]:checked').value;
      const amount = parseFloat(document.getElementById('amount').value);
      const card = document.getElementById('cardNumber').value.replace(/\s/g, '');
      const exp = document.getElementById('expiry').value;
      const cvc = document.getElementById('cvc').value.trim();
      const walletNumber = document.getElementById('walletNumber').value.trim();

      if (!name || !email || !direccion || !telefono || isNaN(amount) || amount <= 0) {
        showMessage('Por favor, completa todos los campos obligatorios.', 'error');
        payBtn.disabled = false;
        return;
      }

      if (!/^\d{9}$/.test(telefono)) {
        showMessage('Ingresa un teléfono válido de 9 dígitos.', 'error');
        payBtn.disabled = false;
        return;
      }

      if (method === 'yape' || method === 'plin') {
        if (!/^\d{9}$/.test(walletNumber)) {
          showMessage('Ingresa un número celular válido (9 dígitos).', 'error');
          payBtn.disabled = false;
          return;
        }
      } else {
        if (!/^\d{13,16}$/.test(card) || !luhnCheck(card)) {
          showMessage('Número de tarjeta inválido.', 'error');
          payBtn.disabled = false;
          return;
        }
        if (!validateExpiry(exp)) {
          showMessage('Fecha de expiración caducada o incorrecta.', 'error');
          payBtn.disabled = false;
          return;
        }
        if (!/^\d{3,4}$/.test(cvc)) {
          showMessage('Código CVC incorrecto.', 'error');
          payBtn.disabled = false;
          return;
        }
      }

      // Enviar datos del carrito al backend para generar y enviar el PDF
      try {
        // Obtener productos del carrito
        let productos = [];
        try {
          productos = JSON.parse(localStorage.getItem('carrito')) || [];
        } catch (e) { productos = []; }
        const total = parseFloat(localStorage.getItem('cart_total')) || amount;

        const res = await fetch(pagoAppUrl('/generar_reporte_pdf'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productos,
            email,
            nombre: name,
            direccion,
            telefono,
            total
          })
        });
        const data = await res.json();
        if (data.ok) {
          showMessage('¡Pago procesado y reporte enviado a tu correo!', 'success');
        } else {
          showMessage('Pago procesado, pero hubo un error al enviar el reporte.', 'error');
        }
      } catch (e) {
        showMessage('Pago procesado, pero no se pudo enviar el reporte.', 'error');
      }

      // LIMPIEZA DEL CARRITO TRAS EL PAGO
      try {
        localStorage.setItem('user_name', name);
        localStorage.setItem('user_email', email);
        localStorage.setItem('user_address', direccion);
        localStorage.setItem('user_phone', telefono);
        localStorage.setItem('pagoProcesado', 'true');
        localStorage.removeItem('cart');
        localStorage.removeItem('carrito');
        localStorage.removeItem('cart_total');
        localStorage.removeItem('cart_subtotal');
        localStorage.removeItem('cart_shipping');
        if (typeof vaciarCarrito === 'function') {
          vaciarCarrito();
        } else if (typeof limpiarCarrito === 'function') {
          limpiarCarrito();
        }
      } catch(e){
        console.log("Error al limpiar localStorage:", e);
      }

      setTimeout(() => {
        window.location.href = pagoAppUrl('/');
      }, 2000);
    });
  }
});