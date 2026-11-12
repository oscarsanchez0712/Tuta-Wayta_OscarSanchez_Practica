document.addEventListener('DOMContentLoaded', () => {
  const basePath = window.TUTA_BASE_PATH || (window.location.pathname.startsWith('/tutawayta') ? '/tutawayta' : '');
  const appUrl = (path) => `${basePath}${path}`;
  const appPathname = (path) => `${basePath}${path}`;
  const authView = document.getElementById('authView');
  const accountView = document.getElementById('accountView');
  const accountIntro = document.getElementById('accountIntro');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const loginEmail = document.getElementById('loginEmail');
  const loginPassword = document.getElementById('loginPassword');
  const rememberUser = document.getElementById('rememberUser');
  const message = document.getElementById('loginMessage');
  const adminProducts = document.getElementById('adminProducts');
  const productAdminForm = document.getElementById('productAdminForm');
  const productAdminList = document.getElementById('adminProductList');
  const productAdminMessage = document.getElementById('productAdminMessage');
  const addressForm = document.getElementById('addressForm');
  const adminPriceList = document.getElementById('adminPriceList');
  const adminPriceMessage = document.getElementById('adminPriceMessage');

  const demoUsers = [
    { name: 'Administrador Tuta Wayta', email: 'admin@tutawayta.com', password: 'admin123', role: 'administrador' },
    { name: 'Comprador Tuta Wayta', email: 'comprador@tutawayta.com', password: 'comprador123', role: 'comprador' }
  ];

  const roleLabels = {
    administrador: 'Administrador',
    trabajador: 'Trabajador',
    comprador: 'Comprador'
  };

  const rolePermissions = {
    administrador: ['Agregar productos', 'Editar nombres, precios, imágenes y descripciones', 'Eliminar productos del catálogo'],
    trabajador: ['Ver pedidos asignados', 'Actualizar estado de entrega', 'Atender consultas de clientes'],
    comprador: ['Comprar productos', 'Guardar datos de compra', 'Consultar detalles de su cuenta']
  };

  const baseCatalogProducts = [
    { name: 'Pitahaya American Beauty', price: 23.90 },
    { name: 'Pitahaya Amarilla Palora', price: 19.90 },
    { name: 'Pitahaya Híbrida Tesoro', price: 18.50 },
    { name: 'Pitahaya Blanca', price: 14.90 },
    { name: 'Pitahaya Roja', price: 21.90 },
    { name: 'Pitahaya Golden Dragon', price: 24.90 },
    { name: 'Pitahaya Purpúrea', price: 22.50 },
    { name: 'Pitahaya Vietnam', price: 17.90 },
    { name: 'Pitahaya Costa Rica', price: 25.90 }
  ];

  function getStoredUsers() {
    try {
      return JSON.parse(localStorage.getItem('tuta_users')) || [];
    } catch (error) {
      return [];
    }
  }

  function saveStoredUsers(users) {
    localStorage.setItem('tuta_users', JSON.stringify(users));
  }

  function getAllUsers() {
    return [...demoUsers, ...getStoredUsers()];
  }

  function getAdminProducts() {
    try {
      return JSON.parse(localStorage.getItem('tuta_admin_products')) || [];
    } catch (error) {
      return [];
    }
  }

  function saveAdminProducts(products) {
    localStorage.setItem('tuta_admin_products', JSON.stringify(products));
  }

  function getPriceOverrides() {
    try {
      return JSON.parse(localStorage.getItem('tuta_product_price_overrides')) || {};
    } catch (error) {
      return {};
    }
  }

  function savePriceOverrides(overrides) {
    localStorage.setItem('tuta_product_price_overrides', JSON.stringify(overrides));
  }

  function setMessage(text, type = 'success') {
    if (!message) return;
    message.textContent = text;
    message.classList.toggle('error', type === 'error');
  }

  function setError(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function clearErrors() {
    document.querySelectorAll('.login-error').forEach((item) => {
      item.textContent = '';
    });
    setMessage('');
  }

  function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function setSession(user) {
    const sessionUser = {
      name: user.name,
      email: user.email,
      role: user.role
    };

    localStorage.setItem('usuario_logueado', 'true');
    localStorage.setItem('tuta_session_user', JSON.stringify(sessionUser));
    localStorage.setItem('user_name', user.name);
    localStorage.setItem('user_email', user.email);
    localStorage.setItem('user_role', user.role);

    if (rememberUser && rememberUser.checked) {
      localStorage.setItem('login_email', user.email);
    }

    renderAccount(sessionUser);

    if (user.role === 'administrador') {
      window.location.href = appUrl('/admin/dashboard');
      return;
    }

    if (!accountView && window.location.pathname !== appPathname('/cuenta')) {
      setTimeout(() => {
        window.location.href = appUrl('/cuenta');
      }, 700);
    }
  }

  function getSession() {
    try {
      return JSON.parse(localStorage.getItem('tuta_session_user'));
    } catch (error) {
      return null;
    }
  }

  function renderAccount(user) {
    if (!user) {
      if (authView) authView.classList.remove('hidden');
      if (accountView) accountView.classList.add('hidden');
      if (accountIntro) accountIntro.textContent = 'Inicia sesión o regístrate para continuar.';
      return;
    }

    const name = document.getElementById('accountName');
    const email = document.getElementById('accountEmail');
    const role = document.getElementById('accountRole');
    const avatar = document.getElementById('accountAvatar');
    const permissions = document.getElementById('rolePermissions');

    if (name) name.textContent = user.name;
    if (email) email.textContent = user.email;
    if (role) role.textContent = roleLabels[user.role] || 'Comprador';
    if (avatar) avatar.textContent = user.name.trim().charAt(0).toUpperCase();
    if (permissions) {
      permissions.innerHTML = (rolePermissions[user.role] || rolePermissions.comprador)
        .map((item) => `<li>${item}</li>`)
        .join('');
    }

    const profileName = document.getElementById('profileName');
    const profileDocument = document.getElementById('profileDocument');
    const profilePhone = document.getElementById('profilePhone');
    const profileEmail = document.getElementById('profileEmail');

    if (profileName) profileName.textContent = user.name || 'Cliente Tuta Wayta';
    if (profileDocument) profileDocument.textContent = localStorage.getItem('user_document') || 'DNI no registrado';
    if (profilePhone) profilePhone.textContent = localStorage.getItem('user_phone') || localStorage.getItem('telefono') || 'No registrado';
    if (profileEmail) profileEmail.textContent = user.email || localStorage.getItem('user_email') || 'correo@dominio.com';
    renderSavedAddress();

    if (authView) authView.classList.add('hidden');
    if (accountView) accountView.classList.remove('hidden');
    if (accountIntro) accountIntro.textContent = 'Estos son los detalles de tu cuenta.';

    if (adminProducts) {
      adminProducts.classList.toggle('hidden', user.role !== 'administrador');
    }
    renderAdminProducts();

    const personalSection = document.getElementById('personalSection');
    const addressesSection = document.getElementById('addressesSection');
    const adminPriceSection = document.getElementById('adminPriceSection');
    const adminPriceMenuItem = document.getElementById('adminPriceMenuItem');

    if (adminPriceSection) {
      const isAdmin = user.role === 'administrador';
      if (adminPriceMenuItem) adminPriceMenuItem.classList.toggle('hidden', !isAdmin);
      adminPriceSection.classList.remove('active');
      if (personalSection) personalSection.classList.add('active');
      if (addressesSection) addressesSection.classList.remove('active');
      renderAdminPriceList();
    }
  }

  function showPanel(panelId) {
    document.querySelectorAll('.auth-tab').forEach((tab) => {
      tab.classList.toggle('active', tab.dataset.panel === panelId);
    });
    document.querySelectorAll('.auth-panel').forEach((panel) => {
      panel.classList.toggle('active', panel.id === panelId);
    });
    clearErrors();
  }

  document.querySelectorAll('.auth-tab').forEach((tab) => {
    tab.addEventListener('click', () => showPanel(tab.dataset.panel));
  });

  document.querySelectorAll('.password-toggle').forEach((button) => {
    button.addEventListener('click', () => {
      const input = document.getElementById(button.dataset.target);
      if (!input) return;
      const shouldShow = input.type === 'password';
      input.type = shouldShow ? 'text' : 'password';
      button.setAttribute('aria-label', shouldShow ? 'Ocultar contraseña' : 'Mostrar contraseña');
    });
  });

  const savedEmail = localStorage.getItem('login_email') || localStorage.getItem('user_email') || '';
  if (savedEmail && loginEmail) loginEmail.value = savedEmail;

  const forgotLink = document.getElementById('forgotLink');
  if (forgotLink) {
    forgotLink.addEventListener('click', (event) => {
      event.preventDefault();
      setMessage('Usa una cuenta de prueba o regístrate nuevamente.');
      if (loginEmail) loginEmail.focus();
    });
  }

  if (loginForm) loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearErrors();

    const email = loginEmail.value.trim().toLowerCase();
    const password = loginPassword.value.trim();
    let valid = true;

    if (!isEmail(email)) {
      setError('loginEmailError', 'Ingresa un correo válido.');
      valid = false;
    }

    if (password.length < 6) {
      setError('loginPasswordError', 'La contraseña debe tener mínimo 6 caracteres.');
      valid = false;
    }

    if (!valid) {
      setMessage('Revisa los datos para continuar.', 'error');
      return;
    }

    const submitButton = loginForm.querySelector('.login-submit');
    if (submitButton) submitButton.disabled = true;

    try {
      const response = await fetch(appUrl('/api/login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        setMessage('Error interno del servidor.', 'error');
        return;
      }

      if (!response.ok || !data.success) {
        setMessage(data.message || 'Correo o contraseña incorrectos.', 'error');
        return;
      }

      setMessage('Sesión iniciada correctamente.');
      setSession({
        name: data.user.nombre,
        email: data.user.email,
        role: data.user.rol
      });
    } catch (networkError) {
      setMessage('No se pudo conectar con el servidor. Intenta nuevamente.', 'error');
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  });

  if (registerForm) registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    clearErrors();

    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim().toLowerCase();
    const role = 'comprador';
    const password = document.getElementById('registerPassword').value.trim();
    let valid = true;

    if (name.length < 3) {
      setError('registerNameError', 'Ingresa tu nombre completo.');
      valid = false;
    }

    if (!isEmail(email)) {
      setError('registerEmailError', 'Ingresa un correo válido.');
      valid = false;
    }

    if (password.length < 6) {
      setError('registerPasswordError', 'La contraseña debe tener mínimo 6 caracteres.');
      valid = false;
    }

    if (!valid) {
      setMessage('Completa los datos para registrarte.', 'error');
      return;
    }

    if (getAllUsers().some((item) => item.email.toLowerCase() === email)) {
      setError('registerEmailError', 'Este correo ya tiene una cuenta.');
      setMessage('Usa otro correo o inicia sesión.', 'error');
      return;
    }

    const user = { name, email, password, role };
    const users = getStoredUsers();
    users.push(user);
    saveStoredUsers(users);

    setMessage('Cuenta creada correctamente.');
    setSession(user);
  });

  document.querySelectorAll('[data-demo]').forEach((button) => {
    button.addEventListener('click', () => {
      const user = demoUsers.find((item) => item.role === button.dataset.demo);
      if (!user) return;
      loginEmail.value = user.email;
      loginPassword.value = user.password;
      setMessage(`Cuenta de ${roleLabels[user.role]} cargada. Presiona Ingresar.`);
      showPanel('loginForm');
    });
  });

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('usuario_logueado');
    localStorage.removeItem('tuta_session_user');
    localStorage.removeItem('user_role');
    renderAccount(null);
    setMessage('Sesión cerrada correctamente.');
  });

  document.querySelectorAll('[data-profile-edit]').forEach((button) => {
    button.addEventListener('click', () => {
      const session = getSession();
      if (!session) return;

      if (button.dataset.profileEdit === 'name') {
        const nextName = prompt('Nombre y apellidos', session.name || '');
        if (!nextName || nextName.trim().length < 3) return;
        session.name = nextName.trim();
        localStorage.setItem('tuta_session_user', JSON.stringify(session));
        localStorage.setItem('user_name', session.name);
        renderAccount(session);
      }

      if (button.dataset.profileEdit === 'phone') {
        const currentPhone = localStorage.getItem('user_phone') || '';
        const nextPhone = prompt('Celular', currentPhone);
        if (!nextPhone) return;
        const cleanPhone = nextPhone.replace(/\D/g, '').slice(0, 9);
        if (cleanPhone.length !== 9) {
          alert('Ingresa un celular válido de 9 dígitos.');
          return;
        }
        localStorage.setItem('user_phone', cleanPhone);
        renderAccount(session);
      }

      if (button.dataset.profileEdit === 'document') {
        const currentDocument = localStorage.getItem('user_document') || '';
        const nextDocument = prompt('DNI', currentDocument);
        if (!nextDocument) return;
        const cleanDocument = nextDocument.replace(/\D/g, '').slice(0, 8);
        if (cleanDocument.length !== 8) {
          alert('Ingresa un DNI válido de 8 dígitos.');
          return;
        }
        localStorage.setItem('user_document', `DNI ${cleanDocument}`);
        renderAccount(session);
      }
    });
  });

  document.querySelectorAll('[data-account-section]').forEach((button) => {
    button.addEventListener('click', () => {
      const section = button.dataset.accountSection;
      document.querySelectorAll('[data-account-section]').forEach((item) => {
        item.classList.toggle('active', item === button);
      });
      document.querySelectorAll('.profile-section').forEach((panel) => {
        panel.classList.toggle('active', panel.id === `${section}Section`);
      });
    });
  });

  function getSavedAddress() {
    try {
      return JSON.parse(localStorage.getItem('user_address_data'));
    } catch (error) {
      return null;
    }
  }

  function renderSavedAddress() {
    const savedAddressText = document.getElementById('savedAddressText');
    if (!savedAddressText) return;
    const address = getSavedAddress();

    if (!address) {
      savedAddressText.textContent = 'Aún no registraste una dirección.';
      return;
    }

    savedAddressText.textContent = `${address.line}, ${address.district} · Tel: ${address.phone}`;

    const addressLine = document.getElementById('addressLine');
    const addressDistrict = document.getElementById('addressDistrict');
    const addressPhone = document.getElementById('addressPhone');

    if (addressLine) addressLine.value = address.line;
    if (addressDistrict) addressDistrict.value = address.district;
    if (addressPhone) addressPhone.value = address.phone;
  }

  if (addressForm) {
    addressForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const line = document.getElementById('addressLine').value.trim();
      const district = document.getElementById('addressDistrict').value.trim();
      const phone = document.getElementById('addressPhone').value.replace(/\D/g, '').slice(0, 9);
      const addressMessage = document.getElementById('addressMessage');

      if (!line || !district || phone.length !== 9) {
        if (addressMessage) {
          addressMessage.textContent = 'Completa dirección, distrito y teléfono válido.';
          addressMessage.classList.add('error');
        }
        return;
      }

      localStorage.setItem('user_address_data', JSON.stringify({ line, district, phone }));
      localStorage.setItem('user_address', `${line}, ${district}`);
      localStorage.setItem('user_phone', phone);

      if (addressMessage) {
        addressMessage.textContent = 'Dirección guardada correctamente.';
        addressMessage.classList.remove('error');
      }
      renderSavedAddress();
      renderAccount(getSession());
    });
  }

  function getEditableCatalogProducts() {
    const customProducts = getAdminProducts().map((product) => ({
      name: product.name,
      price: Number(product.price || 0)
    }));
    return [...baseCatalogProducts, ...customProducts];
  }

  function renderAdminPriceList() {
    if (!adminPriceList) return;
    const overrides = getPriceOverrides();
    const products = getEditableCatalogProducts();

    adminPriceList.innerHTML = products.map((product) => {
      const value = Number(overrides[product.name] ?? product.price).toFixed(2);
      return `
        <div class="admin-price-item">
          <strong>${product.name}</strong>
          <input type="number" min="0.10" step="0.10" value="${value}" data-price-name="${product.name}">
          <button type="button" data-save-price="${product.name}">Guardar</button>
        </div>
      `;
    }).join('');
  }

  if (adminPriceList) {
    adminPriceList.addEventListener('click', (event) => {
      const button = event.target.closest('[data-save-price]');
      if (!button) return;

      const name = button.dataset.savePrice;
      const input = Array.from(adminPriceList.querySelectorAll('[data-price-name]'))
        .find((item) => item.dataset.priceName === name);
      const price = Number(input ? input.value : 0);

      if (!price || price <= 0) {
        if (adminPriceMessage) {
          adminPriceMessage.textContent = 'Ingresa un precio válido.';
          adminPriceMessage.classList.add('error');
        }
        return;
      }

      const overrides = getPriceOverrides();
      overrides[name] = Number(price.toFixed(2));
      savePriceOverrides(overrides);

      if (adminPriceMessage) {
        adminPriceMessage.textContent = 'Precio actualizado correctamente.';
        adminPriceMessage.classList.remove('error');
      }
      renderAdminPriceList();
    });
  }

  function setProductMessage(text, type = 'success') {
    if (!productAdminMessage) return;
    productAdminMessage.textContent = text;
    productAdminMessage.classList.toggle('error', type === 'error');
  }

  function resetProductForm() {
    if (!productAdminForm) return;
    productAdminForm.reset();
    document.getElementById('adminProductId').value = '';
    setProductMessage('');
  }

  function renderAdminProducts() {
    if (!productAdminList) return;
    const products = getAdminProducts();

    if (!products.length) {
      productAdminList.innerHTML = '<p class="empty-admin-products">Aún no agregaste productos.</p>';
      return;
    }

    productAdminList.innerHTML = products.map((product) => `
      <article class="admin-product-item">
        <img src="${product.image}" alt="${product.name}">
        <div>
          <h4>${product.name}</h4>
          <p>S/ ${Number(product.price).toFixed(2)} · ${product.category}</p>
        </div>
        <div class="admin-product-actions">
          <button type="button" data-edit-product="${product.id}">Editar</button>
          <button type="button" data-delete-product="${product.id}">Eliminar</button>
        </div>
      </article>
    `).join('');
  }

  if (productAdminForm) {
    productAdminForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const id = document.getElementById('adminProductId').value || `admin-${Date.now()}`;
      const name = document.getElementById('adminProductName').value.trim();
      const description = document.getElementById('adminProductDescription').value.trim();
      const price = Number(document.getElementById('adminProductPrice').value);
      const category = document.getElementById('adminProductCategory').value;
      const image = document.getElementById('adminProductImage').value.trim();

      if (!name || !description || !image || !price || price <= 0) {
        setProductMessage('Completa nombre, descripción, imagen y precio.', 'error');
        return;
      }

      const products = getAdminProducts();
      const product = { id, name, description, price, category, image };
      const index = products.findIndex((item) => item.id === id);

      if (index >= 0) {
        products[index] = product;
        saveAdminProducts(products);
        renderAdminProducts();
        resetProductForm();
        setProductMessage('Producto actualizado correctamente.');
      } else {
        products.push(product);
        saveAdminProducts(products);
        renderAdminProducts();
        resetProductForm();
        setProductMessage('Producto agregado correctamente.');
      }
    });
  }

  const resetProductBtn = document.getElementById('resetProductForm');
  if (resetProductBtn) {
    resetProductBtn.addEventListener('click', resetProductForm);
  }

  if (productAdminList) {
    productAdminList.addEventListener('click', (event) => {
      const editButton = event.target.closest('[data-edit-product]');
      const deleteButton = event.target.closest('[data-delete-product]');
      const products = getAdminProducts();

      if (editButton) {
        const product = products.find((item) => item.id === editButton.dataset.editProduct);
        if (!product) return;
        document.getElementById('adminProductId').value = product.id;
        document.getElementById('adminProductName').value = product.name;
        document.getElementById('adminProductDescription').value = product.description;
        document.getElementById('adminProductPrice').value = product.price;
        document.getElementById('adminProductCategory').value = product.category;
        document.getElementById('adminProductImage').value = product.image;
        setProductMessage('Editando producto seleccionado.');
      }

      if (deleteButton) {
        const nextProducts = products.filter((item) => item.id !== deleteButton.dataset.deleteProduct);
        saveAdminProducts(nextProducts);
        renderAdminProducts();
        resetProductForm();
        setProductMessage('Producto eliminado.');
      }
    });
  }

  const currentSession = getSession();
  if (currentSession && currentSession.role === 'administrador' && window.location.pathname === appPathname('/cuenta')) {
    window.location.href = appUrl('/admin/dashboard');
    return;
  }

  renderAccount(currentSession);

  const requestedView = new URLSearchParams(window.location.search).get('view');
  if (!getSession() && requestedView === 'register') {
    showPanel('registerForm');
  }
});