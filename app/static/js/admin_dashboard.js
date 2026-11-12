(function () {
  'use strict';

  // 🔥 CORRECCIÓN DEFINITIVA: Se elimina la lógica de prefijos manuales.
  const basePath = window.TUTA_BASE_PATH || (window.location.pathname.startsWith('/tutawayta') ? '/tutawayta' : '');
  const appUrl = (path) => `${basePath}${path}`;

  const demoUsers = [
    { name: 'Administrador Tuta Wayta', email: 'admin@tutawayta.com', role: 'administrador' },
    { name: 'Comprador Tuta Wayta', email: 'comprador@tutawayta.com', role: 'comprador' }
  ];

  const baseCatalogProducts = [
    { name: 'Pitahaya American Beauty', price: 23.90 },
    { name: 'Pitahaya Amarilla Palora', price: 19.90 },
    { name: 'Pitahaya Híbrida Tesoro', price: 18.50 },
    { name: 'Pitahaya Blanca', price: 14.90 },
    { name: 'Pitahaya Roja', price: 21.90 },
    { name: 'Pitahaya Golden Dragon', price: 24.90 },
    { name: 'Pitahaya Purpúrea', price: 22.50 },
    { name: 'Pitahaya Vietnam', price: 17.90 },
    { name: 'Pitahaya Costa Rica', price: 25.90 },
    { name: 'Pitahaya Púrpura Intensa', price: 24.50 }

  ];

  let serverPriceOverrides = null;
  let cacheMensajesReales = null; 
  let cacheReclamaciones = null;
  let cacheAnalytics = null;

  function readJson(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key)) || fallback;
    } catch (error) {
      return fallback;
    }
  }

  function setText(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  }

  function getSession() {
    return readJson('tuta_session_user', null);
  }

  function getUsers() {
    return [...demoUsers, ...readJson('tuta_users', [])];
  }

  function getProducts() {
    return readJson('tuta_admin_products', []);
  }

  function getPriceOverrides() {
    return serverPriceOverrides || readJson('tuta_product_price_overrides', {});
  }

  function savePriceOverrides(overrides) {
    serverPriceOverrides = overrides;
    localStorage.setItem('tuta_product_price_overrides', JSON.stringify(overrides));
  }

  async function loadPriceOverrides() {
    try {
      const response = await fetch(appUrl('/api/admin/price-overrides'));
      if (!response.ok) throw new Error('No se pudieron cargar precios');
      const data = await response.json();
      serverPriceOverrides = data.overrides || {};
      localStorage.setItem('tuta_product_price_overrides', JSON.stringify(serverPriceOverrides));
    } catch (error) {
      serverPriceOverrides = readJson('tuta_product_price_overrides', {});
    }
  }

  async function savePriceOverride(productName, price) {
    const response = await fetch(appUrl('/api/admin/price-overrides'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productName, price })
    });
    if (!response.ok) throw new Error('No se pudo guardar el precio');
  }

  function getEditableCatalogProducts() {
    const customProducts = getProducts().map((product) => ({
      name: product.name,
      price: Number(product.price || 0)
    }));
    return [...baseCatalogProducts, ...customProducts];
  }

  function getVisitsByDay(visits) {
    const labels = [];
    const today = new Date();
    for (let index = 6; index >= 0; index -= 1) {
      const day = new Date(today);
      day.setDate(today.getDate() - index);
      const iso = day.toISOString().slice(0, 10);
      labels.push({
        iso,
        label: day.toLocaleDateString('es-PE', { weekday: 'short' }).replace('.', '')
      });
    }
    return labels.map((day) => {
      const count = visits.filter((visit) => visit.date === day.iso).length;
      return { label: day.label, value: count };
    });
  }

  function renderChart(visits) {
    const chart = document.getElementById('visitsChart');
    if (!chart) return;
    const days = getVisitsByDay(visits);
    const max = Math.max(...days.map((day) => day.value), 1);
    chart.innerHTML = days.map((day) => {
      const height = Math.max(14, Math.round((day.value / max) * 210));
      return `
        <div class="bar-item">
          <span>${day.value}</span>
          <div class="bar" style="height:${height}px"></div>
          <span>${day.label}</span>
        </div>
      `;
    }).join('');
  }

  function renderProducts(products) {
    const list = document.getElementById('adminProductSummary');
    if (!list) return;
    if (!products.length) {
      list.innerHTML = '<p class="empty-state">Todavia no hay productos agregados desde administrador.</p>';
      return;
    }
    list.innerHTML = products.map((product) => `
      <article class="summary-item">
        <img src="${product.image}" alt="${product.name}">
        <div>
          <strong>${product.name}</strong>
          <small>${product.category || 'Producto'} · S/ ${Number(product.price || 0).toFixed(2)}</small>
        </div>
        <div class="admin-product-actions">
          <button type="button" class="btn-admin-action edit" data-edit-id="${product.id}" title="Editar producto">
            <span class="material-symbols-outlined">edit</span>
          </button>
          <button type="button" class="btn-admin-action delete" data-delete-id="${product.id}" title="Eliminar producto">
            <span class="material-symbols-outlined">delete</span>
          </button>
        </div>
        <span>${product.id || ''}</span>
      </article>
    `).join('');
  }

  function renderPriceEditor() {
    const list = document.getElementById('adminPriceEditor');
    if (!list) return;
    const overrides = getPriceOverrides();
    const products = getEditableCatalogProducts();
    list.innerHTML = products.map((product) => {
      const currentPrice = Number(overrides[product.name] ?? product.price).toFixed(2);
      const originalPrice = Number(product.price || 0).toFixed(2);
      const changed = overrides[product.name] !== undefined;
      return `
        <article class="price-editor-item ${changed ? 'changed' : ''}">
          <div>
            <strong>${product.name}</strong>
            <small>Precio base: S/ ${originalPrice}</small>
          </div>
          <label>
            <span>S/</span>
            <input type="number" min="0.10" step="0.10" value="${currentPrice}" data-price-name="${product.name}">
          </label>
          <button type="button" data-save-price="${product.name}">
            <span class="material-symbols-outlined">save</span>
            Guardar
          </button>
        </article>
      `;
    }).join('');
  }

  function setPriceMessage(text, type) {
    const message = document.getElementById('priceEditorMessage');
    if (!message) return;
    message.textContent = text;
    message.classList.toggle('error', type === 'error');
  }

  function renderUsers(users) {
    const list = document.getElementById('userSummary');
    if (!list) return;
    
    list.innerHTML = users.map((user) => {
      const initial = (user.name || user.email || 'U').charAt(0).toUpperCase();
      const isDemo = user.email === 'admin@tutawayta.com' || user.email === 'comprador@tutawayta.com';
      
      return `
        <article class="summary-item" data-user-email="${user.email}" style="display: flex; justify-content: space-between; align-items: center; width: 100%; gap: 12px; background: #ffffff; padding: 12px 16px; border: 1px solid #e6ebf2; border-radius: 10px;">
          <div style="display: flex; align-items: center; gap: 12px; flex: 1;">
            <div class="summary-initial" style="width: 40px; height: 40px; border-radius: 50%; background: #f4f7fb; display: flex; align-items: center; justify-content: center; font-weight: 700; color: #172033;">${initial}</div>
            <div style="display: flex; flex-direction: column;">
              <strong style="color: #172033; font-size: 0.95rem;">${user.name || 'Usuario'}</strong>
              <small style="color: #667085; font-size: 0.82rem;">${user.email || 'Sin correo'}</small>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="background: #f4f7fb; padding: 4px 10px; border-radius: 6px; border: 1px solid #e6ebf2; font-size: 0.8rem; font-weight: 600; color: #667085; text-transform: capitalize;">${user.role || 'comprador'}</span>
            ${!isDemo ? `
              <button type="button" class="btn-delete-user" onclick="window.eliminarUsuario('${user.email}', this)"
                      style="min-height: 32px; display: inline-flex; align-items: center; gap: 4px; border: 1px solid #fed7d7; border-radius: 6px; padding: 0 10px; background: #fff5f5; color: #e53e3e; font-family: inherit; font-size: 0.78rem; font-weight: 800; cursor: pointer; transition: all 0.2s ease;">
                <span class="material-symbols-outlined" style="font-size: 1rem;">delete</span>
                Eliminar
              </button>
            ` : ''}
          </div>
        </article>
      `;
    }).join('');
  }

  window.eliminarUsuario = function(email, boton) {
    if (!confirm(`¿Estás seguro de que deseas eliminar al usuario con correo ${email}?`)) return;

    const tarjeta = boton.closest('.summary-item');
    
    try {
      let localUsers = JSON.parse(localStorage.getItem('tuta_users')) || [];
      localUsers = localUsers.filter(user => user.email !== email);
      localStorage.setItem('tuta_users', JSON.stringify(localUsers));

      if (tarjeta) {
        tarjeta.style.opacity = '0';
        tarjeta.style.transform = 'translateX(20px)';
        tarjeta.style.transition = 'all 0.3s ease-in-out';
        setTimeout(() => {
          renderDashboard(); 
        }, 300);
      }
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  // ==========================================================
  // RENDERIZADO Y GESTIÓN PARA LIBRO DE RECLAMACIONES
  // ==========================================================
  function renderLibroReclamaciones(registros) {
    const list = document.getElementById('reclamacionesSummaryList'); 
    if (!list) return;
  
    const eliminadosLocalmente = readJson('tuta_deleted_claims_ids', []);

    function incrustarTarjetas(registros) {
      const registrosFiltrados = registros.filter((reg) => {
        const idComparacion = String(reg.id || reg._id).trim();
        return !eliminadosLocalmente.includes(idComparacion);
      });

      if (!registrosFiltrados || registrosFiltrados.length === 0) {
        list.innerHTML = `<p style="color:#667085; text-align:center; padding:40px; font-weight:800; border:1px dashed #e6ebf2; border-radius:12px; font-family:'DM Sans', sans-serif; background:#ffffff;">No hay quejas ni reclamos registrados.</p>`;
        return;
      }

   
      list.innerHTML = registrosFiltrados.map((reg) => {
    const registroId = String(reg.id).trim();
    const tipoClase = reg.tipo === 'queja' ? 'queja' : 'reclamacion';
    const tipoTexto = reg.tipo === 'queja' ? 'Queja' : 'Reclamación';

    return `
      <div class="msg-card ${tipoClase}" data-id="${registroId}" style="background:#ffffff; border:1px solid #e4e7ec; border-radius:16px; padding:24px; box-shadow:0 4px 18px rgba(16, 24, 40, 0.03); display:flex; flex-direction:column; gap:20px; margin-bottom:24px; font-family:'Inter', 'DM Sans', sans-serif; overflow:hidden;">

        <div style="display:flex; justify-content:between; align-items:center; flex-wrap:wrap; gap:16px; border-bottom:1px dashed #eaecf0; padding-bottom:20px; width:100%;">

          <div style="display:flex; flex-direction:column; gap:4px; flex:1; min-width:200px;">
            <strong style="font-size:1.25rem; font-weight:700; color:#101828; letter-spacing:-0.01em; text-transform:capitalize;">${reg.nombres} ${reg.apellidos}</strong>
            <span style="font-size:0.825rem; color:#667085; font-weight:400;" data-i18n-key="admin_claim_registered_on" data-i18n-date="${reg.creado_at || 'Reciente'}">Registrado el: ${reg.creado_at || 'Reciente'}</span>
          </div>

          <div style="display:inline-flex; align-items:center; gap:12px; flex-wrap:nowrap; max-width:100%;">
            <span style="font-weight:600; font-size:0.75rem; letter-spacing:0.3px; text-transform:uppercase; padding:6px 14px; border-radius:8px; background:${tipoClase === 'queja' ? '#fef3f2' : '#eff8ff'}; color:${tipoClase === 'queja' ? '#b42318' : '#175cd3'}; border:1px solid ${tipoClase === 'queja' ? '#fee4e2' : '#b2ddff'}; white-space:nowrap; display:inline-block; overflow:hidden; text-overflow:ellipsis;">
              ${tipoTexto} (${reg.numero_hoja || 'S/N'})
            </span>
            
            <button type="button" class="btn-delete-msg" onclick="window.eliminarReclamacion('${registroId}', this)" data-i18n-title="admin_delete_tooltip"
                    style="height:36px; min-width:36px; padding:0 8px; display:inline-flex; align-items:center; justify-content:center; border:1px solid #fda29b; border-radius:8px; background:#fef3f2; color:#b42318; cursor:pointer; transition:all 0.2s cubic-bezier(0.4, 0, 0.2, 1); gap:6px; white-space:nowrap;"
                    onmouseover="this.style.background='#d92d20'; this.style.color='#ffffff'; this.style.borderColor='#d92d20';"
                    onmouseout="this.style.background='#fef3f2'; this.style.color='#b42318'; this.style.borderColor='#fda29b';">
              <span class="material-symbols-outlined" style="font-size:1.2rem;">delete</span>
            </button>
          </div>

        </div>

        <div style="display:flex; flex-direction:column; gap:20px;">

          <div class="data-section">
            <h4 style="font-size:0.75rem; font-weight:600; color:#667085; text-transform:uppercase; letter-spacing:0.5px; margin:0 0 12px 0; display:flex; align-items:center; gap:6px;" data-i18n="admin_consumer_data">
              <span class="material-symbols-outlined" style="font-size:1.1rem;">person</span> Datos del Consumidor
            </h4>
            <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
              <span style="background:#f8f9fa; color:#344054; padding:6px 14px; border-radius:8px; font-size:0.85rem; font-weight:500; display:inline-flex; align-items:center; gap:6px; border:1px solid #e4e7ec;">
                <span class="material-symbols-outlined" style="font-size:1.1rem; color:#667085;">badge</span> <strong>${reg.doc_tipo || 'DNI'}:</strong> ${reg.doc_num || '---'}
              </span>
              <span style="background:#f8f9fa; color:#344054; padding:6px 14px; border-radius:8px; font-size:0.85rem; font-weight:500; display:inline-flex; align-items:center; gap:6px; border:1px solid #e4e7ec;">
                <span class="material-symbols-outlined" style="font-size:1.1rem; color:#667085;">call</span> <strong data-i18n="admin_phone_label">Teléfono:</strong> ${reg.telefono || '---'}
              </span>
              <span style="background:#f8f9fa; color:#344054; padding:6px 14px; border-radius:8px; font-size:0.85rem; font-weight:500; display:inline-flex; align-items:center; gap:6px; border:1px solid #e4e7ec;">
                <span class="material-symbols-outlined" style="font-size:1.1rem; color:#667085;">mail</span> <strong data-i18n="admin_email_label">Correo:</strong> ${reg.correo}
              </span>
              <span style="background:#f8f9fa; color:#344054; padding:6px 14px; border-radius:8px; font-size:0.85rem; font-weight:500; display:inline-flex; align-items:center; gap:6px; border:1px solid #e4e7ec;">
                <span class="material-symbols-outlined" style="font-size:1.1rem; color:#667085;">home</span> <strong data-i18n="admin_address_label">Dirección:</strong> <span style="text-transform:capitalize;">${reg.direccion || '---'}</span>
              </span>
            </div>
          </div>

          <div class="data-section" style="background:#f9fafb; padding:18px 20px; border-radius:12px; border:1px solid #eaecf0;">
            <h4 style="font-size:0.75rem; font-weight:600; color:#667085; text-transform:uppercase; letter-spacing:0.5px; margin:0 0 14px 0; display:flex; align-items:center; gap:6px;" data-i18n="admin_incident_details">
              <span class="material-symbols-outlined" style="font-size:1.1rem;">receipt_long</span> Detalles del Incidente
            </h4>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:14px; font-size:0.9rem; color:#475467;">
              <div style="display:flex; align-items:center; gap:8px;"><span class="material-symbols-outlined" style="color:#98a2b3; font-size:1.1rem;">shopping_cart</span><strong style="color:#101828; font-weight:500;" data-i18n="admin_product_service_label">Producto/Servicio:</strong> ${reg.bien || 'No especificado'}</div>
              <div style="display:flex; align-items:center; gap:8px;"><span class="material-symbols-outlined" style="color:#98a2b3; font-size:1.1rem;">monetization_on</span><strong style="color:#101828; font-weight:500;" data-i18n="admin_amount_label">Monto:</strong> S/ ${Number(reg.monto || 0).toFixed(2)}</div>
              ${reg.fecha_compra ? `<div style="display:flex; align-items:center; gap:8px;"><span class="material-symbols-outlined" style="color:#98a2b3; font-size:1.1rem;">calendar_month</span><strong style="color:#101828; font-weight:500;" data-i18n="admin_purchase_date_label">Fecha Compra:</strong> ${reg.fecha_compra}</div>` : ''}
              ${reg.tipo === 'queja' ? `
                <div style="display:flex; align-items:center; gap:8px;"><span class="material-symbols-outlined" style="color:#98a2b3; font-size:1.1rem;">event</span><strong style="color:#101828; font-weight:500;" data-i18n="admin_incident_date_label">Fecha Incidente:</strong> ${reg.fecha_incidente || 'No especificado'}</div>
                ${reg.hora_incidente ? `<div style="display:flex; align-items:center; gap:8px;"><span class="material-symbols-outlined" style="color:#98a2b3; font-size:1.1rem;">schedule</span><strong style="color:#101828; font-weight:500;" data-i18n="admin_approx_time_label">Hora Aprox:</strong> ${reg.hora_incidente}</div>` : ''}
                <div style="display:flex; align-items:center; gap:8px;"><span class="material-symbols-outlined" style="color:#98a2b3; font-size:1.1rem;">support_agent</span><strong style="color:#101828; font-weight:500;" data-i18n="admin_attention_label">Atención:</strong> <span style="text-transform:capitalize;">${reg.tipo_atencion || 'No especificado'}</span></div>
                <div style="display:flex; align-items:center; gap:8px;"><span class="material-symbols-outlined" style="color:#98a2b3; font-size:1.1rem;">person_alert</span><strong style="color:#101828; font-weight:500;" data-i18n="admin_staff_label">Personal:</strong> ${reg.personal_involucrado || 'No especificado'}</div>
                <div style="display:flex; align-items:center; gap:8px; grid-column: 1 / -1;"><span class="material-symbols-outlined" style="color:#98a2b3; font-size:1.1rem;">star</span><strong style="color:#101828; font-weight:500;" data-i18n="admin_rating_label">Calificación:</strong> <span style="color:#fdb022; letter-spacing:2px; font-size:1.05rem;">${reg.calificacion ? '★'.repeat(reg.calificacion) + '☆'.repeat(5 - (reg.calificacion || 0)) : 'Sin calificar'}</span></div>
              ` : ''}
            </div>
          </div>

          <div class="data-section" style="display:flex; flex-direction:column; gap:14px; margin-top:4px;">
            <h4 style="font-size:0.75rem; font-weight:600; color:#667085; text-transform:uppercase; letter-spacing:0.5px; margin:0; display:flex; align-items:center; gap:6px;" data-i18n="admin_user_message_label">
              <span class="material-symbols-outlined" style="font-size:1.1rem;">chat_bubble</span> Mensaje del Usuario
            </h4>
            
            <div style="background:#ffffff; border:1px solid #eaecf0; border-radius:12px; padding:18px 24px; font-size:0.95rem; color:#344054; line-height:1.6; white-space:pre-line;">
              <strong style="color:#c11574; font-size:0.75rem; text-transform:uppercase; display:block; margin-bottom:6px; font-weight:600; letter-spacing:0.3px;" data-i18n="admin_claim_detail_label">Detalle del Reclamo / Queja</strong>
              ${reg.detalle || 'El usuario no proporcionó un detalle.'}
            </div>
            
            ${reg.pedido ? `
            <div style="background:#ffffff; border:1px solid #eaecf0; border-radius:12px; padding:18px 24px; font-size:0.95rem; color:#344054; line-height:1.6; white-space:pre-line;">
              <strong style="color:#5925dc; font-size:0.75rem; text-transform:uppercase; display:block; margin-bottom:6px; font-weight:600; letter-spacing:0.3px;" data-i18n="admin_consumer_request_label">Pedido del Consumidor (Solución solicitada)</strong>
              ${reg.pedido}
            </div>` : ''}
          </div>

        </div>
      </div>
    `;
}).join('');
    } // Cierre de incrustarTarjetas
    incrustarTarjetas(registros || []);
  }

  window.eliminarReclamacion = async function(id, boton) {
    if (!confirm(`¿Estás seguro de que deseas eliminar el registro N° ${id} de forma permanente?`)) return;
    
    boton.disabled = true;
    boton.innerText = "Borrando...";
    const tarjeta = boton.closest('.msg-card');

    try {
      await fetch(appUrl(`/api/admin/libro-reclamaciones/eliminar/${id}`), { method: 'DELETE' });
      removerElementoVisual(tarjeta);
    } catch (error) {
      console.error("Error al eliminar reclamación:", error);
      alert("No se pudo eliminar el registro. Revisa la conexión.");
      boton.disabled = false;
      boton.innerText = "Eliminar";
    }
  };

  // ==========================================================
  // RENDERIZADO Y PERSISTENCIA CORREGIDA PARA ELIMINACIÓN
  // ==========================================================

  // ==========================================================
  // 🔥 SECCIÓN RESTAURADA: RENDERIZADO DE MENSAJES DE CONTACTO
  // ==========================================================
  async function renderContactMessages() {
    const list = document.getElementById('contactSummaryList');
    if (!list) return;

    const eliminadosLocalmente = readJson('tuta_deleted_msg_ids', []);

    function incrustarTarjetas(mensajes) {
      // 🔥 CORRECCIÓN: Normalizar los datos antes de usarlos para máxima compatibilidad.
      const mensajesNormalizados = mensajes.map((msg, index) => {
        // 1. Unificar el campo de fecha para consistencia visual.
        const fecha = msg.creado_at || msg.fecha || msg.fecha_registro || new Date().toISOString();
        // 2. 🔥 CORRECCIÓN CRÍTICA: Generar un ID único y predecible para la UI, combinando el ID de la base de datos y el índice.
        // Esto soluciona el problema de la reaparición de elementos eliminados con IDs duplicados.
        const id = `msg_${msg.id}_${index}`;
        return { ...msg, creado_at: fecha, id: id };
      });

      const mensajesFiltrados = mensajesNormalizados.filter((msg, index) => {
        const idComparacion = String(msg.id).trim();
        return !eliminadosLocalmente.includes(idComparacion);
      });

      if (!mensajesFiltrados || mensajesFiltrados.length === 0) {
        // 🔥 CORRECCIÓN: Se añade un ícono para un estado vacío más profesional.
        list.innerHTML = `<div style="color:#667085; text-align:center; padding:60px 20px; font-weight:600; border:1px dashed #d0d5dd; border-radius:12px; font-family:'Inter', sans-serif; background:#f9fafb; display:flex; flex-direction:column; align-items:center; gap:12px;"><span class="material-symbols-outlined" style="font-size: 2.5rem; color: #98a2b3;">inbox</span>No se encontraron mensajes registrados en el sistema.</div>`;
        return;
      }

      list.innerHTML = mensajesFiltrados.map((msg, index) => {
        const mensajeId = String(msg.id).trim(); // Usar el ID único generado
        const fechaRegistro = msg.creado_at || msg.fecha || msg.date || 'Reciente';
        const estadoClase = msg.estado === 'leido' || msg.estado === 'respondido' ? 'leido' : '';
        
        return `
          <div class="msg-card ${estadoClase}" data-id="${mensajeId}" style="background:#ffffff; border:1px solid #e4e7ec; border-radius:16px; padding:24px; box-shadow:0 4px 18px rgba(16, 24, 40, 0.03); display:flex; flex-direction:column; gap:20px; margin-bottom:24px; font-family:'Inter', 'DM Sans', sans-serif; overflow:hidden;">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; border-bottom:1px dashed #eaecf0; padding-bottom:20px; width:100%;">
              <div style="display:flex; flex-direction:column; gap:4px; flex:1; min-width:200px;">
                <strong style="font-size:1.25rem; font-weight:700; color:#101828; letter-spacing:-0.01em; text-transform:capitalize;">${msg.nombre || 'Usuario'}</strong>
                <span style="font-size:0.825rem; color:#667085; font-weight:400;">Enviado el: ${fechaRegistro}</span>
              </div>
              <div style="display:inline-flex; align-items:center; gap:12px; flex-wrap:nowrap; max-width:100%;">
                <button type="button" class="btn-delete-msg" onclick="window.eliminarMensaje('${mensajeId}', this)"
                        style="height:36px; min-width:36px; padding:0 8px; display:inline-flex; align-items:center; justify-content:center; border:1px solid #fda29b; border-radius:8px; background:#fef3f2; color:#b42318; cursor:pointer; transition:all 0.2s cubic-bezier(0.4, 0, 0.2, 1); gap:6px; white-space:nowrap;"
                        onmouseover="this.style.background='#d92d20'; this.style.color='#ffffff'; this.style.borderColor='#d92d20';"
                        onmouseout="this.style.background='#fef3f2'; this.style.color='#b42318'; this.style.borderColor='#fda29b';">
                  <span class="material-symbols-outlined" style="font-size:1.2rem;">delete</span>
                </button>
              </div>
            </div>
            <div style="display:flex; flex-direction:column; gap:20px;">
              <div class="data-section">
                <h4 style="font-size:0.75rem; font-weight:600; color:#667085; text-transform:uppercase; letter-spacing:0.5px; margin:0 0 12px 0; display:flex; align-items:center; gap:6px;">
                  <span class="material-symbols-outlined" style="font-size:1.1rem;">person</span> Datos del Contacto
                </h4>
                <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                  <span style="background:#f8f9fa; color:#344054; padding:6px 14px; border-radius:8px; font-size:0.85rem; font-weight:500; display:inline-flex; align-items:center; gap:6px; border:1px solid #e4e7ec;">
                    <span class="material-symbols-outlined" style="font-size:1.1rem; color:#667085;">mail</span> <strong>Correo:</strong> ${msg.correo || '---'}
                  </span>
                  <span style="background:#f8f9fa; color:#344054; padding:6px 14px; border-radius:8px; font-size:0.85rem; font-weight:500; display:inline-flex; align-items:center; gap:6px; border:1px solid #e4e7ec;">
                    <span class="material-symbols-outlined" style="font-size:1.1rem; color:#667085;">call</span> <strong>Teléfono:</strong> ${msg.telefono || '---'}
                  </span>
                </div>
              </div>
              <div class="data-section" style="display:flex; flex-direction:column; gap:14px; margin-top:4px;">
                <h4 style="font-size:0.75rem; font-weight:600; color:#667085; text-transform:uppercase; letter-spacing:0.5px; margin:0; display:flex; align-items:center; gap:6px;">
                  <span class="material-symbols-outlined" style="font-size:1.1rem;">chat_bubble</span> Mensaje del Usuario
                </h4>
                <div style="background:#ffffff; border:1px solid #eaecf0; border-radius:12px; padding:18px 24px; font-size:0.95rem; color:#344054; line-height:1.6; white-space:pre-line;">
                  <strong style="color:#c11574; font-size:0.75rem; text-transform:uppercase; display:block; margin-bottom:6px; font-weight:600; letter-spacing:0.3px;">Asunto: ${msg.asunto || 'Consulta General'}</strong>
                  ${msg.mensaje || 'El usuario no proporcionó un detalle.'}
                </div>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }

    if (cacheMensajesReales !== null) {
      incrustarTarjetas(cacheMensajesReales);
      return;
    }

    try {
      const response = await fetch(appUrl('/api/admin/contacto-mensajes'));
      const data = await response.json();

      let datosReales = data.mensajes || [];

      if (data.ok && datosReales.length > 0) {
        cacheMensajesReales = datosReales;
        incrustarTarjetas(cacheMensajesReales);
      } else {
        incrustarTarjetas([]);
      }
    } catch (error) {
      console.warn("Error al cargar mensajes, mostrando fallback:", error);
      incrustarTarjetas([]);
    }
  }

  window.eliminarMensaje = async function(id, boton) {
    if(!confirm("¿Estás seguro de que deseas eliminar este mensaje de forma permanente?")) return;
    
    boton.disabled = true;
    boton.innerText = "Borrando...";
    const tarjeta = boton.closest('.msg-card');
    const idString = String(id).trim();

    // 🔥 CORRECCIÓN: El ID de la UI es único, pero el ID del backend puede estar duplicado
    // entre la DB y el JSON. Necesitamos el ID original para el backend.
    // La nueva lógica extrae correctamente el ID original, incluso si contiene guiones bajos.
    // Ejemplo: de "msg_db_2_ts_1783586861_2" extrae "db_2_ts_1783586861".
    const parts = idString.split('_');
    const backendId = parts.slice(1, -1).join('_');
    try {
      const eliminados = readJson('tuta_deleted_msg_ids', []);
      // Guardamos tanto el ID de la UI como el ID del backend para máxima cobertura.
      if (!eliminados.includes(idString)) eliminados.push(idString);
      if (!eliminados.includes(backendId)) eliminados.push(backendId);
      
        localStorage.setItem('tuta_deleted_msg_ids', JSON.stringify(eliminados));
    } catch(e) { console.error(e); }

    if (cacheMensajesReales) {
      // Filtramos la caché usando el ID original del backend para consistencia.
      cacheMensajesReales = cacheMensajesReales.filter(msg => String(msg.id).trim() !== String(backendId).trim());
    }

    // Extraemos el ID original para enviarlo a la API del backend.
    try {
      await fetch(appUrl(`/api/admin/contacto-mensajes/eliminar/${backendId}`), { method: 'DELETE' });
      removerElementoVisual(tarjeta);
    } catch(error) {
      console.warn("Removido localmente. El servidor procesará el archivo en el siguiente ciclo.", error);
      removerElementoVisual(tarjeta);
    }
  };

  function removerElementoVisual(tarjeta) {
    if (!tarjeta) return;
    tarjeta.style.opacity = '0';
    tarjeta.style.transform = 'scale(0.95) translateY(10px)';
    tarjeta.style.transition = 'all 0.3s ease-in-out';
    setTimeout(() => {
      tarjeta.remove();
      const list = document.getElementById('contactSummaryList');
      if (list && list.children.length === 0) {
        // Re-renderizar para mostrar el estado vacío correctamente
        renderContactMessages();
      }
    }, 300);
  }

  async function getAnalyticsSummary() {
    if (cacheAnalytics) {
      return cacheAnalytics;
    }

    try {
      const response = await fetch(appUrl('/api/analytics/summary'));
      if (!response.ok) throw new Error('No se pudo cargar analytics');
      return await response.json();
    } catch (error) {
      const visits = readJson('tw_site_visits', []);
      const uniqueVisitors = new Set(visits.map((visit) => visit.visitorId).filter(Boolean)).size;
      const summary = { ok: true, totalVisits: visits.length, uniqueVisitors, visits };
      cacheAnalytics = summary;
      return summary;
    }
  }

  async function renderDashboard() {
    const session = getSession();
    if (!session || session.role !== 'administrador') {
      window.location.href = appUrl('/login');
      return;
    }
  
    // 🔥 OPTIMIZACIÓN: Cargar todos los datos críticos en paralelo para una renderización más rápida.
    const [analytics, reclamacionesData, mensajesData] = await Promise.all([
      getAnalyticsSummary(),
      fetch(appUrl('/api/admin/libro-reclamaciones')).then(res => res.json()).catch(() => ({ ok: false, registros: [] })),
      fetch(appUrl('/api/admin/contacto-mensajes')).then(res => res.json()).catch(() => ({ ok: false, mensajes: [] })),
      loadPriceOverrides() // Se ejecuta en paralelo pero no necesitamos esperar su resultado aquí
    ]);
  
    // Guardar los datos en caché para re-renderizados instantáneos al cambiar de vista.
    cacheReclamaciones = reclamacionesData?.registros || [];
    cacheMensajesReales = mensajesData?.mensajes || [];
  
    const visits = analytics?.visits || [];
    const users = getUsers();
    const products = getProducts();
    const productVisits = Number(analytics.productVisits || 0);
    const claims = Number(analytics.claimsTotal || 0);
    const interactions = Number(analytics.totalVisits || visits.length) + productVisits + claims + products.length;
    
    addMissingAdminViewLinks();
  
    // Renderizar métricas principales de forma inmediata.
    setText('adminName', session.name || 'Administrador');
    setText('adminEmail', session.email || 'admin@tutawayta.com');
    setText('adminAvatar', (session.name || 'A').charAt(0).toUpperCase());
    setText('metricVisits', analytics.totalVisits || visits.length);
    setText('metricUsers', analytics.uniqueVisitors || 0);
    setText('metricCart', productVisits);
    // 🔥 CORRECCIÓN: Usar el conteo real de la caché para mayor precisión.
    setText('metricClaims', cacheReclamaciones.length || claims);
    // Contar también los mensajes de contacto en las interacciones.
    setText('metricMessages', cacheMensajesReales.length || 0);
    setText('metricInteractions', interactions);
    setText('todayText', new Date().toLocaleDateString(document.documentElement.lang || 'es-PE', {
      weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'
    }));

    renderChart(visits);
    renderPopularViews(visits);
    renderPriceEditor();
    renderProducts(products);
    renderUsers(users);
    renderImageGallery();
    
    // Renderizar las secciones con datos de la caché para una carga instantánea.
    renderLibroReclamaciones(cacheReclamaciones);
    renderContactMessages();
  }
  function renderPopularViews(visits) {
    const links = document.querySelectorAll('.view-grid a');
    const counts = visits.reduce((acc, visit) => {
      acc[visit.path] = (acc[visit.path] || 0) + 1;
      return acc;
    }, {});
    links.forEach((link) => {
      const url = new URL(link.href);
      const count = counts[url.pathname] || 0;
      link.dataset.views = `${count} vistas`;
    });
  }
  
  function addMissingAdminViewLinks() {
    const viewGrid = document.querySelector('.view-grid');
    if (!viewGrid) return;

    // Verificamos si el enlace al libro de reclamaciones ya existe
    if (!viewGrid.querySelector('a[href*="/libro"]')) {
      const libroLinkHTML = `
        <a href="${appUrl('/libro')}" class="view-item" data-views="0 vistas" target="_blank" title="Libro de Reclamaciones">
          <span class="material-symbols-outlined">menu_book</span>
          <strong>Libro de Reclamaciones</strong>
        </a>
      `;
      viewGrid.insertAdjacentHTML('beforeend', libroLinkHTML);
    }
  }

  function showAdminSection(sectionName) {
    const i18nData = window.i18nData ? (window.i18nData[document.documentElement.lang || 'es'] || {}) : {};
    const viewLabels = {
      resumen: { title: i18nData.admin_view_stats_title || 'Estadisticas', description: i18nData.admin_view_stats_desc || 'Visualiza el resumen principal.' },
      vistas: { title: i18nData.admin_view_pages_title || 'Vistas de pagina', description: i18nData.admin_view_pages_desc || 'Revisa los accesos.' },
      productos: { title: i18nData.admin_view_products_title || 'Productos', description: i18nData.admin_view_products_desc || 'Administra precios y productos.' },
      contactos: { title: i18nData.admin_view_messages_title || 'Mensajes de Formulario', description: i18nData.admin_view_messages_desc || 'Consulta los mensajes del formulario.' },
      usuarios: { title: i18nData.admin_view_users_title || 'Usuarios', description: i18nData.admin_view_users_desc || 'Consulta las cuentas guardadas.' },
      libro: { title: i18nData.admin_view_claims_title || 'Libro de Reclamaciones', description: i18nData.admin_view_claims_desc || 'Gestiona quejas y reclamos.' },
      actividad: { title: i18nData.admin_view_activity_title || 'Actividad', description: i18nData.admin_view_activity_desc || 'Observa interacciones recientes.' }
    };

    const nextSection = viewLabels[sectionName] ? sectionName : 'resumen';
    const labels = viewLabels[nextSection];

    document.querySelectorAll('[data-admin-section]').forEach((section) => {
      section.classList.toggle('active', section.dataset.adminSection === nextSection);
    });
    document.querySelectorAll('[data-admin-view]').forEach((link) => {
      link.classList.toggle('active', link.dataset.adminView === nextSection);
    });

    setText('adminViewTitle', labels.title);
    setText('adminViewDescription', labels.description);
    history.replaceState(null, '', `#${nextSection}`);
    
    // Si entramos a la sección de contactos, volvemos a renderizar los mensajes actualizados
    if (nextSection === 'contactos') {
      renderContactMessages();
    }
    // Hacemos lo mismo para el libro de reclamaciones
    if (nextSection === 'libro') {
      // 🔥 CORREGIDO: Re-renderiza con los datos en caché para ser instantáneo
      renderLibroReclamaciones(cacheReclamaciones);
    }
  }

  document.querySelectorAll('[data-admin-view]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      showAdminSection(link.dataset.adminView);
    });
  });

  const refresh = document.getElementById('refreshDashboard');
  if (refresh) refresh.addEventListener('click', () => {
    cacheMensajesReales = null;
    cacheReclamaciones = null;
    cacheAnalytics = null;

    // const container = document.getElementById('reclamacionesSummaryList'); // Esto es un error, redeclara container
    const container = document.getElementById('contactSummaryList');
    if(container) container.innerHTML = "<p style='color:#667085; text-align:center; padding:30px; font-weight:800; font-family:\"DM Sans\", sans-serif;'>Actualizando buzón...</p>";
    renderDashboard();
  });

  const logout = document.getElementById('adminLogout');
  if (logout) {
    logout.addEventListener('click', () => {
      localStorage.removeItem('usuario_logueado');
      localStorage.removeItem('tuta_session_user');
      localStorage.removeItem('user_role');
      window.location.href = appUrl('/');
    });
  }

  const priceEditor = document.getElementById('adminPriceEditor');
  if (priceEditor) {
    priceEditor.addEventListener('click', async (event) => {
      const button = event.target.closest('[data-save-price]');
      if (!button) return;
      const name = button.dataset.savePrice;
      const input = Array.from(priceEditor.querySelectorAll('[data-price-name]')).find((item) => item.dataset.priceName === name);
      const price = Number(input ? input.value : 0);

      if (!price || price <= 0) {
        setPriceMessage('Ingresa un precio valido.', 'error');
        return;
      }
      try {
        await savePriceOverride(name, Number(price.toFixed(2)));
        const overrides = getPriceOverrides();
        overrides[name] = Number(price.toFixed(2));
        savePriceOverrides(overrides);
        renderPriceEditor();
        setPriceMessage(`Precio actualizado para ${name}.`);
      } catch (error) {
        setPriceMessage('No se pudo guardar en la base de datos.', 'error');
      }
    });
  }

  // --- 🔥 CORREGIDO: LÓGICA PARA GALERÍA DE IMÁGENES ---
  async function renderImageGallery() {
    const galleryContainer = document.getElementById('imageGalleryContainer');
    if (!galleryContainer) return;
  
    try {
      // Se obtienen todas las imágenes de los productos existentes.
      const allProducts = [...Object.values(productosTraducidos.es), ...getProducts()];
      const imageUrls = allProducts.map(p => p.image).filter(Boolean);
      
      // Se obtienen las imágenes guardadas por el administrador que no estén ya en la lista.
      const adminImages = readJson('tuta_admin_images', []);
      adminImages.forEach(img => {
        if (!imageUrls.includes(img)) {
          imageUrls.push(img);
        }
      });

      // Se eliminan duplicados.
      const uniqueImageUrls = [...new Set(imageUrls)];
  
      if (uniqueImageUrls.length > 0) {
        galleryContainer.innerHTML = uniqueImageUrls.map(imgSrc => `
          <div class="gallery-image-item" data-src="${imgSrc}">
            <img src="${imgSrc}" alt="Imagen de la galería" loading="lazy">
          </div>
        `).join('');
      } else {
        galleryContainer.innerHTML = '<p class="empty-state">No hay imágenes. Agrega productos con URL para que aparezcan aquí.</p>';
      }
    } catch (error) {
      console.error("Error al renderizar la galería:", error);
      galleryContainer.innerHTML = '<p class="empty-state error">Error al cargar la galería.</p>';
    }
  }

  document.body.addEventListener('click', function(event) {
    const galleryItem = event.target.closest('.gallery-image-item');
    if (galleryItem) {
      // Quitar selección previa
      document.querySelectorAll('.gallery-image-item.selected').forEach(item => item.classList.remove('selected'));
      // Seleccionar nuevo
      galleryItem.classList.add('selected');
      // Actualizar campos
      document.getElementById('productImage').value = galleryItem.dataset.src;
      document.getElementById('productImageUrl').value = ''; // Limpiar URL si se selecciona de galería
    }

    const tabBtn = event.target.closest('.tab-btn');
    if (tabBtn) {
      const tabName = tabBtn.dataset.tab;
      // Cambiar botón activo
      document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      tabBtn.classList.add('active');
      // Cambiar panel activo
      document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
      document.getElementById(`tab-${tabName}`).classList.add('active');
      
      // Limpiar selección al cambiar de pestaña
      document.getElementById('productImage').value = '';
      document.getElementById('productImageUrl').value = '';
      document.querySelectorAll('.gallery-image-item.selected').forEach(item => item.classList.remove('selected'));
      document.getElementById('productImageFile').value = ''; // Limpiar input de archivo
    }
  });


  function getProducts() {
    return readJson('tuta_admin_products', []);
  }

  // --- 🔥 NUEVO: LÓGICA PARA AGREGAR PRODUCTOS ---
  const formAgregarProducto = document.getElementById('formAgregarProducto');
  if (formAgregarProducto) {
    formAgregarProducto.addEventListener('submit', async function(event) {
      event.preventDefault();

      const nombre = document.getElementById('productName').value.trim();
      const id = document.getElementById('productId').value.trim();
      const descripcion = document.getElementById('productDescription').value.trim();
      const categoria = formAgregarProducto.querySelector('input[name="productCategory"]:checked')?.value;
      
      // --- 🔥 NUEVO: LÓGICA DE SUBIDA DE ARCHIVO ---
      const fileInput = document.getElementById('productImageFile');
      let uploadedImageUrl = '';

      if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
          const response = await fetch(appUrl('/api/admin/upload-image'), {
            method: 'POST',
            body: formData
          });
          const result = await response.json();
          if (result.ok) {
            uploadedImageUrl = result.url;
          } else {
            alert(`Error al subir la imagen: ${result.msg}`);
            return;
          }
        } catch (error) {
          alert('Error de red al intentar subir la imagen.');
          return;
        }
      }

      const imagenUrl = document.getElementById('productImageUrl').value.trim();
      const imagenGaleria = document.getElementById('productImage').value.trim();
      const imagen = uploadedImageUrl || imagenUrl || imagenGaleria;

      // --- 🔥 NUEVO: Guardar nueva imagen de URL en la "base de datos" de imágenes ---
      if (imagenUrl) {
        try {
          let adminImages = readJson('tuta_admin_images', []);
          if (!adminImages.includes(imagenUrl)) {
            adminImages.unshift(imagenUrl); // Añadir al principio
            localStorage.setItem('tuta_admin_images', JSON.stringify(adminImages));
          }
        } catch (e) { console.error("No se pudo guardar la nueva imagen en la galería local.", e); }
      }

      // El precio solo es relevante si la categoría es 'Fruta'
      const precioInput = document.getElementById('productPrice');
      const precioString = (precioInput.value || '').replace(',', '.');
      const precio = categoria === 'Fruta' ? parseFloat(precioString) : 0;

      // La validación de precio solo aplica si es una fruta
      const esPrecioInvalido = categoria === 'Fruta' && (isNaN(precio) || precio <= 0);
      if (!nombre || !imagen || !categoria || (categoria === 'Fruta' && esPrecioInvalido)) {
        alert('Por favor, ingresa un nombre y un precio válido para el producto.');
        return;
      }

      // --- 🔥 SIMPLIFICACIÓN: Se elimina la lógica de traducciones para asegurar estabilidad ---
      const translations = {
        es: { nombre: nombre, descripcion: descripcion }
        // El resto de idiomas se puede añadir manualmente si se necesita en el futuro
      };

      const productosActuales = getProducts();
      const producto = {
        name: nombre,
        price: precio,
        description: descripcion,
        category: categoria || 'General',
        image: imagen || 'https://via.placeholder.com/300x200.png?text=Sin+Imagen',
        translations: translations // Guardamos el objeto de traducciones
      };

      if (id) {
        // --- MODO EDICIÓN ---
        const index = productosActuales.findIndex(p => p.id === id);
        if (index > -1) {
          // Al editar, actualizamos el producto existente con la nueva estructura
          productosActuales[index] = { ...productosActuales[index], ...producto, id: id };
          localStorage.setItem('tuta_admin_products', JSON.stringify(productosActuales));
          alert(`¡Producto "${nombre}" actualizado con éxito!`);
        }
      } else {
        // --- MODO AGREGAR ---
        producto.id = `prod_${Date.now()}`; // ID único basado en la fecha
        productosActuales.unshift(producto); // Añadir al inicio de la lista
        localStorage.setItem('tuta_admin_products', JSON.stringify(productosActuales));
        alert(`¡Producto "${nombre}" agregado con éxito!`);
      }

      resetProductForm();
      renderDashboard();
    });
  }

  // --- 🔥 NUEVO: LÓGICA PARA EDITAR Y ELIMINAR ---
  const productListContainer = document.getElementById('adminProductSummary');
  if (productListContainer) {
    productListContainer.addEventListener('click', function(event) {
      const editBtn = event.target.closest('[data-edit-id]');
      const deleteBtn = event.target.closest('[data-delete-id]');

      if (editBtn) {
        const productId = editBtn.dataset.editId;
        const productos = getProducts();
        const productoAEditar = productos.find(p => p.id === productId);
        if (productoAEditar) {
          document.getElementById('productId').value = productoAEditar.id;
          document.getElementById('productName').value = productoAEditar.name;
          document.getElementById('productPrice').value = productoAEditar.price;
          document.getElementById('productDescription').value = productoAEditar.description || '';
          
          // Seleccionar el radio button correcto
          const categoryRadio = formAgregarProducto.querySelector(`input[name="productCategory"][value="${productoAEditar.category}"]`);
          if (categoryRadio) {
            categoryRadio.checked = true;
          }
          togglePriceFieldVisibility(); // Asegurarse de que el campo de precio se muestre/oculte correctamente
          document.getElementById('productImage').value = productoAEditar.image || '';
          document.getElementById('productImageUrl').value = productoAEditar.image || '';
          
          document.getElementById('formSubmitText').textContent = 'Guardar Cambios';
          document.getElementById('cancelEditBtn').classList.remove('hidden');
          formAgregarProducto.scrollIntoView({ behavior: 'smooth' });
        }
      }

      if (deleteBtn) {
        const productId = deleteBtn.dataset.deleteId;
        const productos = getProducts();
        const productoAEliminar = productos.find(p => p.id === productId);
        if (productoAEliminar && confirm(`¿Estás seguro de que deseas eliminar el producto "${productoAEliminar.name}"?`)) {
          const nuevosProductos = productos.filter(p => p.id !== productId);
          localStorage.setItem('tuta_admin_products', JSON.stringify(nuevosProductos));
          alert('Producto eliminado.');
          renderDashboard();
        }
      }
    });
  }

  // --- 🔥 NUEVO: LÓGICA PARA BOTÓN DE CANCELAR EDICIÓN ---
  const cancelEditBtn = document.getElementById('cancelEditBtn');
  if (cancelEditBtn) {
    cancelEditBtn.addEventListener('click', resetProductForm);
  }

  function resetProductForm() {
    formAgregarProducto.reset();
    document.getElementById('productId').value = '';
    document.getElementById('formProductTitle').textContent = 'Agregar Nuevo Producto';
    document.getElementById('formSubmitText').textContent = 'Agregar Producto';

    cancelEditBtn.classList.add('hidden');
    togglePriceFieldVisibility(); // Re-evaluar visibilidad del precio al resetear
  }

  // --- 🔥 NUEVO: LÓGICA PARA MOSTRAR/OCULTAR PRECIO SEGÚN CATEGORÍA ---
  function togglePriceFieldVisibility() {
    const priceGroup = document.getElementById('price-form-group');
    const priceInput = document.getElementById('productPrice');
    const selectedCategory = formAgregarProducto.querySelector('input[name="productCategory"]:checked');

    if (!priceGroup || !priceInput || !selectedCategory) return;

    if (selectedCategory.value === 'Fruta') {
      priceGroup.style.display = '';
      priceInput.required = true;
    } else {
      priceGroup.style.display = 'none';
      priceInput.required = false;
      priceInput.value = ''; // Limpiar el valor si se oculta
    }
  }

  formAgregarProducto.addEventListener('change', (e) => {
    if (e.target.name === 'productCategory') {
      togglePriceFieldVisibility();
    }
  });

  // 🔥 NUEVO: Escuchador global de cambio de idioma
  document.addEventListener('languageChanged', (e) => {
    const lang = e.detail.language;
    if (window.applyTranslations) {
      window.applyTranslations(lang).then(() => {
        // Una vez que las traducciones base se aplican, actualizamos la vista activa
        const currentHash = (window.location.hash || '#resumen').replace('#', '');
        showAdminSection(currentHash);

        // Forzar re-renderizado de componentes con texto dinámico
        if (cacheMensajesReales) renderContactMessages();
        if (cacheReclamaciones) renderLibroReclamaciones();
      });
    }
  });

  renderDashboard();
  showAdminSection((window.location.hash || '#resumen').replace('#', ''));
  togglePriceFieldVisibility(); // Llamada inicial para establecer el estado correcto del formulario

  // 🔥 NUEVO: Aplicar traducciones al cargar la página por primera vez
  const initialLang = document.documentElement.lang || 'es';
  if (window.applyTranslations) {
    window.applyTranslations(initialLang);
  }

})();
