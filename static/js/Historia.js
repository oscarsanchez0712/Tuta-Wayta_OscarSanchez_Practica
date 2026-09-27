document.addEventListener("DOMContentLoaded", () => {

    // =========================================
    // ANIMACIÓN TIMELINE
    // =========================================

    const timelineItems = document.querySelectorAll(".timeline-item");

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }

        });

    }, {
        threshold: 0.7  //esto controlar movieno linia de tienpo carts 
    });

    timelineItems.forEach((item) => {
        observer.observe(item);
    });

    // =========================================
    // MODAL
    // =========================================

    const modal = document.getElementById("timeline-modal");

    if (!modal) return;

    const modalTitle = document.getElementById("modal-title");
    const modalText = document.getElementById("modal-text");
    const modalImg = document.getElementById("modal-img");

    const closeBtn = document.querySelector(".t-close");
    const overlay = document.querySelector(".t-modal-overlay");

    const cards = document.querySelectorAll(".timeline-content");

    cards.forEach((card) => {

        card.style.cursor = "pointer";

        card.addEventListener("click", () => {

            const title = card.dataset.title;
            const text = card.dataset.text;
            const img = card.dataset.img;

            modalTitle.textContent = title;
            modalText.textContent = text;
            modalImg.src = img;

            modal.classList.add("active");

            document.body.style.overflow = "hidden";
        });

    });

    // CERRAR

    function closeModal() {
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
    }

    closeBtn.addEventListener("click", closeModal);

    overlay.addEventListener("click", closeModal);

    document.addEventListener("keydown", (e) => {

        if (e.key === "Escape") {
            closeModal();
        }

    });

});

/* =========================================================
   NUESTRA HISTORIA
   Carrusel visual de la historia y crecimiento
   de la Asociación de Productores de Pitahaya
========================================================= */

(function() {

    const slider = document.querySelector('.comunidad-slider');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const dots = document.querySelectorAll('.dot');

    let currentIndex = 0;
    const totalSlides = document.querySelectorAll('.comunidad-slide').length;
    let timer;

    function move(index) {

        currentIndex = index;

        slider.style.transform =
            `translateX(-${currentIndex * 100}%)`;

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    function nextSlide() {

        currentIndex =
            (currentIndex + 1) % totalSlides;

        move(currentIndex);
    }

    function startTimer() {
        timer = setInterval(nextSlide, 5000);
    }

    nextBtn.addEventListener('click', () => {

        clearInterval(timer);

        nextSlide();

        startTimer();
    });

    prevBtn.addEventListener('click', () => {

        clearInterval(timer);

        currentIndex =
            (currentIndex - 1 + totalSlides) % totalSlides;

        move(currentIndex);

        startTimer();
    });

    dots.forEach((dot, index) => {

        dot.addEventListener('click', () => {

            clearInterval(timer);

            move(index);

            startTimer();
        });

    });

    startTimer();

})();