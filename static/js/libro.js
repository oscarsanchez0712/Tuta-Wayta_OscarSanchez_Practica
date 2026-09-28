(function () {
  'use strict';

  const basePath = window.TUTA_BASE_PATH ||
    (window.location.pathname.startsWith('/tutawayta') ? '/tutawayta' : '');

  const $ = id => document.getElementById(id);
  const form = $('libroForm');
  if (!form) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------------------------------------------------------------------
  // Traducciones: usa el caché de i18n.js y cae al texto en español.
  // ---------------------------------------------------------------------
  function currentLang() {
    return localStorage.getItem('tuta_lang') || document.documentElement.lang || 'es';
  }

  function t(key, fallback, vars) {
    const dict = (window.i18nData && window.i18nData[currentLang()]) || {};
    let text = dict[key] || fallback;
    if (vars) {
      Object.keys(vars).forEach(k => { text = text.replace('{' + k + '}', vars[k]); });
    }
    return text;
  }

  // Cambia el texto y también la clave, para que un cambio de idioma lo retraduzca solo.
  function setText(el, key, fallback) {
    if (!el) return;
    el.setAttribute('data-i18n', key);
    el.textContent = t(key, fallback);
  }

  // ---------------------------------------------------------------------
  // Referencias
  // ---------------------------------------------------------------------
  const tipoHid = $('tipo');
  const quejaSec = $('queja-extra');
  const quejaInfo = $('queja-info');
  const banner = $('tipo-banner');
  const bannerIcon = $('banner-icon');
  const btnEnviar = $('btnEnviar');
  const btnLabel = $('btnLabel');
  const formAlert = $('formAlert');
  const refAnterior = $('ref-anterior');
  const numHojaEl = $('numero-hoja');
  const modal = $('modal');
  const dlgClear = $('dlgClear');
  const calLabel = $('cal-label');

  let esQueja = false;
  let enviando = false;

  // ---------------------------------------------------------------------
  // Fechas (hora local de la persona, no UTC)
  // ---------------------------------------------------------------------
  const pad = n => String(n).padStart(2, '0');
  const isoLocal = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const hoyIso = () => isoLocal(new Date());

  const fechaHoyEl = $('fecha-hoy');
  if (fechaHoyEl) {
    fechaHoyEl.textContent = new Date().toLocaleDateString('es-PE', {
      day: '2-digit', month: 'long', year: 'numeric'
    });
  }
  ['fecha_compra', 'fecha_incidente'].forEach(id => {
    const el = $(id);
    if (el) el.max = hoyIso();
  });

  // ---------------------------------------------------------------------
  // Documento de identidad según el tipo elegido
  // ---------------------------------------------------------------------
  const DOCS = {
    DNI: {
      re: /^\d{8}$/, max: 8, mode: 'numeric', ph: '12345678',
      clean: v => v.replace(/\D/g, ''),
      key: 'book_err_dni', fb: 'El DNI debe tener 8 dígitos.'
    },
    CE: {
      re: /^[A-Za-z0-9]{9,12}$/, max: 12, mode: 'text', ph: '001234567',
      clean: v => v.replace(/[^A-Za-z0-9]/g, ''),
      key: 'book_err_ce', fb: 'El carnet de extranjería debe tener entre 9 y 12 caracteres.'
    },
    Pasaporte: {
      re: /^[A-Za-z0-9]{6,12}$/, max: 12, mode: 'text', ph: 'AB123456',
      clean: v => v.replace(/[^A-Za-z0-9]/g, ''),
      key: 'book_err_pasaporte', fb: 'El pasaporte debe tener entre 6 y 12 caracteres.'
    }
  };
  const DOC_DEFAULT = {
    re: /^[A-Za-z0-9]{6,12}$/, max: 12, mode: 'text', ph: '12345678',
    clean: v => v.replace(/[^A-Za-z0-9]/g, ''),
    key: 'book_err_docnum', fb: 'Número de documento inválido.'
  };
  const docActual = () => DOCS[$('doc_tipo').value] || DOC_DEFAULT;

  function aplicarTipoDocumento() {
    const cfg = docActual();
    const input = $('doc_num');
    input.maxLength = cfg.max;
    input.inputMode = cfg.mode;
    input.placeholder = cfg.ph;
    input.value = cfg.clean(input.value).slice(0, cfg.max);
    setError('doc_num', '');
  }

  // ---------------------------------------------------------------------
  // Limpieza de texto mientras se escribe (sin bloquear teclas)
  // ---------------------------------------------------------------------
  const limpiadores = {
    nombres: v => v.replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s'’-]/g, ''),
    apellidos: v => v.replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s'’-]/g, ''),
    telefono: v => v.replace(/\D/g, '').slice(0, 9),
    doc_num: v => docActual().clean(v).slice(0, docActual().max)
  };

  Object.keys(limpiadores).forEach(id => {
    const input = $(id);
    if (!input) return;
    input.addEventListener('input', () => {
      const limpio = limpiadores[id](input.value);
      if (limpio !== input.value) input.value = limpio;
    });
  });

  $('doc_tipo').addEventListener('change', aplicarTipoDocumento);

  // ---------------------------------------------------------------------
  // Validación
  // ---------------------------------------------------------------------
  const requerido = () => t('book_err_required', 'Este campo es obligatorio.');
  const minimo = n => t('book_err_min', 'Escribe al menos {n} caracteres.', { n });

  const validadores = {
    nombres: v => !v ? requerido() : v.length < 2 ? minimo(2) : '',
    apellidos: v => !v ? requerido() : v.length < 2 ? minimo(2) : '',
    doc_tipo: v => v ? '' : t('book_err_select', 'Selecciona una opción.'),
    doc_num: v => {
      if (!v) return requerido();
      const cfg = docActual();
      return cfg.re.test(v) ? '' : t(cfg.key, cfg.fb);
    },
    email: v => !v ? requerido()
      : /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : t('book_err_email', 'Escribe un correo válido, por ejemplo nombre@correo.com.'),
    telefono: v => !v ? requerido()
      : /^\d{7,9}$/.test(v) ? '' : t('book_err_phone', 'El teléfono debe tener entre 7 y 9 dígitos.'),
    direccion: v => !v ? requerido() : v.length < 5 ? minimo(5) : '',
    monto: v => {
      if (v === '') return '';
      const n = Number(v);
      return n >= 0 && n <= 99999 ? '' : t('book_err_amount', 'Escribe un monto entre 0 y 99999.');
    },
    fecha_compra: v => !v ? requerido()
      : v > hoyIso() ? t('book_err_future', 'La fecha no puede ser futura.') : '',
    bien: v => !v ? requerido() : v.length < 5 ? minimo(5) : '',
    fecha_incidente: v => !v ? requerido()
      : v > hoyIso() ? t('book_err_future', 'La fecha no puede ser futura.') : '',
    detalle: v => !v ? requerido() : v.length < 20 ? minimo(20) : '',
    pedido: v => !v ? requerido() : v.length < 10 ? minimo(10) : ''
  };

  function setError(id, msg) {
    const err = $('err-' + id);
    const el = $(id);
    if (err) err.textContent = msg || '';
    if (!el) return;
    el.classList.toggle('bad', Boolean(msg));
    if (el.matches('input, select, textarea')) {
      if (msg) el.setAttribute('aria-invalid', 'true');
      else el.removeAttribute('aria-invalid');
    }
  }

  function validarCampo(id) {
    const el = $(id);
    if (!el || !validadores[id]) return true;
    const msg = validadores[id](el.value.trim());
    setError(id, msg);
    return !msg;
  }

  Object.keys(validadores).forEach(id => {
    const el = $(id);
    if (!el) return;
    el.addEventListener('blur', () => {
      // No molestar con "obligatorio" en campos que la persona nunca tocó.
      if (el.value.trim() || el.classList.contains('bad')) validarCampo(id);
    });
    const evento = el.tagName === 'SELECT' || el.type === 'date' ? 'change' : 'input';
    el.addEventListener(evento, () => {
      if (el.classList.contains('bad')) validarCampo(id);
    });
  });

  function validarGruposQueja() {
    let ok = true;
    if (!form.querySelector('input[name="tipo_atencion"]:checked')) {
      setError('tipo_atencion', t('book_err_atencion', 'Selecciona el tipo de atención.'));
      ok = false;
    }
    if (!form.querySelector('input[name="motivo[]"]:checked')) {
      setError('motivos', t('book_err_motivo', 'Selecciona al menos un motivo.'));
      ok = false;
    }
    if (!form.querySelector('input[name="calificacion"]:checked')) {
      setError('calificacion', t('book_err_rating', 'Selecciona una calificación.'));
      ok = false;
    }
    if (!form.querySelector('input[name="primera_vez"]:checked')) {
      setError('primera_vez', t('book_err_first', 'Selecciona una opción.'));
      ok = false;
    }
    return ok;
  }

  function validarTodo() {
    const ids = ['nombres', 'apellidos', 'doc_tipo', 'doc_num', 'email', 'telefono', 'direccion',
      'monto', 'fecha_compra', 'bien', 'detalle', 'pedido'];
    if (esQueja) ids.push('fecha_incidente');

    let ok = true;
    ids.forEach(id => { if (!validarCampo(id)) ok = false; });
    if (esQueja && !validarGruposQueja()) ok = false;

    if (!$('acepto').checked) {
      setError('acepto', t('book_err_accept', 'Debes aceptar la declaración para enviar.'));
      ok = false;
    } else {
      setError('acepto', '');
    }
    return ok;
  }

  // Los grupos quitan su error al elegir algo
  [['tipo_atencion', 'tipo_atencion'], ['motivos', 'motivo[]'], ['primera_vez', 'primera_vez']].forEach(([grupo, name]) => {
    form.querySelectorAll(`input[name="${name}"]`).forEach(inp => {
      inp.addEventListener('change', () => setError(grupo, ''));
    });
  });
  $('acepto').addEventListener('change', () => setError('acepto', ''));

  // ---------------------------------------------------------------------
  // Calificación, "primera vez" y contadores
  // ---------------------------------------------------------------------
  const ratingFallback = { 1: 'Muy mala', 2: 'Mala', 3: 'Regular', 4: 'Buena', 5: 'Excelente' };

  function actualizarRating() {
    const marcado = form.querySelector('input[name="calificacion"]:checked');
    if (marcado) {
      const v = marcado.value;
      setText(calLabel, 'book_rating_' + v, ratingFallback[v]);
      setError('calificacion', '');
    } else {
      setText(calLabel, 'book_rating_hint', 'Haz clic para calificar');
    }
  }
  form.querySelectorAll('input[name="calificacion"]').forEach(r => r.addEventListener('change', actualizarRating));

  form.querySelectorAll('input[name="primera_vez"]').forEach(r => {
    r.addEventListener('change', () => { refAnterior.hidden = r.value !== 'no'; });
  });

  function contador(id, contId, max) {
    const campo = $(id);
    const cont = $(contId);
    const pintar = () => {
      const n = campo.value.length;
      cont.textContent = t('book_char_count', '{n} / {max}', { n, max });
      cont.classList.toggle('is-near', n > max * 0.9);
    };
    campo.addEventListener('input', pintar);
    pintar();
    return pintar;
  }
  const pintarDetalle = contador('detalle', 'cnt-detalle', 1000);
  const pintarPedido = contador('pedido', 'cnt-pedido', 500);

  // ---------------------------------------------------------------------
  // Reclamación / Queja
  // ---------------------------------------------------------------------
  function resetQueja() {
    quejaSec.querySelectorAll('input').forEach(inp => {
      if (inp.type === 'radio' || inp.type === 'checkbox') inp.checked = false;
      else inp.value = '';
    });
    refAnterior.hidden = true;
    ['tipo_atencion', 'fecha_incidente', 'motivos', 'calificacion', 'primera_vez'].forEach(id => setError(id, ''));
    actualizarRating();
  }

  function setTipo(tipo) {
    esQueja = tipo === 'queja';
    tipoHid.value = tipo;

    // Un fieldset deshabilitado no envía sus campos al servidor.
    quejaSec.hidden = !esQueja;
    quejaSec.disabled = !esQueja;
    quejaInfo.hidden = !esQueja;
    banner.classList.toggle('is-queja', esQueja);
    bannerIcon.textContent = esQueja ? 'campaign' : 'info';

    setText($('banner-title'),
      esQueja ? 'book_banner_complaint_title' : 'book_banner_claim_title',
      esQueja ? 'Estás registrando una Queja' : 'Estás registrando una Reclamación');
    setText($('banner-desc'),
      esQueja ? 'book_banner_complaint_desc' : 'book_banner_claim_desc',
      esQueja ? 'Malestar o descontento con la atención recibida.' : 'Disconformidad con productos o servicios.');

    if (!enviando) {
      setText(btnLabel,
        esQueja ? 'book_btn_submit_complaint' : 'book_btn_submit',
        esQueja ? 'Enviar Queja' : 'Enviar Reclamación');
    }
    if (!esQueja) resetQueja();
  }

  document.querySelectorAll('input[name="tipo_sel"]').forEach(r => {
    r.addEventListener('change', () => { if (r.checked) setTipo(r.value); });
  });

  // ---------------------------------------------------------------------
  // Envío
  // ---------------------------------------------------------------------
  function mostrarAlerta(msg) {
    formAlert.textContent = msg;
    formAlert.hidden = false;
    formAlert.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
  }
  function ocultarAlerta() {
    formAlert.hidden = true;
    formAlert.textContent = '';
  }

  function ocupado(si) {
    enviando = si;
    btnEnviar.disabled = si;
    btnEnviar.classList.toggle('is-busy', si);
    btnEnviar.setAttribute('aria-busy', String(si));
    if (si) {
      setText(btnLabel, 'book_sending', 'Enviando...');
    } else {
      setText(btnLabel,
        esQueja ? 'book_btn_submit_complaint' : 'book_btn_submit',
        esQueja ? 'Enviar Queja' : 'Enviar Reclamación');
    }
  }

  function enfocarPrimerError() {
    const bad = form.querySelector('.bad');
    if (!bad) return;
    bad.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    const foco = bad.matches('input, select, textarea') ? bad : bad.querySelector('input');
    if (foco) foco.focus({ preventScroll: true });
  }

  // El servidor guarda estos datos de la queja en campos propios.
  function completarCamposServidor(fd) {
    if (!esQueja) return;
    const val = sel => (form.querySelector(sel) || {}).value || '';
    const motivos = Array.from(form.querySelectorAll('input[name="motivo[]"]:checked')).map(el => el.value);
    const partes = [
      `Motivos: ${motivos.join(', ')}`,
      `Calificacion: ${val('input[name="calificacion"]:checked')}/5`,
      `Fecha incidente: ${val('#fecha_incidente')}`,
      val('#hora_incidente') ? `Hora: ${val('#hora_incidente')}` : '',
      `Primera vez: ${val('input[name="primera_vez"]:checked')}`,
      val('#ref_queja').trim() ? `Referencia: ${val('#ref_queja').trim()}` : ''
    ].filter(Boolean);

    fd.set('area_queja', val('input[name="tipo_atencion"]:checked'));
    fd.set('personal_queja', val('#personal').trim() || 'No especificado');
    fd.set('gravedad', partes.join(' | '));
  }

  function llenarConstancia(numeroHoja) {
    const v = id => $(id).value.trim();
    $('modalNum').textContent = numeroHoja;
    $('c-fecha').textContent = fechaHoyEl.textContent;
    $('c-nombre').textContent = `${v('nombres')} ${v('apellidos')}`;
    $('c-doc').textContent = `${$('doc_tipo').value} ${v('doc_num')}`;
    $('c-bien').textContent = v('bien');
    $('c-detalle').textContent = v('detalle');
    $('c-pedido').textContent = v('pedido');

    $('modal-icon').textContent = esQueja ? 'campaign' : 'check_circle';
    setText($('modal-titulo'),
      esQueja ? 'book_modal_complaint_title' : 'book_modal_title',
      esQueja ? 'Queja registrada' : 'Reclamación registrada');

    numHojaEl.removeAttribute('data-i18n');
    numHojaEl.textContent = numeroHoja;
    numHojaEl.classList.remove('is-empty');
  }

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (enviando) return;
    ocultarAlerta();

    if (!validarTodo()) {
      mostrarAlerta(t('book_err_form', 'Revisa los campos marcados en rojo antes de enviar.'));
      enfocarPrimerError();
      return;
    }

    const fd = new FormData(form);
    completarCamposServidor(fd);

    ocupado(true);
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 20000);

    try {
      const res = await fetch(`${basePath}/libro`, { method: 'POST', body: fd, signal: ctrl.signal });
      let data = null;
      try { data = await res.json(); } catch (_) { /* respuesta no JSON */ }

      if (res.ok && data && data.ok && data.numero_hoja) {
        llenarConstancia(data.numero_hoja); // antes de limpiar el formulario
        limpiarFormulario();
        modal.showModal();
      } else {
        console.error('Libro de reclamaciones: respuesta inesperada', res.status, data);
        mostrarAlerta(t('book_send_error',
          'No pudimos registrar tu hoja. Inténtalo de nuevo en unos minutos o escríbenos por WhatsApp.'));
      }
    } catch (error) {
      console.error('Libro de reclamaciones:', error);
      mostrarAlerta(error.name === 'AbortError'
        ? t('book_timeout', 'El servidor tardó demasiado en responder. Inténtalo de nuevo.')
        : t('book_network_error', 'No hay conexión con el servidor. Revisa tu internet e inténtalo de nuevo.'));
    } finally {
      clearTimeout(timer);
      ocupado(false);
    }
  });

  // ---------------------------------------------------------------------
  // Limpiar y diálogos
  // ---------------------------------------------------------------------
  function limpiarFormulario() {
    form.reset();
    document.querySelector('input[name="tipo_sel"][value="reclamacion"]').checked = true;
    setTipo('reclamacion');
    aplicarTipoDocumento();
    pintarDetalle();
    pintarPedido();
    form.querySelectorAll('.err').forEach(el => { el.textContent = ''; });
    form.querySelectorAll('.bad').forEach(el => el.classList.remove('bad'));
    form.querySelectorAll('[aria-invalid]').forEach(el => el.removeAttribute('aria-invalid'));
    ocultarAlerta();
  }

  $('btnLimpiar').addEventListener('click', () => dlgClear.showModal());
  $('btnClearNo').addEventListener('click', () => dlgClear.close());
  $('btnClearYes').addEventListener('click', () => {
    dlgClear.close();
    limpiarFormulario();
  });

  $('btnCerrar').addEventListener('click', () => modal.close());
  $('btnImprimir').addEventListener('click', () => window.print());

  // Cerrar al hacer clic en el fondo oscuro
  [modal, dlgClear].forEach(dlg => {
    dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
  });

  // Al cambiar de idioma, refrescar los textos que arma el script
  window.addEventListener('languageChanged', () => {
    setTimeout(() => {
      pintarDetalle();
      pintarPedido();
      actualizarRating();
    }, 250);
  });

  setTipo('reclamacion');
  aplicarTipoDocumento();
})();