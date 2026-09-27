(function () {
  'use strict';

  // Base path del servidor: vacio en local, "/tutawayta" en produccion.
  const libroBasePath = window.TUTA_BASE_PATH || (window.location.pathname.startsWith('/tutawayta') ? '/tutawayta' : '');

  const form = document.getElementById('libroForm');
  if (!form) {
    console.error("El formulario 'libroForm' no fue encontrado.");
    return;
  }

  const modal = document.getElementById('modal');
  const modalNum = document.getElementById('modalNum');
  const numHojaEl = document.getElementById('numero-hoja');
  const fechaHoyEl = document.getElementById('fecha-hoy');
  const counter = document.getElementById('char-counter');
  const detalle = document.getElementById('detalle');
  const tipoHid = document.getElementById('tipo');
  const quejaExtra = document.getElementById('queja-extra');
  const quejaInfo = document.getElementById('queja-info');
  const banner = document.getElementById('tipo-banner');
  const bannerIcon = document.getElementById('banner-icon');
  const bannerTitle = document.getElementById('banner-title');
  const bannerDesc = document.getElementById('banner-desc');
  const numDetalle = document.getElementById('num-detalle');
  const numConf = document.getElementById('num-confirmacion');
  const btnEnviar = document.getElementById('btnEnviar');
  const modalTitulo = document.getElementById('modal-titulo');
  const modalIconEl = document.getElementById('modal-icon');
  const modalPlazo = document.getElementById('modal-plazo');
  const refAnterior = document.getElementById('ref-anterior');
  const calificacion = document.getElementById('calificacion');
  const calLabel = document.getElementById('cal-label');
  let esQueja = false;

  const hoy = new Date();
  const hoyIso = hoy.toISOString().split('T')[0];

  if (fechaHoyEl) {
    fechaHoyEl.textContent = hoy.toLocaleDateString('es-PE', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }

  ['fecha_compra', 'fecha_incidente'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.setAttribute('max', hoyIso);
  });

  const soloLetrasRegex = /[^a-záéíóúüñA-ZÁÉÍÓÚÜÑ\s]/g;
  const soloNumerosRegex = /\D/g;

  ['nombres', 'apellidos'].forEach(id => {
    const input = document.getElementById(id);
    if (!input) return;

    input.addEventListener('keydown', event => {
      if (event.ctrlKey || event.metaKey || event.altKey || !event.key || event.key.length > 1) return;
      if (!/^[a-záéíóúüñA-ZÁÉÍÓÚÜÑ\s]$/.test(event.key)) event.preventDefault();
    });

    input.addEventListener('input', () => {
      input.value = input.value.replace(soloLetrasRegex, '');
    });

    input.addEventListener('paste', event => {
      const texto = (event.clipboardData || window.clipboardData).getData('text');
      if (soloLetrasRegex.test(texto)) event.preventDefault();
    });
  });

  ['doc_num', 'telefono'].forEach(id => {
    const input = document.getElementById(id);
    if (!input) return;

    input.addEventListener('keydown', event => {
      if (event.ctrlKey || event.metaKey || event.altKey || !event.key || event.key.length > 1) return;
      if (!/^\d$/.test(event.key)) event.preventDefault();
    });

    input.addEventListener('input', () => {
      input.value = input.value.replace(soloNumerosRegex, '');
    });

    input.addEventListener('paste', event => {
      const texto = (event.clipboardData || window.clipboardData).getData('text');
      if (soloNumerosRegex.test(texto)) event.preventDefault();
    });
  });

  document.querySelectorAll('input[name="tipo_sel"]').forEach(radio => {
    radio.addEventListener('change', () => actualizarTipo(radio.value));
  });

  document.querySelectorAll('input[name="primera_vez"]').forEach(radio => {
    radio.addEventListener('change', () => {
      if (refAnterior) refAnterior.style.display = radio.value === 'no' ? 'flex' : 'none';
      setError('primera_vez', '');
    });
  });

  if (detalle && counter) {
    detalle.addEventListener('input', () => {
      const length = detalle.value.length;
      counter.textContent = `${length} / 1000 caracteres`;
      counter.style.color = length > 900 ? '#d93025' : '';
    });
  }

  function actualizarTipo(tipo) {
    esQueja = tipo === 'queja';
    tipoHid.value = tipo;

    if (quejaExtra) quejaExtra.style.display = esQueja ? 'block' : 'none';
    if (quejaInfo) quejaInfo.style.display = esQueja ? 'flex' : 'none';
    if (banner) banner.className = 'tipo-banner' + (esQueja ? ' queja-mode' : '');

    bannerIcon.textContent = esQueja ? '📢' : '⚠';
    bannerTitle.textContent = esQueja ? 'Estas registrando una Queja' : 'Estas registrando una Reclamacion';
    bannerDesc.textContent = esQueja
      ? 'Malestar o descontento con la atencion recibida.'
      : 'Disconformidad con productos o servicios.';

    if (numDetalle) numDetalle.textContent = esQueja ? '04' : '03';
    if (numConf) numConf.textContent = esQueja ? '05' : '04';

    btnEnviar.textContent = esQueja ? 'Enviar Queja ->' : 'Enviar Reclamacion ->';
    btnEnviar.classList.toggle('queja-mode', esQueja);

    if (!esQueja) limpiarCamposQueja();
  }

  function setCalificacion(value) {
    calificacion.value = value || '';
    document.querySelectorAll('.star').forEach(star => {
      star.classList.toggle('active', value && Number(star.dataset.val) <= Number(value));
    });

    const labels = { 1: 'Muy mala', 2: 'Mala', 3: 'Regular', 4: 'Buena', 5: 'Excelente' };
    calLabel.textContent = labels[value] || 'Haz clic para calificar';
    setError('calificacion', '');
  }

  document.querySelectorAll('input[name="tipo_atencion"]').forEach(radio => {
    radio.addEventListener('change', () => setError('tipo_atencion', ''));
  });

  document.querySelectorAll('input[name="motivo[]"]').forEach(check => {
    check.addEventListener('change', () => setError('motivos', ''));
  });

  document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', () => setCalificacion(star.dataset.val));
  });

  // =======================================================================
  // VALIDACIÓN DE FORMULARIO (LA PIEZA CLAVE QUE FALTABA)
  // =======================================================================

  const reglasBase = {
    nombres: { label: 'Nombres', minLen: 3 },
    apellidos: { label: 'Apellidos', minLen: 3 },
    doc_tipo: { label: 'Tipo de documento' },
    doc_num: { label: 'Numero de documento', pattern: /^[0-9]{8,12}$/ },
    email: { label: 'Correo', type: 'email' },
    telefono: { label: 'Telefono', pattern: /^[0-9]{7,9}$/ },
    fecha_compra: { label: 'Fecha de compra' },
    bien: { label: 'Descripción del bien o servicio', minLen: 5 },
    detalle: { label: 'Descripcion', minLen: 20 },
    pedido: { label: 'Pedido', minLen: 10 }
  };

  function setError(id, msg) {
    const error = document.getElementById('err-' + id);
    const field = document.getElementById(id);
    if (error) error.textContent = msg;
    if (field) field.classList.toggle('bad', Boolean(msg));
  }

  function validarCampo(id) {
    const regla = reglasBase[id];
    const field = document.getElementById(id);
    if (!regla || !field) return true;

    const value = field.value.trim();
    if (!value) {
      setError(id, `El campo '${regla.label}' es obligatorio.`);
      return false;
    }
    if (regla.minLen && value.length < regla.minLen) {
      setError(id, `Mínimo ${regla.minLen} caracteres.`);
      return false;
    }
    if (regla.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError(id, 'El formato del correo es inválido.');
      return false;
    }
    if (regla.pattern && !regla.pattern.test(value)) {
      setError(id, `${regla.label} invalido.`);
      return false;
    }

    setError(id, '');
    return true;
  }

  Object.keys(reglasBase).forEach(id => {
    const field = document.getElementById(id);
    if (!field) return;
    field.addEventListener('blur', () => validarCampo(id));
    field.addEventListener('input', () => {
      if (field.classList.contains('bad')) validarCampo(id);
    });
  });

  form.addEventListener('submit', event => {
    event.preventDefault();

    let ok = true;

    if (esQueja) {
      const tipoAtencion = document.querySelector('input[name="tipo_atencion"]:checked');
      const motivos = document.querySelectorAll('input[name="motivo[]"]:checked');
      const primeraVez = document.querySelector('input[name="primera_vez"]:checked');
      const fechaIncidente = document.getElementById('fecha_incidente');

      if (!fechaIncidente.value) {
        setError('fecha_incidente', 'Fecha del incidente es obligatoria.');
        ok = false;
      } else {
        setError('fecha_incidente', '');
      }
      if (!tipoAtencion) {
        setError('tipo_atencion', 'Selecciona el tipo de atención.');
        ok = false;
      }
      if (!motivos.length) {
        setError('motivos', 'Selecciona al menos un motivo.');
        ok = false;
      }
      if (!calificacion.value) {
        setError('calificacion', 'Selecciona una calificación.');
        ok = false;
      }
      if (!primeraVez) {
        setError('primera_vez', 'Selecciona una opción.');
        ok = false;
      }
    } else {
      // Si NO es queja, solo validamos los campos base
      Object.keys(reglasBase).forEach(id => {
        if (!validarCampo(id)) ok = false;
      });
    }

    const acepto = document.getElementById('acepto');
    if (!acepto.checked) {
      setError('acepto', 'Debes aceptar la declaración.');
      ok = false;
    } else {
      setError('acepto', '');
    }

    if (!ok) {
      const bad = form.querySelector('.bad');
      if (bad) {
        bad.scrollIntoView({ behavior: 'smooth', block: 'center' });
        bad.focus();
      }
      return;
    }

    const formData = new FormData(form);
    completarCamposServidor(formData);

    // Usamos la ruta base dinamica para que funcione tanto en local como
    // detras del subpath /tutawayta en produccion.
    fetch(`${libroBasePath}/libro`, {
      method: 'POST',
      body: formData
    })
      .then(async response => {
        let data;
        try {
          data = await response.json();
        } catch (parseError) {
          throw new Error(`El servidor respondio de forma inesperada (codigo ${response.status}). Avisa al equipo tecnico.`);
        }
        return data;
      })
      .then(data => {
        btnEnviar.disabled = false; // Reactivar botón
        if (data.ok) {
          mostrarModal(esQueja, data.numero_hoja);
          limpiar();
        } else {
          alert(data.msg || 'Error al registrar el formulario. Intenta nuevamente.');
        }
      })
      .catch(error => {
        btnEnviar.disabled = false; // Reactivar botón
        alert('Error al conectar con el servidor: ' + error.message);
      });
  });

  function completarCamposServidor(formData) {
    if (tipoHid.value !== 'queja') return;

    const tipoAtencion = document.querySelector('input[name="tipo_atencion"]:checked')?.value || '';
    const motivos = Array.from(document.querySelectorAll('input[name="motivo[]"]:checked')).map(el => el.value);
    const fechaIncidente = document.getElementById('fecha_incidente').value;
    const horaIncidente = document.getElementById('hora_incidente').value;
    const primeraVez = document.querySelector('input[name="primera_vez"]:checked')?.value || '';
    const refQueja = document.getElementById('ref_queja').value.trim();
    const personal = document.getElementById('personal').value.trim();

    formData.set('area_queja', tipoAtencion);
    formData.set('personal_queja', personal || 'No especificado');
    formData.set(
      'gravedad',
      [
        `Motivos: ${motivos.join(', ')}`,
        `Calificacion: ${calificacion.value}/5`,
        `Fecha incidente: ${fechaIncidente}`,
        horaIncidente ? `Hora: ${horaIncidente}` : '',
        `Primera vez: ${primeraVez}`,
        refQueja ? `Referencia: ${refQueja}` : ''
      ].filter(Boolean).join(' | ')
    );
  }

  function mostrarModal(esQueja, numeroHojaServidor) {
    const numHoja = numeroHojaServidor || generarNumHojaLocal();
    if (numHojaEl) numHojaEl.textContent = numHoja;
    if (modalNum) modalNum.textContent = numHoja;
    if (modalIconEl) modalIconEl.textContent = esQueja ? '📢' : '✅';
    if (modalTitulo) modalTitulo.textContent = esQueja ? 'Queja Registrada!' : 'Reclamacion Registrada!';
    if (modalPlazo) modalPlazo.textContent = '15 dias habiles';
    if (modal) modal.classList.add('open');
  }

  function generarNumHojaLocal() {
    const correlativo = parseInt(localStorage.getItem('tw_cor') || '1', 10);
    const numero = `${hoy.getFullYear()}-${String(correlativo).padStart(4, '0')}`;
    localStorage.setItem('tw_cor', String(correlativo + 1));
    return numero;
  }

  function limpiarCamposQueja() {
    document.querySelectorAll('#queja-extra input').forEach(input => {
      if (input.type === 'radio' || input.type === 'checkbox') input.checked = false;
      else input.value = '';
    });
    setCalificacion('');
    if (refAnterior) refAnterior.style.display = 'none';
    ['tipo_atencion', 'fecha_incidente', 'motivos', 'calificacion', 'primera_vez'].forEach(id => setError(id, ''));
  }

  function limpiar() {
    form.reset();
    tipoHid.value = 'reclamacion';
    document.querySelector('input[name="tipo_sel"][value="reclamacion"]').checked = true;
    actualizarTipo('reclamacion');
    if (counter) {
      counter.textContent = '0 / 1000 caracteres';
      counter.style.color = '';
    }
    document.querySelectorAll('.err').forEach(el => { el.textContent = ''; });
    document.querySelectorAll('.bad').forEach(el => { el.classList.remove('bad'); });
  }

  document.getElementById('btnCerrar').addEventListener('click', () => {
    modal.classList.remove('open');
  });

  modal.addEventListener('click', event => {
    if (event.target === modal) modal.classList.remove('open');
  });

  document.getElementById('btnImprimir').addEventListener('click', () => {
    modal.classList.remove('open');
    setTimeout(() => window.print(), 300);
  });

  document.getElementById('btnLimpiar').addEventListener('click', () => {
    if (confirm('Limpiar todos los campos?')) limpiar();
  });

  actualizarTipo('reclamacion');
})();
