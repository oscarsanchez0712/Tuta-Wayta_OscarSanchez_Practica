
// carrudel de imagen todo principan de todos pagainas web//
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".carousel-slide");
  const nextBtn = document.querySelector(".carousel-btn-nav.next");
  const prevBtn = document.querySelector(".carousel-btn-nav.prev");
  const dots = document.querySelectorAll(".dot");
  const progressBar = document.querySelector(".progress-bar");

  let currentSlide = 0;
  let interval;
  let progressInterval;
  const slideDuration = 5000;
  const totalSlides = slides.length;

  function showSlide(idx) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === idx);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === idx);
      dot.setAttribute("aria-selected", i === idx ? "true" : "false");
    });

    currentSlide = idx;
    resetProgress();
  }

  function nextSlide() {
    const next = (currentSlide + 1) % totalSlides;
    showSlide(next);
  }

  function prevSlide() {
    const prev = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(prev);
  }

  function startProgress() {
    let width = 0;
    const increment = 100 / (slideDuration / 50);

    progressInterval = setInterval(() => {
      width += increment;
      if (progressBar) progressBar.style.width = width + "%";
      if (width >= 100) clearInterval(progressInterval);
    }, 50);
  }

  function resetProgress() {
    clearInterval(progressInterval);
    if (progressBar) progressBar.style.width = "0%";
    startProgress();
  }

  function startAuto() {
    interval = setInterval(nextSlide, slideDuration);
    startProgress();
  }

  function resetAuto() {
    clearInterval(interval);
    startAuto();
  }

  nextBtn?.addEventListener("click", () => {
    nextSlide();
    resetAuto();
  });

  prevBtn?.addEventListener("click", () => {
    prevSlide();
    resetAuto();
  });

  dots.forEach((dot, idx) => {
    dot.addEventListener("click", () => {
      showSlide(idx);
      resetAuto();
    });
  });
  
// carrudel de imagen todo principan de todos pagainas web  termina//



// Navegación del carrusel (teclado y swipe)

  document.addEventListener("keydown", (e) => {
    const hero = document.querySelector(".hero-carousel");
    if (!hero) return;
    const rect = hero.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    if (!isVisible) return;

    if (e.key === "ArrowRight") {
      nextSlide();
      resetAuto();
    }
    if (e.key === "ArrowLeft") {
      prevSlide();
      resetAuto();
    }
  });

  let touchStartX = 0;
  let touchEndX = 0;
  const hero = document.querySelector(".hero-carousel");

  hero?.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  hero?.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const threshold = 50;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      resetAuto();
    }
  }

  showSlide(currentSlide);
  startAuto();
});













/* =========================================================
   PROCESO PITAHAYA - DISEÑO PROFESIONAL COMPLETO 
========================================================= */

const items = document.querySelectorAll(".timeline-item");

items.forEach(item => {
    item.addEventListener("click", () => {

        // quitar active a todos
        items.forEach(i => i.classList.remove("active"));

        // activar el clickeado
        item.classList.add("active");
    });
});



/* =========================================================
      PARTE 4 ESTADÍSTICAS OSCURAS (DARK STATS SECTION)
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const contadores = document.querySelectorAll('.contador-animado');
    const velocidad = 200; // Cuanto más alto, más lento el conteo

    const animarContador = (contador) => {
        const actualizar = () => {
            const target = +contador.getAttribute('data-target');
            const actual = +contador.innerText.replace('+', '').replace('%', '');
            const incremento = target / velocidad;

            if (actual < target) {
                const nuevoValor = Math.ceil(actual + incremento);
                
                // Formateo según el tipo de dato (añadir + o %)
                if (target === 100) {
                    contador.innerText = nuevoValor + "%";
                } else if (target === 6 || target === 30) {
                    contador.innerText = nuevoValor + "+";
                } else {
                    contador.innerText = nuevoValor;
                }
                
                setTimeout(actualizar, 10); // Esto mas inortante mas lento de lento ebiende 

            } else {
                // Asegurar que termine en el valor exacto con su símbolo
                if (target === 100) contador.innerText = "100%";
                else if (target === 6) contador.innerText = "6+";
                else if (target === 30) contador.innerText = "30+";
                else contador.innerText = target;
            }
        };
        actualizar();
    };

    // Observer para que la animación solo inicie cuando la sección sea visible
    const observerOptions = { threshold: 0.5 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animarContador(entry.target);
                observer.unobserve(entry.target); // Solo animar una vez
            }
        });
    }, observerOptions);

    contadores.forEach(c => observer.observe(c));
});



/* =========================================================
   CARRUSEL TESTIMONIOS PREMIUM
   (AISLADO - NO AFECTA OTROS JS)
========================================================= */

(() => {

    /* =====================================================
       SELECTORES ÚNICOS
    ===================================================== */

    const section =
        document.querySelector(
            ".seccion-especifica-testimonios"
        );

    if (!section) return;

    const track =
        section.querySelector(
            ".testimonios-track"
        );

    const cards =
        section.querySelectorAll(
            ".card-testimonio"
        );

    const nextBtn =
        section.querySelector(
            ".next"
        );

    const prevBtn =
        section.querySelector(
            ".prev"
        );

    const dotsContainer =
        section.querySelector(
            ".dots-container"
        );

    /* =====================================================
       VARIABLES
    ===================================================== */

    let index = 0;

    let autoPlay;

    const gap = 25;

    /* =====================================================
       CARDS VISIBLES
    ===================================================== */

    function getCardsVisible() {

        if (window.innerWidth <= 768) {
            return 1;
        }

        if (window.innerWidth <= 1024) {
            return 2;
        }

        return 3;
    }

    /* =====================================================
       CREAR DOTS
    ===================================================== */

    function createDots() {

        dotsContainer.innerHTML = "";

        const totalSlides =
            cards.length - getCardsVisible() + 1;

        for (let i = 0; i < totalSlides; i++) {

            const dot =
                document.createElement("span");

            if (i === index) {
                dot.classList.add("active");
            }

            dot.addEventListener("click", () => {

                index = i;

                updateCarousel();

                restartAutoplay();
            });

            dotsContainer.appendChild(dot);
        }
    }

    /* =====================================================
       ACTUALIZAR CARRUSEL
    ===================================================== */

    function updateCarousel() {

        const cardWidth =
            cards[0].offsetWidth + gap;

        track.style.transform =
            `translateX(-${index * cardWidth}px)`;

        const dots =
            dotsContainer.querySelectorAll("span");

        dots.forEach((dot, i) => {

            dot.classList.toggle(
                "active",
                i === index
            );
        });
    }

    /* =====================================================
       SIGUIENTE
    ===================================================== */

    function nextSlide() {

        const maxIndex =
            cards.length - getCardsVisible();

        if (index < maxIndex) {

            index++;

        } else {

            index = 0;
        }

        updateCarousel();
    }

    /* =====================================================
       ANTERIOR
    ===================================================== */

    function prevSlide() {

        const maxIndex =
            cards.length - getCardsVisible();

        if (index > 0) {

            index--;

        } else {

            index = maxIndex;
        }

        updateCarousel();
    }

    /* =====================================================
       BOTONES
    ===================================================== */

    nextBtn.addEventListener("click", () => {

        nextSlide();

        restartAutoplay();
    });

    prevBtn.addEventListener("click", () => {

        prevSlide();

        restartAutoplay();
    });

    /* =====================================================
       AUTOPLAY
    ===================================================== */

    function startAutoplay() {

        autoPlay = setInterval(() => {

            nextSlide();

        }, 4500);
    }

    function stopAutoplay() {

        clearInterval(autoPlay);
    }

    function restartAutoplay() {

        stopAutoplay();

        startAutoplay();
    }

    /* =====================================================
       PAUSA EN HOVER
    ===================================================== */

    section.addEventListener("mouseenter", () => {

        stopAutoplay();
    });

    section.addEventListener("mouseleave", () => {

        startAutoplay();
    });

    /* =====================================================
       RESPONSIVE
    ===================================================== */

    window.addEventListener("resize", () => {

        createDots();

        updateCarousel();
    });

    /* =====================================================
       INICIAR
    ===================================================== */

    createDots();

    updateCarousel();

    startAutoplay();

})();


/* =========================================================
   FILTRO RECETAS DESAYUNOS — PREMIUM (CORREGIDO) DEL PITAHAYA
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const botonesFiltro = document.querySelectorAll(".btn-filtro");
    const tarjetasRecetas = document.querySelectorAll(".card-receta");

    /* =====================================================
       ORDEN BASE (MEZCLA CONTROLADA)
    ===================================================== */

    const ordenCategorias = ["DESAYUNO", "BEBIDAS", "POSTRES"];

    /* =====================================================
       MOSTRAR TARJETAS CON ANIMACIÓN
    ===================================================== */

    function mostrarTarjeta(tarjeta) {
        tarjeta.style.display = "block";

        setTimeout(() => {
            tarjeta.style.opacity = "1";
            tarjeta.style.transform = "scale(1) translateY(0)";
        }, 50);
    }

    function ocultarTarjeta(tarjeta) {
        tarjeta.style.opacity = "0";
        tarjeta.style.transform = "scale(.92) translateY(10px)";

        setTimeout(() => {
            tarjeta.style.display = "none";
        }, 250);
    }

    /* =====================================================
       FILTRADO PRINCIPAL
    ===================================================== */

    botonesFiltro.forEach((boton) => {

        boton.addEventListener("click", () => {

            /* ACTIVO */
            botonesFiltro.forEach(btn => btn.classList.remove("activo"));  // esto funciona movimiento de los menu d
            boton.classList.add("activo");

            const categoriaSeleccionada = boton.textContent.trim().toUpperCase();

            /* =================================================
               TODAS (4 MEZCLADAS BIEN)
            ================================================= */

            if (categoriaSeleccionada === "TODAS") {

                let usados = 0;

                // recorrer en orden fijo para que SIEMPRE empiece por postres primero si quieres cambiarlo
                tarjetasRecetas.forEach((tarjeta) => {

                    const cat = tarjeta.querySelector(".etiqueta-categoria")
                        .textContent.trim().toUpperCase();

                    if (usados < 4 && ordenCategorias.includes(cat)) {
                        mostrarTarjeta(tarjeta);
                        usados++;
                    } else {
                        ocultarTarjeta(tarjeta);
                    }
                });

                return;
            }

            /* =================================================
               FILTRO POR CATEGORÍA (MAX 4)
            ================================================= */

            let visibles = 0;

            tarjetasRecetas.forEach((tarjeta) => {

                const cat = tarjeta.querySelector(".etiqueta-categoria")
                    .textContent.trim().toUpperCase();

                if (cat === categoriaSeleccionada && visibles < 4) {  // esto peromite solo  tenga cuaro fila entiende 
                    mostrarTarjeta(tarjeta);
                    visibles++;
                } else {
                    ocultarTarjeta(tarjeta);
                }
            });
        });
    });

    /* =====================================================
       INICIO → MOSTRAR 4 MIX INICIAL
    ===================================================== */

    let mostrados = 0;

    tarjetasRecetas.forEach((tarjeta) => {

        const cat = tarjeta.querySelector(".etiqueta-categoria")
            .textContent.trim().toUpperCase();

        if (mostrados < 4 && ordenCategorias.includes(cat)) {   //esto mas importante funcilidad  recetas
            tarjeta.style.display = "block";
            mostrados++;
        } else {
            tarjeta.style.display = "none";
        }
    });

});









// estos es sobre imahgen de galeria de iamgen pagina de incio//
const datos = [
    { url: "https://readdy.ai/api/search-image?query=dragon-fruit-plantation-peruvian-farm-rows-of-pitahaya-cactus-plants-fuchsia-fruits-lush-green-leaves-natural-daylight-agricultural-landscape-texture-background&width=1400&height=500&seq=galhero", desc: "Plantaciones sostenibles bajo el sol peruano." },
    { url: "https://readdy.ai/api/search-image?query=farmers-harvesting-dragon-fruit-in-peruvian-field-hand-picking-pink-pitahaya-from-cactus-plant-rural-agriculture-scene-natural-sunlight-warm-tones-documentary-photography&width=600&height=800&seq=g2", desc: "Recolección manual para asegurar la madurez exacta." },
    { url: "https://readdy.ai/api/search-image?query=fresh-cut-dragon-fruit-pink-skin-white-flesh-black-seeds-overhead-view-rustic-wooden-cutting-board-food-photography-natural-daylight&width=600&height=800&seq=g7", desc: "Fruta fresca seleccionada con los más altos estándares." },
    { url: "https://readdy.ai/api/search-image?query=artisan-dragon-fruit-products-arrangement-yogurt-jar-marmalade-nectar-bottle-dried-chips-fresh-pitahaya-rustic-wooden-table-natural-lighting-premium-food-photography&width=700&height=400&seq=g4", desc: "Innovación natural: de la tierra a tu mesa." }
];

let currentIndex = 0;

function abrirImagen(index) {
    currentIndex = index;
    updateModal();
    document.getElementById('modalGaleria').style.display = 'flex';
}

function cerrarImagen() {
    document.getElementById('modalGaleria').style.display = 'none';
}

function cambiarImagen(n) {
    currentIndex += n;
    if (currentIndex >= datos.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = datos.length - 1;
    updateModal();
}

function updateModal() {
    const item = datos[currentIndex];
    document.getElementById('modalImg').src = item.url;
    document.getElementById('modalBg').style.backgroundImage = `url(${item.url})`;
    document.getElementById('modalDesc').innerText = item.desc;
    document.getElementById('modalContador').innerText = `${currentIndex + 1} / ${datos.length}`;
    
    // Dibujar puntos
    const dots = document.getElementById('modalDots');
    dots.innerHTML = "";
    datos.forEach((_, i) => {
        const d = document.createElement('div');
        d.className = `dot ${i === currentIndex ? 'active' : ''}`;
        dots.appendChild(d);
    });
}




// esto saarriba fechita //


document.addEventListener("DOMContentLoaded", function () {
    const scrollTopBtn = document.getElementById("scrollTopBtn");

    // 1. Monitorear el scroll para mostrar u ocultar el botón
    window.addEventListener("scroll", () => {
        // Se muestra el botón si el usuario baja más de 400 píxeles
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add("show");
        } else {
            scrollTopBtn.classList.remove("show");
        }
    });

    // 2. Acción de click: Subida suave (Smooth Scroll) al tope de la página
    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth" // Desplazamiento fluido nativo del navegador
        });
    });
});



