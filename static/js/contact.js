document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) {
    console.error("El formulario de contacto con id 'contactForm' no fue encontrado.");
    return;
  }

  const submitButton = form.querySelector('button[type="submit"]');
  const formMessage = document.getElementById('form-message');
  const confirmationScreen = document.getElementById('confirmationScreen');
  const closeConfirmationBtn = document.getElementById('closeConfirmationBtn');

  if (!confirmationScreen || !closeConfirmationBtn) {
    console.warn("La pantalla de confirmación o su botón de cierre no fueron encontrados.");
    return;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // --- Recolectar datos del formulario ---
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // --- VALIDACIÓN DEL LADO DEL CLIENTE ---
    if (!data.nombre || !data.correo || !data.telefono || !data.asunto || !data.mensaje) {
      showToast('❌ Por favor, completa todos los campos.', 'error');
      return;
    }

    // Validación de formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.correo)) {
      showToast('❌ El formato del correo electrónico no es válido.', 'error');
      return;
    }


    // --- Deshabilitar botón para evitar envíos múltiples ---
    submitButton.disabled = true;
    submitButton.style.opacity = '0.7';
    const originalButtonText = submitButton.innerHTML;
    submitButton.innerHTML = `
      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      Enviando...
    `;

    // --- Limpiar mensajes anteriores ---
    if (formMessage) {
      formMessage.textContent = '';
      formMessage.className = 'form-message';
    }

    try {
      // 🔥 CORRECCIÓN: Usar la ruta base dinámica para que funcione en producción y local.
      // Se agrega un respaldo que detecta el prefijo directamente de la URL del navegador,
      // por si window.TUTA_BASE_PATH aún no llegó a estar disponible (caché, deploy parcial, etc.)
      const basePath = window.TUTA_BASE_PATH || (window.location.pathname.startsWith('/tutawayta') ? '/tutawayta' : '');
      const submitUrl = basePath + '/contacto';

      const response = await fetch(submitUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      // Si el servidor respondió con algo que no es JSON (ej. una página de error
      // 404/500 porque la ruta estaba mal), evitamos que esto se confunda con un
      // error de red genuino y mostramos un mensaje más útil.
      let result;
      try {
        result = await response.json();
      } catch (parseError) {
        console.error(`Respuesta no-JSON del servidor (status ${response.status}) en ${submitUrl}`, parseError);
        showToast(`❌ El servidor respondió de forma inesperada (código ${response.status}). Avisa al equipo técnico.`, 'error');
        if (formMessage) {
          formMessage.textContent = `Error inesperado del servidor (código ${response.status}).`;
          formMessage.classList.add('error');
        }
        return;
      }

      if (response.ok) {
        // --- Éxito ---
        form.reset();
        showConfirmationScreen(); // Mostramos la nueva pantalla de confirmación
        // 🔥 NUEVO: Notificar a otras pestañas (como el dashboard) que hay un nuevo mensaje.
        localStorage.setItem('new_contact_message', Date.now());
      } else {
        // --- Error del servidor (ej. validación) ---
        showToast(`❌ ${result.msg || 'Hubo un error.'}`, 'error');
        if (formMessage) {
          formMessage.textContent = result.msg || 'Por favor, revisa los campos e intenta de nuevo.';
          formMessage.classList.add('error');
        }
      }
    } catch (error) {
      // --- Error de red o conexión real (el navegador no pudo ni contactar al servidor) ---
      console.error('Error al enviar el formulario:', error);
      showToast('❌ Error de red. Inténtalo más tarde.', 'error');
      if (formMessage) {
        formMessage.textContent = 'No se pudo conectar con el servidor. Revisa tu conexión a internet.';
        formMessage.classList.add('error');
      }
    } finally {
      // --- Reactivar el botón ---
      submitButton.disabled = false;
      submitButton.style.opacity = '1';
      submitButton.innerHTML = originalButtonText;
    }
  });

  // --- Lógica para la pantalla de confirmación ---
  function showConfirmationScreen() {
    if (confirmationScreen) confirmationScreen.classList.add('visible');
  }

  function hideConfirmationScreen() {
    if (confirmationScreen) confirmationScreen.classList.remove('visible');
  }

  if (closeConfirmationBtn) {
    closeConfirmationBtn.addEventListener('click', hideConfirmationScreen);
  }

  // --- Función para mostrar notificaciones flotantes (Toast) ---
  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast-notification ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    // Forzar la animación de entrada
    setTimeout(() => {
      toast.classList.add('show');
    }, 100);

    // Ocultar y eliminar después de 4 segundos
    setTimeout(() => {
      toast.classList.remove('show');
      toast.addEventListener('transitionend', () => {
        toast.remove();
      });
    }, 4000);
  }
});
s