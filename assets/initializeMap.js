export default function initializeMap() {
  // Create map with default view
  map = L.map('map', {
    zoomControl: false,
    attributionControl: false
  }).setView([41.0082, 28.9784], 13); // Default Istanbul view

  // Add tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Add zoom control
  L.control.zoom({ position: 'bottomright' }).addTo(map);

  // Add layers
  markers.addTo(map);
  drawnItems.addTo(map);

  // Add scale control
  L.control.scale({ imperial: false, position: 'bottomleft' }).addTo(map);
}