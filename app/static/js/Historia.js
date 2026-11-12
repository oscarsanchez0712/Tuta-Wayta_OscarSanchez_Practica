```javascript
document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       TIMELINE
    ========================================================= */

    const timelineItems =
        document.querySelectorAll(".timeline-item");


    if (timelineItems.length > 0) {

        const observer =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("active");

                            // No volver a observar
                            // una tarjeta ya animada
                            observer.unobserve(
                                entry.target
                            );
                        }

                    });

                },
                {
                    threshold: 0.35
                }
            );


        timelineItems.forEach((item) => {

            observer.observe(item);

        });
    }


    /* =========================================================
       MODAL
    ========================================================= */

    const modal =
        document.getElementById(
            "timeline-modal"
        );


    if (modal) {

        const modalTitle =
            document.getElementById(
                "modal-title"
            );

        const modalText =
            document.getElementById(
                "modal-text"
            );

        const modalImg =
            document.getElementById(
                "modal-img"
            );

        const closeBtn =
            document.querySelector(
                ".t-close"
            );

        const overlay =
            document.querySelector(
                ".t-modal-overlay"
            );

        const cards =
            document.querySelectorAll(
                ".timeline-content"
            );


        /* =====================================================
           ABRIR MODAL
        ===================================================== */

        function openModal(card) {

            const title =
                card.dataset.title ||
                "Nuestra historia";

            const text =
                card.dataset.text ||
                "";

            const img =
                card.dataset.img ||
                "";


            if (modalTitle) {

                modalTitle.textContent =
                    title;
            }


            if (modalText) {

                modalText.textContent =
                    text;
            }


            if (modalImg) {

                if (img) {

                    modalImg.src = img;

                    modalImg.alt = title;

                    modalImg.style.display =
                        "block";

                } else {

                    modalImg.style.display =
                        "none";
                }
            }


            modal.classList.add("active");

            modal.setAttribute(
                "aria-hidden",
                "false"
            );


            document.body.style.overflow =
                "hidden";
        }


        /* =====================================================
           CERRAR MODAL
        ===================================================== */

        function closeModal() {

            modal.classList.remove(
                "active"
            );

            modal.setAttribute(
                "aria-hidden",
                "true"
            );


            document.body.style.overflow =
                "";
        }


        /* =====================================================
           TARJETAS
        ===================================================== */

        cards.forEach((card) => {

            card.style.cursor =
                "pointer";


            card.addEventListener(
                "click",
                () => {

                    openModal(card);

                }
            );

        });


        /* =====================================================
           BOTÓN CERRAR
        ===================================================== */

        if (closeBtn) {

            closeBtn.addEventListener(
                "click",
                closeModal
            );
        }


        /* =====================================================
           OVERLAY
        ===================================================== */

        if (overlay) {

            overlay.addEventListener(
                "click",
                closeModal
            );
        }


        /* =====================================================
           ESC
        ===================================================== */

        document.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Escape" &&
                    modal.classList.contains(
                        "active"
                    )
                ) {

                    closeModal();

                }

            }
        );
    }


    /* =========================================================
       CARRUSEL
    ========================================================= */

    const slider =
        document.querySelector(
            ".comunidad-slider"
        );

    const slides =
        document.querySelectorAll(
            ".comunidad-slide"
        );

    const prevBtn =
        document.querySelector(
            ".prev"
        );

    const nextBtn =
        document.querySelector(
            ".next"
        );

    const dots =
        document.querySelectorAll(
            ".dot"
        );


    if (
        !slider ||
        slides.length === 0
    ) {

        return;
    }


    let currentIndex = 0;

    let timer = null;

    const totalSlides =
        slides.length;

    const AUTO_PLAY_TIME =
        5000;


    /* =========================================================
       MOVER SLIDE
    ========================================================= */

    function moveToSlide(index) {

        if (index < 0) {

            index =
                totalSlides - 1;
        }


        if (index >= totalSlides) {

            index = 0;
        }


        currentIndex = index;


        slider.style.transform =
            `translateX(-${currentIndex * 100}%)`;


        /* Actualizar dots */

        dots.forEach(
            (dot, dotIndex) => {

                dot.classList.toggle(
                    "active",
                    dotIndex ===
                    currentIndex
                );
            }
        );


        /* Accesibilidad */

        slides.forEach(
            (slide, slideIndex) => {

                slide.setAttribute(
                    "aria-hidden",
                    slideIndex !==
                    currentIndex
                );
            }
        );
    }


    /* =========================================================
       SIGUIENTE
    ========================================================= */

    function nextSlide() {

        moveToSlide(
            currentIndex + 1
        );
    }


    /* =========================================================
       ANTERIOR
    ========================================================= */

    function previousSlide() {

        moveToSlide(
            currentIndex - 1
        );
    }


    /* =========================================================
       INICIAR AUTOPLAY
    ========================================================= */

    function startAutoPlay() {

        stopAutoPlay();


        timer = setInterval(
            nextSlide,
            AUTO_PLAY_TIME
        );
    }


    /* =========================================================
       DETENER AUTOPLAY
    ========================================================= */

    function stopAutoPlay() {

        if (timer) {

            clearInterval(timer);

            timer = null;
        }
    }


    /* =========================================================
       BOTÓN SIGUIENTE
    ========================================================= */

    if (nextBtn) {

        nextBtn.addEventListener(
            "click",
            () => {

                stopAutoPlay();

                nextSlide();

                startAutoPlay();
            }
        );
    }


    /* =========================================================
       BOTÓN ANTERIOR
    ========================================================= */

    if (prevBtn) {

        prevBtn.addEventListener(
            "click",
            () => {

                stopAutoPlay();

                previousSlide();

                startAutoPlay();
            }
        );
    }


    /* =========================================================
       DOTS
    ========================================================= */

    dots.forEach(
        (dot, index) => {

            dot.addEventListener(
                "click",
                () => {

                    stopAutoPlay();

                    moveToSlide(index);

                    startAutoPlay();
                }
            );

        }
    );


    /* =========================================================
       PAUSAR CON MOUSE
    ========================================================= */

    slider.addEventListener(
        "mouseenter",
        stopAutoPlay
    );

    slider.addEventListener(
        "mouseleave",
        startAutoPlay
    );


    /* =========================================================
       PESTAÑA INACTIVA
    ========================================================= */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (document.hidden) {

                stopAutoPlay();

            } else {

                startAutoPlay();
            }

        }
    );


    /* =========================================================
       TECLADO
    ========================================================= */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "ArrowRight") {

                stopAutoPlay();

                nextSlide();

                startAutoPlay();
            }


            if (event.key === "ArrowLeft") {

                stopAutoPlay();

                previousSlide();

                startAutoPlay();
            }

        }
    );


    /* =========================================================
       INICIALIZAR
    ========================================================= */

    moveToSlide(0);

    startAutoPlay();

});
```
