/* =====================================================================
   modooscuro.js
   Tema claro / oscuro / automático + acento + tamaño de letra.
   Claves de localStorage: 'modo' (claro|oscuro|auto), 'acento', 'tamano'
   Mantiene los IDs originales: themeToggle, themeToggleMobile,
   themeLabel, themeIcon.
   ===================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const btnToggle = document.getElementById('themeToggle');
  const btnToggleMobile = document.getElementById('themeToggleMobile');
  const labelToggle = document.getElementById('themeLabel');
  const iconToggle = document.getElementById('themeIcon');

  /* ---------- Constantes y utilidades ---------- */
  const CLAVE_MODO = 'modo';
  const CLAVE_ACENTO = 'acento';
  const CLAVE_TAMANO = 'tamano';
  const MODOS = ['claro', 'auto', 'oscuro'];
  const ACENTOS = ['rosa', 'azul', 'verde'];
  const TAM_MIN = 80;
  const TAM_MAX = 130;
  const TAM_PASO = 10;
  const TAM_DEF = 100;

  const mqOscuro = window.matchMedia('(prefers-color-scheme: dark)');
  const mqReducido = window.matchMedia('(prefers-reduced-motion: reduce)');

  const leer = (clave) => {
    try { return localStorage.getItem(clave); } catch (e) { return null; }
  };
  const guardar = (clave, valor) => {
    try { localStorage.setItem(clave, valor); } catch (e) { /* sin almacenamiento */ }
  };

  const normalizarModo = (v) => (MODOS.includes(v) ? v : 'auto');
  const normalizarAcento = (v) => (ACENTOS.includes(v) ? v : 'rosa');
  const normalizarTamano = (v) => {
    const n = parseInt(v, 10);
    if (Number.isNaN(n)) return TAM_DEF;
    return Math.min(TAM_MAX, Math.max(TAM_MIN, n));
  };

  /* ---------- Estado ---------- */
  let modo = normalizarModo(leer(CLAVE_MODO));
  let acento = normalizarAcento(leer(CLAVE_ACENTO));
  let tamano = normalizarTamano(leer(CLAVE_TAMANO));
  let temporizadorTransicion = null;

  const esOscuro = () => modo === 'oscuro' || (modo === 'auto' && mqOscuro.matches);

  /* ---------- Accesibilidad del interruptor ---------- */
  if (btnToggle) {
    btnToggle.setAttribute('role', 'switch');
    btnToggle.setAttribute('aria-label', 'Cambiar tema');
    if (btnToggle.tagName === 'BUTTON') {
      btnToggle.setAttribute('type', 'button');
    } else {
      // Si no es un <button>, se hace operable con teclado (Tab, Enter y Espacio)
      if (!btnToggle.hasAttribute('tabindex')) btnToggle.setAttribute('tabindex', '0');
      btnToggle.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          btnToggle.click();
        }
      });
    }
  }
  if (iconToggle) iconToggle.classList.add('tema-icono');

  /* ---------- Textos ---------- */
  const actualizarTexto = (modoOscuroActivo) => {
    const textoToggle = modoOscuroActivo ? 'Modo claro' : 'Modo oscuro';

    if (labelToggle) labelToggle.textContent = textoToggle;
    if (btnToggle) btnToggle.setAttribute('title', `Cambiar a ${textoToggle.toLowerCase()}`);
    if (btnToggleMobile) btnToggleMobile.textContent = textoToggle;
  };

  /* ---------- Ícono sol/luna con animación (rotación + fade) ---------- */
  const actualizarIcono = (modoOscuroActivo, animar) => {
    if (!iconToggle) return;
    const poner = () => {
      iconToggle.textContent = modoOscuroActivo ? 'dark_mode' : 'light_mode';
    };
    if (!animar || mqReducido.matches) {
      poner();
      return;
    }
    iconToggle.classList.add('tema-icono-salida');
    setTimeout(() => {
      poner();
      iconToggle.classList.remove('tema-icono-salida');
    }, 160);
  };

  /* ---------- Aplicar tema (solo visual, no guarda) ---------- */
  const aplicarModo = (modoOscuroActivo, inicial = false) => {
    const habiaCambio = document.body.classList.contains('dark') !== modoOscuroActivo;

    // Transición suave global solo cuando el usuario cambia el tema
    if (habiaCambio && !inicial && !mqReducido.matches) {
      root.classList.add('tema-transicion');
      clearTimeout(temporizadorTransicion);
      temporizadorTransicion = setTimeout(() => root.classList.remove('tema-transicion'), 450);
    }

    root.classList.toggle('dark', modoOscuroActivo);
    document.body.classList.toggle('dark', modoOscuroActivo);
    root.setAttribute('data-theme', modoOscuroActivo ? 'dark' : 'light');
    document.body.setAttribute('data-theme', modoOscuroActivo ? 'dark' : 'light');
    root.style.colorScheme = modoOscuroActivo ? 'dark' : 'light';

    actualizarIcono(modoOscuroActivo, habiaCambio && !inicial);
    if (btnToggle) btnToggle.setAttribute('aria-checked', String(modoOscuroActivo));

    actualizarTexto(modoOscuroActivo);
  };

  const aplicarAcento = (valor) => {
    root.setAttribute('data-acento', valor);
  };

  const aplicarTamano = (valor) => {
    root.style.fontSize = valor === TAM_DEF ? '' : `${valor}%`;
  };

  /* ---------- Panel de apariencia (se crea solo, no hace falta HTML) ---------- */
  const panel = document.createElement('div');
  panel.className = 'tema-panel';
  panel.innerHTML = `
    <button type="button" class="tema-panel-btn" aria-expanded="false"
            aria-controls="temaPanelCuerpo" aria-label="Personalizar apariencia">🎨</button>
    <div class="tema-panel-cuerpo" id="temaPanelCuerpo" role="group" aria-label="Apariencia" hidden>
      <p class="tema-panel-titulo">Tema</p>
      <div class="tema-panel-fila">
        <button type="button" data-modo="claro" aria-pressed="false">Claro</button>
        <button type="button" data-modo="auto" aria-pressed="false">Auto</button>
        <button type="button" data-modo="oscuro" aria-pressed="false">Oscuro</button>
      </div>
      <p class="tema-panel-titulo">Color de acento</p>
      <div class="tema-panel-fila">
        <button type="button" class="tema-swatch" data-acento="rosa" aria-label="Acento rosa" aria-pressed="false"></button>
        <button type="button" class="tema-swatch" data-acento="azul" aria-label="Acento azul" aria-pressed="false"></button>
        <button type="button" class="tema-swatch" data-acento="verde" aria-label="Acento verde" aria-pressed="false"></button>
      </div>
      <p class="tema-panel-titulo">Tamaño de letra</p>
      <div class="tema-panel-fila">
        <button type="button" data-tam="menos" aria-label="Reducir tamaño de letra">A−</button>
        <span class="tema-tam-valor" aria-live="polite"></span>
        <button type="button" data-tam="mas" aria-label="Aumentar tamaño de letra">A+</button>
        <button type="button" data-tam="reset" aria-label="Restablecer tamaño de letra">↺</button>
      </div>
    </div>`;
  // El panel vive en la barra de navegación (escritorio) o en el menú móvil,
  // así nunca tapa los botones de redes ni otros elementos flotantes.
  const mqMovil = window.matchMedia('(max-width: 768px)');
  const ubicarPanel = () => {
    const navAcciones = document.querySelector('.nav-actions');
    const menuMovil = document.getElementById('dropdownMenu');
    panel.classList.remove('tema-panel-nav', 'tema-panel-movil');
    if (mqMovil.matches && menuMovil) {
      menuMovil.appendChild(panel);
      panel.classList.add('tema-panel-movil');
    } else if (navAcciones) {
      if (btnToggle && navAcciones.contains(btnToggle)) {
        btnToggle.after(panel);
      } else {
        navAcciones.appendChild(panel);
      }
      panel.classList.add('tema-panel-nav');
    } else {
      document.body.appendChild(panel); // respaldo: flotante
    }
  };
  ubicarPanel();

  const panelBtn = panel.querySelector('.tema-panel-btn');
  const panelCuerpo = panel.querySelector('.tema-panel-cuerpo');
  const tamValor = panel.querySelector('.tema-tam-valor');

  const actualizarPanel = () => {
    panel.querySelectorAll('[data-modo]').forEach((b) => {
      b.setAttribute('aria-pressed', String(b.dataset.modo === modo));
    });
    panel.querySelectorAll('[data-acento]').forEach((b) => {
      b.setAttribute('aria-pressed', String(b.dataset.acento === acento));
    });
    tamValor.textContent = `${tamano}%`;
  };

  const abrirPanel = (abrir) => {
    panelCuerpo.hidden = !abrir;
    panelBtn.setAttribute('aria-expanded', String(abrir));
  };

  /* ---------- Acciones (aplican y guardan) ---------- */
  const establecerModo = (nuevo) => {
    modo = normalizarModo(nuevo);
    guardar(CLAVE_MODO, modo);
    aplicarModo(esOscuro());
    actualizarPanel();
  };

  const establecerAcento = (nuevo) => {
    acento = normalizarAcento(nuevo);
    guardar(CLAVE_ACENTO, acento);
    aplicarAcento(acento);
    actualizarPanel();
  };

  const establecerTamano = (nuevo) => {
    tamano = normalizarTamano(nuevo);
    guardar(CLAVE_TAMANO, String(tamano));
    aplicarTamano(tamano);
    actualizarPanel();
  };

  // El interruptor alterna entre claro y oscuro
  const alternar = () => establecerModo(esOscuro() ? 'claro' : 'oscuro');

  /* ---------- Eventos ---------- */
  if (btnToggle) {
    btnToggle.addEventListener('click', alternar);
  }

  if (btnToggleMobile) {
    btnToggleMobile.addEventListener('click', (event) => {
      event.preventDefault();
      alternar();
    });
  }

  panel.addEventListener('click', (event) => {
    const boton = event.target.closest('button');
    if (!boton) return;
    if (boton.classList.contains('tema-panel-btn')) {
      abrirPanel(panelCuerpo.hidden);
    } else if (boton.dataset.modo) {
      establecerModo(boton.dataset.modo);
    } else if (boton.dataset.acento) {
      establecerAcento(boton.dataset.acento);
    } else if (boton.dataset.tam) {
      if (boton.dataset.tam === 'mas') establecerTamano(tamano + TAM_PASO);
      if (boton.dataset.tam === 'menos') establecerTamano(tamano - TAM_PASO);
      if (boton.dataset.tam === 'reset') establecerTamano(TAM_DEF);
    }
  });

  // Reubicar el panel si cambia el tamaño de pantalla (escritorio <-> móvil)
  const alCambiarPantalla = () => { abrirPanel(false); ubicarPanel(); };
  if (mqMovil.addEventListener) {
    mqMovil.addEventListener('change', alCambiarPantalla);
  } else if (mqMovil.addListener) {
    mqMovil.addListener(alCambiarPantalla);
  }

  // Cerrar el panel con Escape o al hacer clic fuera
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !panelCuerpo.hidden) {
      abrirPanel(false);
      panelBtn.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (!panelCuerpo.hidden && !panel.contains(event.target)) abrirPanel(false);
  });

  // Atajo de teclado: Ctrl + J (o Cmd + J en Mac)
  document.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && !event.shiftKey && !event.altKey &&
        event.key.toLowerCase() === 'j') {
      event.preventDefault();
      alternar();
    }
  });

  // Si el sistema cambia de tema y estamos en "auto", seguirlo
  const alCambiarSistema = () => {
    if (modo === 'auto') aplicarModo(esOscuro());
  };
  if (mqOscuro.addEventListener) {
    mqOscuro.addEventListener('change', alCambiarSistema);
  } else if (mqOscuro.addListener) {
    mqOscuro.addListener(alCambiarSistema); // Safari antiguo
  }

  // Sincronizar entre pestañas
  window.addEventListener('storage', (event) => {
    if (event.key !== null && ![CLAVE_MODO, CLAVE_ACENTO, CLAVE_TAMANO].includes(event.key)) return;
    modo = normalizarModo(leer(CLAVE_MODO));
    acento = normalizarAcento(leer(CLAVE_ACENTO));
    tamano = normalizarTamano(leer(CLAVE_TAMANO));
    aplicarModo(esOscuro());
    aplicarAcento(acento);
    aplicarTamano(tamano);
    actualizarPanel();
  });

  /* ---------- Estado inicial ---------- */
  aplicarModo(esOscuro(), true);
  aplicarAcento(acento);
  aplicarTamano(tamano);
  actualizarPanel();
});