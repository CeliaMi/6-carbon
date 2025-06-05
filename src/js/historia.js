// Initialize the map
const map = L.map('map').setView([54.5167, -3.1667], 13);

// Add the OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Create a custom pencil icon
const pencilIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/1828/1828911.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

// Add the marker with the pencil icon
L.marker([54.5167, -3.1667], {icon: pencilIcon})
    .addTo(map)
    .bindPopup('Borrowdale - Lugar donde se descubrió el grafito')
    .openPopup(); 