document.addEventListener('DOMContentLoaded', () => {

  /* ========================================
      SCROLL ANIMATIONS
  ======================================== */
  const fadeElements = document.querySelectorAll('.fade-up');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.15 });

  fadeElements.forEach(el => observer.observe(el));


  /* ========================================
      ELEMENTOS GALERÍA
  ======================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');


  /* ========================================
      LIMITADOR GLOBAL (ACTUALIZADO A 9)
  ======================================== */
  function applyLimit(filter = 'all') {
    let count = 0;

    galleryItems.forEach(item => {
      const category = item.dataset.category;
      const match = (filter === 'all' || category === filter);

      // Si coincide con el filtro y aún no llegamos a 9
      if (match && count < 9) { 
        item.classList.remove('hidden');
        // Pequeño timeout para que la animación de entrada se ejecute al filtrar
        setTimeout(() => item.classList.add('active'), 10);
        count++;
      } else {
        item.classList.add('hidden');
        item.classList.remove('active');
      }
    });
  }


  /* ========================================
      INICIALIZAR GALERÍA
  ======================================== */
  applyLimit('all');


  /* ========================================
      FILTROS
  ======================================== */
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyLimit(btn.dataset.filter);
    });
  });


  /* ========================================
      LIGHTBOX
  ======================================== */
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  const title = document.getElementById('lightbox-title');
  const desc = document.getElementById('lightbox-desc');

  window.openLightbox = (figure) => {
    // Solo permitimos navegar por las 9 imágenes que están visibles
    const visibleItems = Array.from(galleryItems)
      .filter(item => !item.classList.contains('hidden'));

    window.lightboxItems = visibleItems;
    window.currentIndex = visibleItems.indexOf(figure);

    setLightboxContent(figure);

    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';

    updateCounter();
  };

  window.closeLightbox = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };

  window.changeLightbox = (dir) => {
    if (!window.lightboxItems || window.lightboxItems.length === 0) return;

    window.currentIndex += dir;

    if (window.currentIndex < 0) {
      window.currentIndex = window.lightboxItems.length - 1;
    }
    if (window.currentIndex >= window.lightboxItems.length) {
      window.currentIndex = 0;
    }

    setLightboxContent(window.lightboxItems[window.currentIndex]);
    updateCounter();
  };

  function setLightboxContent(item) {
    if (!item) return;
    
    img.style.opacity = 0;

    setTimeout(() => {
      const itemImg = item.querySelector('img');
      const itemH3 = item.querySelector('h3');
      const itemP = item.querySelector('p');

      // Actualizar contenido del lightbox.
      // Las URLs de las imágenes ya se cargan desde el HTML original.
      img.src = itemImg ? itemImg.src : '';
      img.alt = itemImg ? itemImg.alt : '';
      title.textContent = itemH3 ? itemH3.textContent : '';
      desc.textContent = itemP ? itemP.textContent : '';
      img.style.opacity = 1;
    }, 150);
  }

  function updateCounter() {
    const current = document.getElementById('lightbox-current');
    const total = document.getElementById('lightbox-total');

    if (current && total && window.lightboxItems) {
      current.textContent = window.currentIndex + 1;
      total.textContent = window.lightboxItems.length;
    }
  }


  /* ========================================
      TECLADO Y EVENTOS
  ======================================== */
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') changeLightbox(-1);
    if (e.key === 'ArrowRight') changeLightbox(1);
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') closeLightbox();
  });


  /* ========================================
      SWIPE MÓVIL
  ======================================== */
  let startX = 0;
  lightbox.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  lightbox.addEventListener('touchend', (e) => {
    let endX = e.changedTouches[0].clientX;
    let diff = startX - endX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? changeLightbox(1) : changeLightbox(-1);
    }
  }, { passive: true });

});

/* =========================================================
   NUESTRA geleria filal
   Carrusel visual de la historia y crecimiento
   de la Asociación de Productores de Pitahaya
========================================================= */
   (function() {
      const track = document.getElementById('tutaSlidesTrack');
      const prevBtn = document.getElementById('tutaPrevBtn');
      const nextBtn = document.getElementById('tutaNextBtn');
      const dotsContainer = document.getElementById('tutaDotsContainer');
      
      let currentIndex = 0;
      const totalSlides = 6;
      let timer;

      function setupDots() {
        for (let i = 0; i < totalSlides; i++) {
          const dot = document.createElement('div');
          dot.className = 'tuta-dot' + (i === 0 ? ' tuta-active' : '');
          dot.addEventListener('click', () => move(i));
          dotsContainer.appendChild(dot);
        }
      }

      function move(index) {
        currentIndex = index;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        const dots = dotsContainer.querySelectorAll('.tuta-dot');
        dots.forEach((d, i) => d.classList.toggle('tuta-active', i === currentIndex));
      }

      function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        move(currentIndex);
      }

      function startTimer() {
        timer = setInterval(nextSlide, 5500);
      }

      nextBtn.addEventListener('click', () => {
        clearInterval(timer);
        nextSlide();
        startTimer();
      });

      prevBtn.addEventListener('click', () => {
        clearInterval(timer);
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        move(currentIndex);
        startTimer();
      });

      setupDots();
      startTimer();
    })();


    