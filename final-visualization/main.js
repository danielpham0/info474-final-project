var map = L.map('map').setView([47.6062, -122.3321], 11);
var tileLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png')
tileLayer.addTo(map)

// get neighborhoodData
var neighborhoodData;

// retreived from https://github.com/seattleio/seattle-boundaries-data/tree/9c56894e67e3fb0faa3219efb6a0d66312298428
let promise = fetch("https://raw.githubusercontent.com/seattleio/seattle-boundaries-data/9c56894e67e3fb0faa3219efb6a0d66312298428/data/neighborhoods.geojson");
promise.then(function(response) {
    return response.json();
}).then(function(data) {
    console.log(data);
    neighborhoodData = data;
})
.catch(function(error) {
    console.log("Error");
    console.log(error);
})

var geojsonLayer = L.geoJSON(neighborhoodData).addTo(map);
