document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.querySelector('.blog-search-bar-wrapper input');
    const grid = document.querySelector('.blog-articles-grid');
    
    // CORRECCIÓN 1: Seleccionamos los enlaces envolventes, que son los hijos reales del grid
    const blogLinks = Array.from(grid.querySelectorAll('.blog-card-link'));

    function filterArticles() {
        // CORRECCIÓN 2: Control de seguridad si no encuentra un botón activo temporalmente
        const activeBtn = document.querySelector('.filter-btn.active');
        const activeFilter = activeBtn ? activeBtn.dataset.filter : 'all';
        const searchText = searchInput ? searchInput.value.toLowerCase().trim() : '';

        const matchingCards = [];
        const otherCards = [];

        // CORRECCIÓN 3: Lógica especial para el filtro "Todas"
        if (activeFilter === 'all' && searchText === '') {
            const allCards = [...blogLinks]; // Copia para no modificar el original
            const mixedSelection = [];
            const categories = {}; // Para asegurar una tarjeta por categoría
            const MAX_CARDS = 6;

            // 1. Barajar aleatoriamente para que la selección sea diferente cada vez
            allCards.sort(() => 0.5 - Math.random());

            // 2. Intentar obtener una tarjeta de cada categoría
            for (const link of allCards) {
                if (mixedSelection.length >= MAX_CARDS) break;
                const card = link.querySelector('.blog-card');
                if (card) {
                    const category = card.dataset.category || 'unknown';
                    if (!categories[category]) {
                        mixedSelection.push(link);
                        categories[category] = true;
                    }
                }
            }

            // 3. Si no se completaron las 6, rellenar con las restantes
            for (const link of allCards) {
                if (mixedSelection.length >= MAX_CARDS) break;
                if (!mixedSelection.includes(link)) {
                    mixedSelection.push(link);
                }
            }

            // 4. Asignar las tarjetas seleccionadas y las restantes
            blogLinks.forEach(link => {
                (mixedSelection.includes(link) ? matchingCards : otherCards).push(link);
            });

        } else {
            // Lógica original para filtros específicos o búsquedas
        blogLinks.forEach(link => {
            // Buscamos la tarjeta interna para extraer sus datos de categoría
            const card = link.querySelector('.blog-card');
            if (!card) return;

            const cardCategory = card.dataset.category || '';
            const cardTitle = card.querySelector('h3') ? card.querySelector('h3').textContent.toLowerCase() : ''; // Aseguramos que la categoría de la tarjeta esté en minúsculas para una comparación consistente
            const cardDesc = card.querySelector('p') ? card.querySelector('p').textContent.toLowerCase() : '';

            const matchesFilter = (activeFilter === 'all' || cardCategory === activeFilter);
            const matchesSearch = cardTitle.includes(searchText) || cardDesc.includes(searchText);

            if (matchesFilter && matchesSearch) {
                matchingCards.push(link); // Solo agregamos al array de coincidentes
            } else {
                otherCards.push(link); // Agregamos al array de no coincidentes
            }
        });
        }

        // Animación de salida para las tarjetas que se van a ocultar
        otherCards.forEach(link => { link.style.opacity = '0'; link.style.transform = 'scale(0.95)'; });

        // Reordenar el DOM usando los contenedores correctos (los links)
        matchingCards.forEach(link => grid.appendChild(link));
        otherCards.forEach(link => grid.appendChild(link));

        // Aplicar animación de entrada
        matchingCards.forEach((link) => {
            link.style.display = 'block'; // Aseguramos que sea visible antes de la animación
            setTimeout(() => {
                link.style.opacity = '1';
                link.style.transform = 'scale(1)';
            }, 10);
        });

        // Ocultar por completo tras la animación
        setTimeout(() => {
            otherCards.forEach(link => link.style.display = 'none');
        }, 300);
    }

    // Eventos de los Botones
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterArticles();
        });
    });

    // Evento del Buscador
    if (searchInput) {
        searchInput.addEventListener('input', filterArticles);
    }

    // Ejecutar el filtro al cargar la página para mostrar la selección inicial de 6 tarjetas
    filterArticles();
});



