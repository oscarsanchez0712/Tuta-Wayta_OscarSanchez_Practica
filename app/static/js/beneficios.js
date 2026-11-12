// ==========================================================================
// ANIMACIÓN SCROLL + EFECTO PREMIUM
// ==========================================================================

// Base path del servidor: vacio en local, "/tutawayta" en produccion.
const beneficiosBasePath = window.TUTA_BASE_PATH || (window.location.pathname.startsWith('/tutawayta') ? '/tutawayta' : '');

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================================
       FADE-UP AL HACER SCROLL
       ========================================================== */

    const fadeTargets = document.querySelectorAll(".fade-up");

    if (fadeTargets.length) {

        const observer = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.1
            }
        );

        fadeTargets.forEach((el) => {
            observer.observe(el);
        });
    }

    /* ==========================================================
       EFECTO PREMIUM CARDS
       ========================================================== */

    const cards = document.querySelectorAll(".beneficio-card");

    cards.forEach((card, index) => {

        // delay animación
        card.style.transitionDelay = `${index * 0.1}s`;

        // efecto mouse
        card.addEventListener("mousemove", (e) => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty("--x", `${x}px`);
            card.style.setProperty("--y", `${y}px`);

        });

    });

});

// parte nurriciones //

const dbNutricional = {
    calorias: {
        titulo: "Calorías", icono: "🔥", unidad: "kcal",
        desc: "Energía total para tus funciones diarias.",
        rec: "Las variedades Blanca e Híbrida son las más ligeras para control de peso.",
        tags: ["Fitness", "Energía"], mejor: "blanca",
        valores: { beauty: 60, hibrida: 57, blanca: 57, amarilla: 62 }
    },
    carbohidratos: {
        titulo: "Carbohidratos", icono: "🍞", unidad: "g",
        desc: "Azúcares naturales de absorción equilibrada.",
        rec: "Interior Blanco tiene el índice más bajo, ideal para evitar picos de glucosa.",
        tags: ["Salud", "Glucosa"], mejor: "blanca",
        valores: { beauty: 13, hibrida: 12, blanca: 11, amarilla: 14 }
    },
    fibra: {
        titulo: "Fibra Dietética", icono: "🌾", unidad: "g",
        desc: "Fundamental para la salud intestinal.",
        rec: "La Amarilla es la reina indiscutible de la fibra. Recomendada para digestión lenta.",
        tags: ["Digestión", "Saciedad"], mejor: "amarilla",
        valores: { beauty: 3.0, hibrida: 2.8, blanca: 2.5, amarilla: 3.5 }
    },
    proteinas: {
        titulo: "Proteínas", icono: "❤️", unidad: "g",
        desc: "Aporte vegetal para tus músculos.",
        rec: "La Amarilla lidera. Perfecta para batidos después de entrenar.",
        tags: ["Músculos", "Recuperación"], mejor: "amarilla",
        valores: { beauty: 1.2, hibrida: 1.1, blanca: 1.0, amarilla: 1.3 }
    },
    grasas: {
        titulo: "Grasas Totales", icono: "🥑", unidad: "g",
        desc: "Grasas saludables y ácidos grasos esenciales.",
        rec: "Todas mantienen un perfil lipídico similar y muy bajo.",
        tags: ["Salud Corazón"], mejor: "todas",
        valores: { beauty: 0.4, hibrida: 0.4, blanca: 0.4, amarilla: 0.5 }
    },
    vitamina_c: {
        titulo: "Vitamina C", icono: "☀️", unidad: "mg",
        desc: "Potente antioxidante natural.",
        rec: "La Híbrida ofrece casi el doble de Vitamina C que las demás.",
        tags: ["Inmunidad", "Piel"], mejor: "hibrida",
        valores: { beauty: 9, hibrida: 20, blanca: 8, amarilla: 15 }
    },
    hierro: {
        titulo: "Hierro", icono: "🔩", unidad: "mg",
        desc: "Transporte de oxígeno en la sangre.",
        rec: "La Híbrida es la mejor fuente mineral. Ideal para combatir anemia.",
        tags: ["Vitalidad", "Sangre"], mejor: "hibrida",
        valores: { beauty: 0.6, hibrida: 0.9, blanca: 0.5, amarilla: 0.7 }
    },
    calcio: {
        titulo: "Calcio", icono: "🛡️", unidad: "mg",
        desc: "Fortaleza para tus huesos.",
        rec: "La Híbrida lidera en aporte mineral para la salud dental y ósea.",
        tags: ["Huesos", "Dientes"], mejor: "hibrida",
        valores: { beauty: 8, hibrida: 10, blanca: 8, amarilla: 9 }
    },
    magnesio: {
        titulo: "Magnesio", icono: "🌙", unidad: "mg",
        desc: "Relajación muscular y sistema nervioso.",
        rec: "La Híbrida es ideal para mejorar el descanso nocturno.",
        tags: ["Relajación", "Sueño"], mejor: "hibrida",
        valores: { beauty: 35, hibrida: 42, blanca: 30, amarilla: 38 }
    },
    agua: {
        titulo: "Contenido de Agua", icono: "💧", unidad: "%",
        desc: "Nivel de hidratación de la pulpa.",
        rec: "La Blanca es la más hidratante, perfecta para días de calor extremo.",
        tags: ["Hidratación", "Refrescante"], mejor: "blanca",
        valores: { beauty: 85, hibrida: 87, blanca: 90, amarilla: 82 }
    }
};

function selectNutriente(element, key) {
    const data = dbNutricional[key];
    if (!data) return;

    // Cambiar estado activo en el menú
    document.querySelectorAll('.nutriente-item').forEach(i => i.classList.remove('active'));
    element.classList.add('active');

    // Actualizar Panel
    document.getElementById('main-icon').textContent = data.icono;
    document.getElementById('main-title').textContent = data.titulo;
    document.getElementById('main-desc').textContent = data.desc;
    document.getElementById('main-rec').textContent = data.rec;

    // Actualizar Tags
    const tagsBox = document.getElementById('main-tags');
    tagsBox.innerHTML = '';
    data.tags.forEach(t => tagsBox.innerHTML += `<span class="pill">${t}</span>`);

    // Actualizar Barras
    const maxVal = Math.max(...Object.values(data.valores));
    for (const vId in data.valores) {
        const val = data.valores[vId];
        const row = document.querySelector(`.bar-row[data-variedad="${vId}"]`);
        const pct = (val / maxVal) * 100;
        
        row.querySelector('.val').textContent = `${val} ${data.unidad}`;
        row.querySelector('.bar-fill').style.width = pct + '%';
        
        // Etiqueta Mejor
        const badge = row.querySelector('.badge-winner');
        if (badge) {
            badge.style.display = (data.mejor === 'todas' || vId === data.mejor) ? 'inline-block' : 'none';
        }
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('default-nutriente').click();
});



//Dudas sobre el Consumo


document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        
        // Opcional: Cerrar las demás al abrir una nueva
        document.querySelectorAll('.faq-item').forEach(item => {
            if(item !== faqItem) item.classList.remove('active');
        });

        faqItem.classList.toggle('active');
    });
});

document.getElementById('btnDescargarPdf').addEventListener('click', async function() {
    const tabla = document.querySelector('.tabla-nutricional-resumen');
    if (!tabla) return;

    const headers = Array.from(tabla.querySelectorAll('thead th')).map(th => th.textContent.trim());
    const rows = Array.from(tabla.querySelectorAll('tbody tr')).map(tr => 
        Array.from(tr.querySelectorAll('td')).map(td => td.textContent.trim())
    );

    const data = { headers, rows };

    this.disabled = true;
    this.innerHTML = '<span class="material-symbols-outlined">hourglass_top</span> Generando...';

    try {
        const response = await fetch(`${beneficiosBasePath}/generar_pdf_nutricional`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error('Error en el servidor al generar el PDF');

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'tabla_nutricional_tutawayta.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error al descargar el PDF:', error);
        alert('No se pudo generar el PDF. Inténtalo de nuevo.');
    } finally {
        this.disabled = false;
        this.innerHTML = '<span class="material-symbols-outlined">download</span> Descargar PDF';
    }
});