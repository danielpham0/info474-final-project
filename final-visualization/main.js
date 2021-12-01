function dataPreprocessor(row) {
    return {
        X: row.X,
        Y: row.Y,
        LOC: row.LOCATION,
        SEVCODE: row.SEVERITYCODE,
        SEVDESC: row.SEVERITYDESC,
        COLTYPE: row.COLLISIONTYPE,
        PCOUNT: row.PERSONCOUNT,
        VCOUNT: row.VEHCOUNT,
        INJURY: row.INJURIES,
        SINJURY: row.SERIOUSINJURIES,
        DEAD: row.FATALITIES,
        DATETIME: row.INCDTTM,
        WEATHER: row.WEATHER,
        ROADCOND: row.ROADCOND,
        LIGHTCOND: row.LIGHTCOND
    };
}

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
    neighborhoodData = data;
    mapControl(neighborhoodData);
})
.catch(function(error) {
    console.log("Error");
    console.log(error);
})

d3.csv('../Collisions.csv', dataPreprocessor).then(function(dataset) {
    collisions = dataset;
    console.log(collsions)
});

var myStyle = {
    "color": "black",
    "stroke": "black",
    "weight": 1,
    "opacity": 0.5
};

// call map functions
function mapControl(neighborhoodData) {
    L.geoJson(neighborhoodData).addTo(map);

    L.geoJson(neighborhoodData, {style: myStyle}).addTo(map);

    let geojson = L.geoJson(neighborhoodData, {
        style: myStyle,
    }).addTo(map);
}