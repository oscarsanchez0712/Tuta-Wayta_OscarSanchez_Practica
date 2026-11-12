// ===== ANIMACIÓN SCROLL =====
const reveals = document.querySelectorAll(".reveal");

function mostrarElementos() {
  const windowHeight = window.innerHeight;

  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;

    if (top < windowHeight - 100) {
      el.classList.add("active");
    }
  });
}

// Eventos
window.addEventListener("scroll", mostrarElementos);
window.addEventListener("load", mostrarElementos);