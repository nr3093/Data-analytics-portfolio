<script>
  window.addEventListener('DOMContentLoaded', function () {

    const map = L.map('journey-map', {
      scrollWheelZoom: false,
      zoomControl: true
    }).setView([30, 30], 2);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '© <a href="https://carto.com/">CARTO</a> · © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18
    }).addTo(map);

    function makeIcon(emoji, isActive) {
      return L.divIcon({
        className: '',
        html: `<div style="
          font-size: 20px; width: 42px; height: 42px;
          display: flex; align-items: center; justify-content: center;
          background: ${isActive ? '#2d5be3' : '#ffffff'};
          border: 2.5px solid #2d5be3; border-radius: 50%;
          box-shadow: 0 4px 14px rgba(45,91,227,0.3);
        ">${emoji}</div>`,
        iconSize: [42, 42], iconAnchor: [21, 21], popupAnchor: [0, -26]
      });
    }

    const places = [
      {
        emoji: '🇹🇭', name: 'Thailand',
        lat: 13.7563, lng: 100.5018,
        years: '2019 – 2025',
        desc: 'Cisco & Fabrinet · Supply Chain & Engineering',
        tag: null, isActive: false
      },
      {
        emoji: '🇬🇧', name: 'London',
        lat: 51.5074, lng: -0.1278,
        years: '2025 – 2026',
        desc: 'MSc Data Analytics · Fintech Risk Analytics (Remote)',
        tag: '💻 Remote Project', isActive: false
      },
      {
        emoji: '🇺🇸', name: 'New York',
        lat: 40.7128, lng: -74.0060,
        years: '2026 → Present',
        desc: 'Current chapter · Open to opportunities',
        tag: '📍 Currently here', isActive: true
      }
    ];

    const coords = [];

    places.forEach(function (p) {
      const marker = L.marker([p.lat, p.lng], { icon: makeIcon(p.emoji, p.isActive) }).addTo(map);
      const tagHtml = p.tag ? `<span class="popup-tag">${p.tag}</span>` : '';
      marker.bindPopup(`
        <span class="popup-name">${p.emoji} ${p.name}</span>
        <span class="popup-years">${p.years}</span>
        <span class="popup-desc">${p.desc}</span>
        ${tagHtml}
      `);
      coords.push([p.lat, p.lng]);
    });

    L.polyline(coords, {
      color: '#2d5be3', weight: 2, dashArray: '8, 10', opacity: 0.55
    }).addTo(map);

  });
</script>
