/**
 * Tuta Wayta - Módulo de Chatbot Interactivo
 * Desarrollado con ES6+, Manejo de Estado, Persistencia y Seguridad Anti-XSS
 */
class TutaWaytaChatbot {
  constructor(config = {}) {
    // Configuración general
    this.storageKey = config.storageKey || 'tutawayta_chat_history';
    this.maxChars = config.maxChars || 300;
    this.typingDelay = config.typingDelay || 800;

    // Estado interno
    this.isLoading = false;
    this.hasWelcomed = false;

    // Cache de elementos del DOM
    this.dom = {
      toggle: document.getElementById('chat-toggle'),
      window: document.getElementById('chat-window'),
      messages: document.getElementById('chat-messages'),
      quickReplies: document.getElementById('quick-replies'),
      input: document.getElementById('chat-input'),
      sendBtn: document.getElementById('send-btn'),
      clearBtn: document.getElementById('chat-clear-btn'),
      charCounter: document.getElementById('char-counter'),
      headerStatus: document.querySelector('[data-i18n="chat_header_status"]'),
      onlineDot: document.querySelector('.online-dot'),
      statusTime: document.getElementById('chat-status-time')
    };

    // Cargar diccionarios
    this.translations = this.getTranslations();
    this.keywords = this.getKeywords();

    // Inicializar listeners y temporizadores
    this.init();
  }

  // ─── 1. INICIALIZACIÓN ───
  init() {
    if (!this.dom.window || !this.dom.toggle) {
      console.warn('Chatbot Tuta Wayta: Elementos base no encontrados en el DOM.');
      return;
    }

    this.bindEvents();
    this.updateClock();
    this.checkBusinessStatus();

    // Actualización de estado y reloj cada 60 segundos
    setInterval(() => {
      this.updateClock();
      this.checkBusinessStatus();
    }, 60000);
  }

  // ─── 2. ASIGNACIÓN DE EVENTOS ───
  bindEvents() {
    // Alternar visibilidad de la ventana
    this.dom.toggle.addEventListener('click', () => this.toggleChat());

    // Botón para limpiar historial
    if (this.dom.clearBtn) {
      this.dom.clearBtn.addEventListener('click', () => this.clearHistory());
    }

    // Botón de envío de mensaje
    if (this.dom.sendBtn) {
      this.dom.sendBtn.addEventListener('click', () => this.handleSend());
    }

    // Entrada de teclado
    if (this.dom.input) {
      this.dom.input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.handleSend();
        }
      });

      this.dom.input.addEventListener('input', () => this.updateCharCounter());
    }

    // Delegación de eventos para Respuestas Rápidas (Quick Replies)
    if (this.dom.quickReplies) {
      this.dom.quickReplies.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (btn && btn.dataset.key) {
          this.handleSend(btn.dataset.key);
        }
      });
    }

    // Accesibilidad: Cerrar ventana al presionar la tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.toggleChat(false);
      }
    });
  }

  // ─── 3. CONTROL DE ESTADO Y VISIBILIDAD ───
  isOpen() {
    return this.dom.window.classList.contains('open');
  }

  toggleChat(forceState = null) {
    const nextState = forceState !== null ? forceState : !this.isOpen();
    
    this.dom.window.classList.toggle('open', nextState);
    this.dom.window.setAttribute('aria-hidden', String(!nextState));
    this.dom.toggle.setAttribute('aria-expanded', String(nextState));

    const iconChat = this.dom.toggle.querySelector('.icon-chat');
    const iconClose = this.dom.toggle.querySelector('.icon-close');

    if (iconChat) iconChat.style.display = nextState ? 'none' : 'block';
    if (iconClose) iconClose.style.display = nextState ? 'block' : 'none';

    if (nextState) {
      if (!this.hasWelcomed && this.dom.messages.children.length === 0) {
        const history = this.loadHistory();
        if (history.length > 0) {
          history.forEach(item => this.renderMessage(item.role, item.text, false, item.time));
        } else {
          this.sendWelcome();
        }
        this.hasWelcomed = true;
      }
      if (this.dom.input) this.dom.input.focus();
    }
  }

  // ─── 4. PERSISTENCIA DE DATOS (localStorage) ───
  loadHistory() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error('Error al leer el historial desde localStorage:', e);
      return [];
    }
  }

  saveHistory(history) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(history));
    } catch (e) {
      console.error('Error al guardar en localStorage:', e);
    }
  }

  appendToHistory(role, text, time) {
    const history = this.loadHistory();
    history.push({ role, text, time });
    this.saveHistory(history);
  }

  clearHistory() {
    localStorage.removeItem(this.storageKey);
    this.dom.messages.innerHTML = '';
    this.hasWelcomed = false;
    this.sendWelcome();
  }

  // ─── 5. SEGURIDAD Y PARSER DE TEXTO ───
  escapeHTML(str) {
    const p = document.createElement('p');
    p.textContent = str;
    return p.innerHTML;
  }

  parseMarkdown(text) {
    let clean = this.escapeHTML(text);
    return clean
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/\n/g, '<br>');
  }

  // ─── 6. RENDERIZADO EN EL DOM ───
  renderMessage(role, text, persist = true, timestamp = Date.now()) {
    const isAtBottom = this.dom.messages.scrollHeight - this.dom.messages.scrollTop <= this.dom.messages.clientHeight + 50;

    const msg = document.createElement('div');
    msg.classList.add('msg', role);

    const bubble = document.createElement('div');
    bubble.classList.add('msg-bubble');
    bubble.innerHTML = this.parseMarkdown(text);

    const time = document.createElement('div');
    time.classList.add('msg-time');
    time.textContent = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    msg.appendChild(bubble);
    msg.appendChild(time);
    this.dom.messages.appendChild(msg);

    // Auto-scroll adaptativo
    if (isAtBottom || role === 'user') {
      this.dom.messages.scrollTop = this.dom.messages.scrollHeight;
    }

    if (persist) {
      this.appendToHistory(role, text, timestamp);
    }
  }

  showTyping() {
    const div = document.createElement('div');
    div.classList.add('msg', 'bot');
    div.id = 'typing-indicator-wrapper';
    div.innerHTML = `<div class="msg-bubble" style="padding:8px 14px">
      <div class="typing-indicator"><span></span><span></span><span></span></div>
    </div>`;
    this.dom.messages.appendChild(div);
    this.dom.messages.scrollTop = this.dom.messages.scrollHeight;
  }

  hideTyping() {
    const typing = document.getElementById('typing-indicator-wrapper');
    if (typing) typing.remove();
  }

  // ─── 7. LÓGICA DE NEGOCIO Y PROCESAMIENTO ───
  getCurrentLang() {
    return document.documentElement.lang || 'es';
  }

  updateClock() {
    if (this.dom.statusTime) {
      this.dom.statusTime.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    }
  }

  isBusinessOpen() {
    const now = new Date();
    const day = now.getDay(); // 0 = Domingo
    const hour = now.getHours();
    return day !== 0 && hour >= 8 && hour < 18;
  }

  checkBusinessStatus() {
    const isOpen = this.isBusinessOpen();
    if (this.dom.headerStatus) {
      this.dom.headerStatus.textContent = isOpen ? 'En línea' : 'Fuera de línea';
    }
    if (this.dom.onlineDot) {
      this.dom.onlineDot.style.backgroundColor = isOpen ? '#00e676' : '#888';
    }
  }

  sendWelcome() {
    const lang = this.getCurrentLang();
    const text = this.translations[lang]?.welcome || this.translations.es.welcome;
    this.renderMessage('bot', text);
  }

  handleSend(customText = null) {
    if (this.isLoading) return;

    const rawText = customText || (this.dom.input ? this.dom.input.value.trim() : '');
    if (!rawText) return;

    if (rawText.length > this.maxChars) {
      alert(`El mensaje supera el límite máximo de ${this.maxChars} caracteres.`);
      return;
    }

    this.renderMessage('user', rawText);

    if (!customText && this.dom.input) {
      this.dom.input.value = '';
      this.updateCharCounter();
    }

    this.isLoading = true;
    this.showTyping();

    setTimeout(() => {
      this.hideTyping();
      const botReply = this.getReply(rawText);
      this.renderMessage('bot', botReply);
      this.isLoading = false;
    }, this.typingDelay);
  }

  updateCharCounter() {
    if (this.dom.charCounter && this.dom.input) {
      const len = this.dom.input.value.length;
      this.dom.charCounter.textContent = `${len}/${this.maxChars}`;
    }
  }

  normalize(str) {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  // ─── 8. MOTOR DE BÚSQUEDA Y EVALUACIÓN DE INTENCIONES ───
  getReply(userInput) {
    const lang = this.getCurrentLang();
    const i18n = this.translations[lang] || this.translations.es;
    
    // 1. Mapeo directo por clave
    if (i18n[userInput]) {
      if (userInput === 'hours') return this.formatHoursReply(lang);
      return this.pickRandom(i18n[userInput]);
    }

    // 2. Coincidencia por peso de palabras clave (Score Match)
    const cleanInput = this.normalize(userInput);
    let bestCategory = null;
    let maxScore = 0;

    for (const [category, words] of Object.entries(this.keywords)) {
      let score = 0;
      words.forEach(word => {
        if (cleanInput.includes(word)) {
          score += word.length; // Las palabras más largas dan más relevancia
        }
      });

      if (score > maxScore) {
        maxScore = score;
        bestCategory = category;
      }
    }

    if (bestCategory && i18n[bestCategory]) {
      if (bestCategory === 'hours') return this.formatHoursReply(lang);
      return this.pickRandom(i18n[bestCategory]);
    }

    // 3. Respuesta por defecto (Fallback)
    return this.pickRandom(i18n.fallback);
  }

  formatHoursReply(lang) {
    const i18n = this.translations[lang] || this.translations.es;
    const isOpen = this.isBusinessOpen();
    const statusText = isOpen ? i18n.statusOpen : i18n.statusClosed;
    return `${statusText}\n${this.pickRandom(i18n.hours)}`;
  }

  pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // ─── 9. DICCIÓNARIOS Y RECURSOS MULTIIDIOMA ───
  getKeywords() {
    return {
      greetings: ['hola', 'buenas', 'buenos dias', 'buenas tardes', 'hello', 'hi', 'bonjour', 'ola', 'hallo', 'ciao'],
      order: ['pedido', 'comprar', 'pedir', 'compras', 'orden', 'order', 'buy'],
      hours: ['horario', 'horas', 'abierto', 'atencion', 'apertura', 'hours', 'open', 'schedule'],
      products: ['producto', 'productos', 'catalogo', 'pitahaya', 'fruta', 'pulpa', 'products'],
      shipping: ['envio', 'envios', 'despacho', 'delivery', 'entrega', 'shipping'],
      contact: ['contacto', 'telefono', 'correo', 'email', 'llamar', 'contact', 'phone'],
      location: ['ubicacion', 'donde', 'donde estan', 'mapa', 'direccion', 'location', 'where', 'address'],
      benefits: ['beneficios', 'propiedades', 'salud', 'benefits', 'health']
    };
  }

  getTranslations() {
    return {
      es: {
        welcome: '¡Hola! 🌺 Soy el asistente de **Tuta Wayta**.\n¿En qué puedo ayudarte hoy? Puedes preguntarme sobre nuestros productos, envíos, ubicaciones u horarios.',
        statusOpen: '🟢 Actualmente estamos abiertos.',
        statusClosed: '🔴 Actualmente estamos cerrados.',
        greetings: ['¡Hola! Un gusto saludarte. ¿Cómo te puedo ayudar hoy?'],
        order: ['Puedes realizar un pedido escribiéndonos al WhatsApp **+51 987 654 321** o al correo **contacto@tutawayta.org**.'],
        hours: ['Atendemos de **lunes a sábado, de 8:00 a.m. a 6:00 p.m.**.'],
        products: ['Nuestros productos disponibles:\n- **Pitahaya Fresca** (1 kg): S/ 25.00\n- **Pitahaya Deshidratada** (100 g): S/ 18.00\n- **Pulpa Congelada** (400 g): S/ 20.00'],
        shipping: ['Realizamos envíos a **Lima** (entrega en 24h) y a **provincias** (48 a 72h).'],
        contact: ['Escríbenos a **contacto@tutawayta.org** o llámanos al **+51 987 654 321**.'],
        location: ['Nos encontramos en el **Valle de Cañete, Lima**.'],
        benefits: ['La pitahaya es rica en antioxidantes, vitamina C y fibra natural.'],
        fallback: ['No entendí bien tu consulta. Intenta seleccionar alguna de las opciones rápidas abajo o consulta sobre **productos**, **horarios** o **envíos**.']
      },
      en: {
        welcome: "Hello! 🌺 I'm the **Tuta Wayta** assistant.\nHow can I help you today?",
        statusOpen: '🟢 We are currently open.',
        statusClosed: '🔴 We are currently closed.',
        greetings: ['Hello! Nice to meet you. How can I assist you?'],
        order: ['Place your order by calling **+51 987 654 321** or emailing **contacto@tutawayta.org**.'],
        hours: ['Our business hours are **Monday to Saturday, 8:00 a.m. to 6:00 p.m.**.'],
        products: ['Our catalog:\n- **Fresh Dragon Fruit** (1 kg): S/ 25.00\n- **Dehydrated Fruit** (100 g): S/ 18.00\n- **Frozen Pulp** (400 g): S/ 20.00'],
        shipping: ['Shipping to **Lima** in 24 hours and to **provinces** in 48-72 hours.'],
        contact: ['Reach us at **contacto@tutawayta.org** or call **+51 987 654 321**.'],
        location: ['We are located in **Cañete Valley, Lima**.'],
        benefits: ['Dragon fruit is loaded with antioxidants, fiber, and vitamin C.'],
        fallback: ['I didn\'t quite catch that. Try asking about **products**, **hours**, or **shipping**.']
      }
    };
  }
}

// ─── 10. INICIALIZACIÓN AUTOMÁTICA EN EL LADO DEL CLIENTE ───
document.addEventListener('DOMContentLoaded', () => {
  window.tutawaytaBot = new TutaWaytaChatbot();
});