/**
 * mapa.js
 * Mapa de Leaflet con estilo premium y popup custom
 */

document.addEventListener('DOMContentLoaded', () => {

  // ═══════════════════════════════════════
  //  ANIMACIÓN SCROLL REVEAL
  // ═══════════════════════════════════════
  const elements = document.querySelectorAll('.fade-up');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.2 });

  elements.forEach(el => observer.observe(el));


  // ═══════════════════════════════════════
  //  MAPA LEAFLET
  // ═══════════════════════════════════════
  const lat = -13.0761;
  const lng = -76.3864;

  const mapElement = document.getElementById('map');

  if (!mapElement) return;

  // Limpiar fallback antes de inicializar
  mapElement.innerHTML = '';

  const map = L.map('map', {
    scrollWheelZoom: false,
    zoomControl: false
  }).setView([lat, lng], 14);

  // Tile layer con estilo suave
  L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>',
    maxZoom: 20
  }).addTo(map);

  // Icono custom con pulso animado
  const customIcon = L.divIcon({
    html: `
      <div class="map-marker-pulse">
        <div class="marker-core">🌸</div>
        <div class="marker-ring"></div>
        <div class="marker-ring delay"></div>
      </div>
    `,
    className: 'custom-marker-wrapper',
    iconSize: [40, 40],
    iconAnchor: [20, 20]
  });

  // Popup con HTML rico
  const popupContent = `
    <div class="map-popup">
      <div class="map-popup-header">
        <span class="map-popup-icon">🌺</span>
        <div>
          <strong>Tuta Wayta</strong>
          <small>Cañete, Lima, Perú</small>
        </div>
      </div>
      <div class="map-popup-body">
        <p>📍 Valle de Cañete</p>
        <p>🕐 Lun – Vie: 8:00 – 18:00</p>
      </div>
      <a href="https://www.google.com/maps/search/?api=1&query=${lat},${lng}" 
         target="_blank" class="map-popup-link">
        Abrir en Google Maps →
      </a>
    </div>
  `;

  L.marker([lat, lng], { icon: customIcon })
    .addTo(map)
    .bindPopup(popupContent, {
      closeButton: false,
      className: 'custom-popup',
      offset: [0, -10]
    })
    .openPopup();

  // Controles de zoom custom
  L.control.zoom({
    position: 'bottomright'
  }).addTo(map);

  // Ajustar al hacer resize
  window.addEventListener('resize', () => {
    map.invalidateSize();
  });

});

