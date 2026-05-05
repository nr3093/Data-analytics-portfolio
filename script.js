var heroMap = L.map('heroMap', {
  zoomControl: false,
  scrollWheelZoom: false
}).setView([28, 45], 2);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(heroMap);

const places = [
  {
    label: "Current · New York",
    coords: [40.8075, -73.9626],
    color: "#1d9e75",
    fill: "#e1f5ee",
    text: "Columbia University · Applied Analytics · current home base"
  },
  {
    label: "Thailand",
    coords: [13.7563, 100.5018],
    color: "#ef9f27",
    fill: "#faeeda",
    text: "Cisco & Fabrinet · supply chain analytics · process optimization"
  },
  {
    label: "London",
    coords: [51.5072, -0.1276],
    color: "#d85a30",
    fill: "#faece7",
    text: "Zanista · fintech risk analytics · news-driven ML modeling"
  }
];

places.forEach(place => {
  L.circleMarker(place.coords, {
    radius: place.label.includes("New York") ? 16 : 12,
    color: place.color,
    fillColor: place.fill,
    fillOpacity: 0.95,
    weight: 3
  })
  .addTo(heroMap)
  .bindPopup(`<b>${place.label}</b><br>${place.text}`);

  L.marker(place.coords, {
    icon: L.divIcon({
      className: "location-label",
      html: place.label,
      iconSize: null
    })
  }).addTo(heroMap);
});

L.polyline([
  [13.7563, 100.5018],
  [51.5072, -0.1276],
  [40.8075, -73.9626]
], {
  color: "#1a1a18",
  weight: 2,
  opacity: 0.45,
  dashArray: "6, 8"
}).addTo(heroMap);
