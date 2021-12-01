var map = L.map('map').setView([47.6062, -122.3321], 10);
//var tileLayer = L.tileLayer(
    
    mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; ' + mapLink + ' Contributors',
            maxZoom: 18,
            }).addTo(map);