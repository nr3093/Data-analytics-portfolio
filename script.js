var map = L.map('map').setView([20, 100], 2);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

L.marker([13.7563, 100.5018]).addTo(map)
  .bindPopup("Thailand: Cisco & Fabrinet");

L.marker([40.7128, -74.0060]).addTo(map)
  .bindPopup("New York: Columbia Projects");
