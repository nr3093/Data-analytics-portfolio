var map = L.map('map').setView([25, 80], 2);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

L.marker([13.7563, 100.5018]).addTo(map)
  .bindPopup(`
    <b>Thailand 🇹🇭</b><br><br>
    Cisco & Fabrinet<br>
    • Supply chain analytics<br>
    • Process optimization<br>
    • $16K/week shipment operations<br>
    • 40% reduction in partial shipments
  `);

L.marker([40.8075, -73.9626]).addTo(map)
  .bindPopup(`
    <b>New York 🇺🇸</b><br><br>
    Columbia University<br>
    • Machine learning & NLP<br>
    • AIoT real-time dashboard<br>
    • Data engineering & product analytics
  `);
