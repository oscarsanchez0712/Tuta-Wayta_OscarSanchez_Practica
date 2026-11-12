function gestionarValor(elemento) {
    const cards = document.querySelectorAll('.valores-v2 .valor-card');

    cards.forEach(card => {
        const desc = card.querySelector('.desc');

        if (card !== elemento) {
            card.classList.remove('active');

            // cerrar suave
            desc.style.maxHeight = "0px";
            desc.style.opacity = "0";
        }
    });

    const descActual = elemento.querySelector('.desc');

    // toggle activo
    elemento.classList.toggle('active');

    if (elemento.classList.contains('active')) {
        // abrir dinámico (altura real)
        descActual.style.maxHeight = descActual.scrollHeight + "px";
        descActual.style.opacity = "1";
    } else {
        // cerrar
        descActual.style.maxHeight = "0px";
        descActual.style.opacity = "0";
    }
}