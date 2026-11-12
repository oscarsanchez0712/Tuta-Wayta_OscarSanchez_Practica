// ==========================================
// CONTROLADOR INDEPENDIENTE: CARRUSEL DE IMÁGENES (HOME / BANNER)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const contenedorImg = document.getElementById('carruselImat');
    
    if (contenedorImg) {
        let indexImagen = 0;
        const totalImagenes = document.querySelectorAll('.slide').length;
        
        function aplicarCambio() {
            contenedorImg.style.transform = `translateX(${-indexImagen * 100}%)`;
        }
        
        window.moverDerecha = function () {
            indexImagen = (indexImagen + 1) % totalImagenes;
            aplicarCambio();
        };
        
        window.moverIzquierda = function () {
            indexImagen = (indexImagen - 1 + totalImagenes) % totalImagenes;
            aplicarCambio();
        };
    }
});

