document.addEventListener('DOMContentLoaded', () => {

    // Base path del servidor: vacio en local, "/tutawayta" en produccion.
    const noticiasBasePath = window.TUTA_BASE_PATH || (window.location.pathname.startsWith('/tutawayta') ? '/tutawayta' : '');
    const noticiasAssetUrl = (path) => (path && path.startsWith('/') && !path.startsWith('//')) ? noticiasBasePath + path : path;

    // --- 1. BASE DE DATOS LOCAL DE ARTÍCULOS ---
    window.ARTICULOS_DB = {
        "news1": {
            "categoria": "LOGRO",
            "fecha": "15 DE JULIO, 2026",
            "titulo": "Tuta Wayta obtiene la prestigiosa certificación Global G.A.P.",
            "imagen": "https://readdy.ai/api/search-image?query=International%20organic%20food%20trade%20fair%20BioFach%20exhibition%20hall%20with%20Peru%20country%20pavilion%20colorful%20pitahaya%20dragon%20fruit%20display%20business%20people%20networking%20modern%20convention%20center%20professional%20editorial%20photography%20clean%20style%20high%20detail%20wide%20angle&width=1200&height=700&seq=noticia-biofach-2026&orientation=landscape",
            "puntos_clave": [
                { "num": "01", "titulo": "Estándar Internacional", "desc": "Reconocimiento mundial de Buenas Prácticas Agrícolas (BPA) que garantiza la calidad y seguridad de nuestros productos." },
                { "num": "02", "titulo": "Acceso a Nuevos Mercados", "desc": "Esta certificación nos abre las puertas a los mercados más exigentes de Europa y Norteamérica." },
                { "num": "03", "titulo": "Compromiso Sostenible", "desc": "Valida nuestro compromiso con la sostenibilidad ambiental, el bienestar de los trabajadores y la inocuidad alimentaria." }
            ],
            "beneficios": ["Reconocimiento internacional", "Seguridad alimentaria garantizada", "Sostenibilidad certificada", "Acceso a mercados de exportación"]
        },
        "news2": {
            "categoria": "COMUNIDAD",
            "fecha": "5 DE JULIO, 2026",
            "titulo": "Exitosa Feria de Salud y Bienestar para las familias de Tuta Wayta",
            "imagen": "https://i.ibb.co/LzDSLJ71/IMG-8387.avif",
            "puntos_clave": [
                { "num": "01", "titulo": "Atención Integral", "desc": "Se ofrecieron atenciones médicas gratuitas en medicina general, pediatría y odontología para más de 100 miembros." },
                { "num": "02", "titulo": "Educación Nutricional", "desc": "Se realizaron charlas interactivas sobre nutrición, enfocadas en el aprovechamiento de productos locales como la pitahaya." },
                { "num": "03", "titulo": "Fortalecimiento Comunitario", "desc": "El evento reforzó los lazos de nuestra comunidad, promoviendo el cuidado mutuo y el bienestar colectivo." }
            ],
            "beneficios": ["Acceso a salud gratuita", "Fomento de hábitos saludables", "Integración familiar y comunitaria", "Alianza con sector salud"]
        },
        "news3": {
            "categoria": "INNOVACIÓN",
            "fecha": "28 DE JUNIO, 2026",
            "titulo": "Lanzamos nueva línea de empaques 100% biodegradables",
            "imagen": "https://i.ibb.co/bM06Yjck/IMG-20260705-133439-jpg.jpg",
            "puntos_clave": [
                { "num": "01", "titulo": "Materiales Ecológicos", "desc": "Fabricados a base de almidón de maíz y otros materiales de origen vegetal, son compostables y no dejan residuos tóxicos." },
                { "num": "02", "titulo": "Reducción de Plástico", "desc": "Esta iniciativa nos permite reducir significativamente nuestra huella de plástico y el impacto ambiental." },
                { "num": "03", "titulo": "Economía Circular", "desc": "Parte de nuestra estrategia para que cada elemento de nuestra cadena de valor sea respetuoso con el ecosistema." }
            ],
            "beneficios": ["Cero impacto plástico", "Compromiso ambiental visible", "Producto 100% sostenible", "Innovación en packaging"]
        },
        "news11": {
            "categoria": "INNOVACIÓN",
            "fecha": "18 DE JUNIO, 2026",
            "titulo": "Tuta Wayta implementa sistema de riego inteligente con IA",
            "imagen": "https://i.ibb.co/0pDQkx0z/IMG-8393.avif",
            "puntos_clave": [
                { "num": "01", "titulo": "Optimización Hídrica", "desc": "El sistema utiliza sensores y datos climáticos para optimizar el uso del agua hasta en un 40%." },
                { "num": "02", "titulo": "Tecnología de Vanguardia", "desc": "Implementamos Inteligencia Artificial para determinar la cantidad exacta de agua que cada planta necesita en tiempo real." },
                { "num": "03", "titulo": "Mejora de la Calidad", "desc": "Al evitar el estrés hídrico, mejoramos la salud de las plantas, lo que resulta en fruta de mayor calidad y calibre." }
            ],
            "beneficios": ["Reducción hídrica del 40%", "Agricultura de precisión", "Fruta de mayor calidad", "Sostenibilidad y eficiencia"]
        },
        "news12": {
            "categoria": "INNOVACIÓN",
            "fecha": "10 DE JUNIO, 2026",
            "titulo": "Desarrollo de nuevo biopesticida a base de plantas nativas",
            "imagen": "https://i.ibb.co/qFhsNQ8s/IMG-8380.avif",
            "puntos_clave": [
                { "num": "01", "titulo": "100% Orgánico", "desc": "En colaboración con institutos de investigación, creamos una solución libre de químicos sintéticos." },
                { "num": "02", "titulo": "Saber Ancestral y Ciencia", "desc": "El proyecto combina el conocimiento ancestral de plantas de la región con la ciencia moderna para una agricultura regenerativa." },
                { "num": "03", "titulo": "Protección del Ecosistema", "desc": "El objetivo es una solución efectiva, biodegradable y segura que enriquezca la biodiversidad del suelo." }
            ],
            "beneficios": ["Agricultura libre de químicos", "Innovación con identidad local", "Protección de la biodiversidad", "Producto 100% orgánico"]
        },
        "news4": {
            "categoria": "ALIANZA",
            "fecha": "12 DE JUNIO, 2026",
            "titulo": "Alianza con Instituto Valle Grande para el Desarrollo Digital",
            "imagen": "/static/img/valle%20grande.png",
            "puntos_clave": [
                { "num": "01", "titulo": "Transformación Digital", "desc": "Gracias a los talentosos estudiantes y docentes, lanzamos nuestra nueva página web para conectar con el mundo." },
                { "num": "02", "titulo": "Colaboración Educativa", "desc": "Los estudiantes aplicaron sus conocimientos en un proyecto real, beneficiando tanto su formación como a nuestra asociación." },
                { "num": "03", "titulo": "Nueva Ventana al Mundo", "desc": "La web es una plataforma para contar nuestra historia, compartir valores y mostrar la calidad de nuestra pitahaya." }
            ],
            "beneficios": ["Desarrollo de talento local", "Modernización de la asociación", "Mayor alcance comercial", "Vínculo con la academia"]
        },
        "news7": {
            "categoria": "ALIANZA",
            "fecha": "20 DE ABRIL, 2026",
            "titulo": "Tuta Wayta y SENASA: Alianza por la Calidad Orgánica",
            "imagen": "/static/img/SENASA%20LOGO.jpeg",
            "puntos_clave": [
                { "num": "01", "titulo": "Reconocimiento Sanitario", "desc": "Obtuvimos el reconocimiento para nuestra producción orgánica, asegurando el cumplimiento de las normativas más estrictas." },
                { "num": "02", "titulo": "Garantía de Trazabilidad", "desc": "SENASA nos ha guiado en la implementación de protocolos que aseguran la trazabilidad de cada fruta desde el campo." },
                { "num": "03", "titulo": "Buenas Prácticas Agrícolas", "desc": "La colaboración nos ha permitido perfeccionar nuestro manejo integrado de plagas y protocolos de post-cosecha." }
            ],
            "beneficios": ["Cumplimiento normativo", "Garantía de inocuidad", "Calidad de exportación", "Respaldo institucional"]
        },
        "news8": {
            "categoria": "ALIANZA",
            "fecha": "15 DE ABRIL, 2026",
            "titulo": "Agromercado impulsa el crecimiento de Tuta Wayta",
            "imagen": "/static/img/AGROMERCADO.jpeg",
            "puntos_clave": [
                { "num": "01", "titulo": "Formalización y Capacitación", "desc": "El apoyo de Agromercado ha sido clave en nuestra formalización y en la capacitación en gestión empresarial y marketing." },
                { "num": "02", "titulo": "Acceso a Mercados", "desc": "Gracias a esta alianza, hemos participado en importantes ferias y ruedas de negocio, conectando con nuevos compradores." },
                { "num": "03", "titulo": "Fortalecimiento Asociativo", "desc": "Este respaldo ha fortalecido nuestro modelo de negocio, asegurando precios justos y abriendo puertas a mercados competitivos." }
            ],
            "beneficios": ["Crecimiento profesional", "Nuevas oportunidades comerciales", "Modelo asociativo fortalecido", "Precios justos para socios"]
        },
        "news5": {
            "categoria": "COMUNIDAD",
            "fecha": "25 DE MAYO, 2026",
            "titulo": "Recibimos la visita de 50 escolares como parte del programa \"Siembra Futuro\"",
            "imagen": "https://i.ibb.co/5hwHgBCr/IMG-8365.avif",
            "puntos_clave": [
                { "num": "01", "titulo": "Educación Ambiental", "desc": "Estudiantes de la escuela local aprendieron sobre el ciclo de la pitahaya y la importancia de la agricultura orgánica." },
                { "num": "02", "titulo": "Experiencia Práctica", "desc": "Los niños y niñas participaron en una cosecha simbólica, conectando directamente con la tierra y el origen de los alimentos." },
                { "num": "03", "titulo": "Sembrando Conciencia", "desc": "El programa busca sembrar en las nuevas generaciones el amor por la tierra y la alimentación saludable." }
            ],
            "beneficios": ["Vínculo con la comunidad", "Educación para el futuro", "Promoción de la agricultura orgánica", "Experiencia vivencial para niños"]
        },
        "news6": {
            "categoria": "LOGRO",
            "fecha": "10 DE MAYO, 2026",
            "titulo": "Tuta Wayta gana el Premio Nacional a la Innovación Agraria 2026",
            "imagen": "/static/img/IMG_20260705_134543.jpg.jpeg",
            "puntos_clave": [
                { "num": "01", "titulo": "Reconocimiento Nacional", "desc": "Galardonados por el Ministerio de Desarrollo Agrario y Riego por nuestro modelo de asociatividad y desarrollo de valor agregado." },
                { "num": "02", "titulo": "Modelo Exitoso", "desc": "Se destacó nuestro modelo que ha permitido a más de 30 pequeños productores competir en mercados formales." },
                { "num": "03", "titulo": "Innovación con Valor", "desc": "El desarrollo de productos derivados como mermeladas y néctares fue un punto clave para el reconocimiento." }
            ],
            "beneficios": ["Validación del modelo de negocio", "Visibilidad a nivel nacional", "Impulso a la innovación", "Reconocimiento al esfuerzo colectivo"]
        },
        "news9": {
            "categoria": "LOGRO",
            "fecha": "30 DE MARZO, 2026",
            "titulo": "Tuta Wayta reconocida como 'Asociación del Año' en Agro-Produce 2026",
            "imagen": "https://i.ibb.co/W40X6zqJ/IMG-8442.avif",
            "puntos_clave": [
                { "num": "01", "titulo": "Máximo Galardón Regional", "desc": "Premiados en la feria regional más importante del sector por nuestro compromiso integral con la calidad y la comunidad." },
                { "num": "02", "titulo": "Modelo Inclusivo", "desc": "El comité organizador destacó nuestro modelo de negocio inclusivo y el impacto positivo en la economía local de Cañete." },
                { "num": "03", "titulo": "Calidad Certificada", "desc": "Nuestras buenas prácticas agrícolas certificadas fueron un factor determinante para obtener el premio." }
            ],
            "beneficios": ["Reconocimiento del sector", "Visibilidad regional", "Validación del impacto comunitario", "Orgullo para los socios"]
        },
        "news10": {
            "categoria": "COMUNIDAD",
            "fecha": "5 DE MARZO, 2026",
            "titulo": "Taller de compostaje y agricultura regenerativa para socios",
            "imagen": "https://i.ibb.co/d4Mr5vB7/IMG-8402.avif",
            "puntos_clave": [
                { "num": "01", "titulo": "Capacitación Práctica", "desc": "Más de 25 socios participaron en una jornada intensiva para mejorar la salud del suelo y optimizar recursos orgánicos." },
                { "num": "02", "titulo": "Agricultura Regenerativa", "desc": "Aprendieron a crear su propio compost de alta calidad y a aplicar técnicas para mejorar la biodiversidad del suelo." },
                { "num": "03", "titulo": "Cierre de Ciclos", "desc": "Estas prácticas nos permiten cerrar el ciclo de nutrientes de manera 100% sostenible, reduciendo costos y mejorando la calidad." }
            ],
            "beneficios": ["Mejora de la salud del suelo", "Reducción de costos", "Sostenibilidad en la práctica", "Fortalecimiento de capacidades"]
        }
    };

    // --- 2. CONTROLADOR DEL MODAL ---
    const modal = document.getElementById('newsModal');
    if (modal) {
        const modalHero = document.getElementById('modalHero');
        const modalCategoria = document.getElementById('modal-categoria');
        const modalTitulo = document.getElementById('modal-titulo');
        const modalPuntosClave = document.getElementById('modal-puntos-clave');
        const modalBeneficios = document.getElementById('modal-beneficios');

        window.openNewsModal = function(newsId) {
            if (!window.ARTICULOS_DB || !window.ARTICULOS_DB[newsId]) {
                console.error('Noticia no disponible en DB:', newsId);
                return;
            }

            const noticia = window.ARTICULOS_DB[newsId];

            if (modalHero) modalHero.style.backgroundImage = `url('${noticiasAssetUrl(noticia.imagen)}')`;
            if (modalCategoria) {
                modalCategoria.textContent = noticia.categoria || '';
                modalCategoria.className = 'category-tag ' + (noticia.categoria ? noticia.categoria.toLowerCase() : '');
            }
            if (modalTitulo) modalTitulo.textContent = noticia.titulo || '';

            // Renderizar la lista de puntos clave
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

            // Renderizar la lista de beneficios
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

            // Desplegar modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        window.closeNewsModal = function() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        };

        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeNewsModal();
            }
        });
    }

    // --- 3. FILTRADO, BÚSQUEDA Y MEZCLA ALEATORIA ---
    const filterButtons = document.querySelectorAll('.blog-filter-buttons .filter-btn');
    const searchInput = document.querySelector('.blog-search-bar-wrapper input');
    const grid = document.querySelector('.blog-articles-grid');

    if (!grid) return;

    // Seleccionamos directamente las tarjetas .blog-card pertenecientes al DOM
    const cards = Array.from(grid.querySelectorAll('.blog-card'));

    function filterArticles() {
        const activeBtn = document.querySelector('.blog-filter-buttons .filter-btn.active');
        const activeFilter = activeBtn ? activeBtn.dataset.filter : 'all';
        const searchText = searchInput ? searchInput.value.toLowerCase().trim() : '';

        const matchingCards = [];
        const otherCards = [];

        // CASO A: Estado inicial ("Todas" + Campo vacio) -> 6 Seleccionadas variadas y aleatorias
        if (activeFilter === 'all' && searchText === '') {
            const allCards = [...cards];
            const mixedSelection = [];
            const categories = {};
            const MAX_CARDS = 6;

            // Algoritmo para reordenar la baraja
            allCards.sort(() => 0.5 - Math.random());

            // Garantizar al menos un elemento de cada categoría distinta
            for (const card of allCards) {
                if (mixedSelection.length >= MAX_CARDS) break;
                const category = card.dataset.category || 'unknown';
                if (!categories[category]) {
                    mixedSelection.push(card);
                    categories[category] = true;
                }
            }

            // Completar cupo sobrante
            for (const card of allCards) {
                if (mixedSelection.length >= MAX_CARDS) break;
                if (!mixedSelection.includes(card)) {
                    mixedSelection.push(card);
                }
            }

            cards.forEach(card => {
                (mixedSelection.includes(card) ? matchingCards : otherCards).push(card);
            });

        } else {
            // CASO B: Filtro por categoría puntual o búsqueda por palabras clave
            cards.forEach(card => {
                const category = card.dataset.category || '';
                const title = (card.querySelector('h3')?.textContent || '').toLowerCase();
                const description = (card.querySelector('p')?.textContent || '').toLowerCase();

                const matchesFilter = (activeFilter === 'all') || (category === activeFilter);
                const matchesSearch = title.includes(searchText) || description.includes(searchText);

                if (matchesFilter && matchesSearch) {
                    matchingCards.push(card);
                } else {
                    otherCards.push(card);
                }
            });
        }

        // Transición visual para ocultar
        otherCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            card.style.transition = 'all 0.3s ease';
        });

        // Reordenar posición DOM
        matchingCards.forEach(card => grid.appendChild(card));
        otherCards.forEach(card => grid.appendChild(card));

        // Transición visual para mostrar
        matchingCards.forEach(card => {
            card.style.display = '';
            card.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, 10);
        });

        setTimeout(() => {
            otherCards.forEach(card => card.style.display = 'none');
        }, 300);
    }

    // Registro de eventos
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterArticles();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', filterArticles);
    }

    // Inicializar visualización
    filterArticles();
});