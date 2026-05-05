var heroMap = L.map('heroMap', {
  zoomControl: false,
  scrollWheelZoom: false
}).setView([30, 30], 2);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(heroMap);

const places = [
  {
    name: "New York",
    coords: [40.8075, -73.9626],
    color: "#1d9e75",
    size: 16
  },
  {
    name: "London",
    coords: [51.5072, -0.1276],
    color: "#d85a30",
    size: 12
  },
  {
    name: "Thailand",
    coords: [13.7563, 100.5018],
    color: "#ef9f27",
    size: 12
  }
];

places.forEach(place => {
  L.circleMarker(place.coords, {
    radius: place.size,
    color: place.color,
    fillColor: place.color,
    fillOpacity: 0.9,
    weight: 2
  })
  .addTo(heroMap)
  .bindPopup(`<b>${place.name}</b>`);
});

// Connection line (journey)
L.polyline([
  [13.7563, 100.5018],
  [51.5072, -0.1276],
  [40.8075, -73.9626]
], {
  color: "#333",
  weight: 2,
  dashArray: "6, 8",
  opacity: 0.6
}).addTo(heroMap);
