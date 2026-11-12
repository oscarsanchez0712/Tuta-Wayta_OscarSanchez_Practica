document.addEventListener('DOMContentLoaded', function() {

    // --- LÓGICA DEL MODAL ---
    const modal = document.getElementById('newsModal');
    if (modal) {
        const modalHero = document.getElementById('modalHero');
        const modalCategoria = document.getElementById('modal-categoria');
        const modalTitulo = document.getElementById('modal-titulo');
        const modalPuntosClave = document.getElementById('modal-puntos-clave');
        const modalBeneficios = document.getElementById('modal-beneficios');

        window.openNewsModal = function(newsId) {
            // Verificar si existe la base de datos de artículos
            if (!window.ARTICULOS_DB || !window.ARTICULOS_DB[newsId]) {
                console.error('Noticia no encontrada o DB no cargada:', newsId);
                return;
            }

            const noticia = window.ARTICULOS_DB[newsId];

            // Llenar contenido básico del modal
            if (modalHero) modalHero.style.backgroundImage = `url('${noticia.imagen}')`;
            if (modalCategoria) {
                modalCategoria.textContent = noticia.categoria || '';
                modalCategoria.className = 'category-tag ' + (noticia.categoria ? noticia.categoria.toLowerCase() : '');
            }
            if (modalTitulo) modalTitulo.textContent = noticia.titulo || '';

            // Llenar puntos clave
            if (modalPuntosClave) {
                modalPuntosClave.innerHTML = '';
                if (Array.isArray(noticia.puntos_clave)) {
                    let htmlPuntos = '';
                    noticia.puntos_clave.forEach(punto => {
                        htmlPuntos += `
                            <div class="timeline-item">
                                <div class="timeline-num">${punto.num}</div>
                                <div class="timeline-info">
                                    <h4>${punto.titulo}</h4>
                                    <p>${punto.desc}</p>
                                </div>
                            </div>`;
                    });
                    modalPuntosClave.innerHTML = htmlPuntos;
                }
            }

            // Llenar beneficios
            if (modalBeneficios) {
                modalBeneficios.innerHTML = '';
                if (Array.isArray(noticia.beneficios)) {
                    let htmlBeneficios = '';
                    noticia.beneficios.forEach(beneficio => {
                        htmlBeneficios += `<li>${beneficio}</li>`;
                    });
                    modalBeneficios.innerHTML = htmlBeneficios;
                }
            }

            // Mostrar modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        window.closeNewsModal = function() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        };

        // Cerrar al hacer clic en el fondo oscuro
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeNewsModal();
            }
        });
    }

    // --- LÓGICA DE FILTROS Y BÚSQUEDA ---
    const filterButtons = document.querySelectorAll('.blog-filter-buttons .filter-btn');
    const searchInput = document.querySelector('.blog-search-bar-wrapper input');
    const articles = Array.from(document.querySelectorAll('.blog-articles-grid .blog-card'));

    function filterAndSearch() {
        const activeBtn = document.querySelector('.blog-filter-buttons .filter-btn.active');
        const activeFilter = activeBtn ? activeBtn.dataset.filter : 'all';
        const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';

        articles.forEach(article => {
            const category = article.dataset.category;
            const title = (article.querySelector('h3')?.textContent || '').toLowerCase();
            const description = (article.querySelector('p')?.textContent || '').toLowerCase();

            const matchesFilter = (activeFilter === 'all') || (category === activeFilter);
            const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);

            if (matchesFilter && matchesSearch) {
                article.style.display = '';
            } else {
                article.style.display = 'none';
            }
        });
    }

    // Eventos para botones de filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterAndSearch();
        });
    });

    // Evento para input de búsqueda
    if (searchInput) {
        searchInput.addEventListener('input', filterAndSearch);
    }
});