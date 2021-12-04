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

var svg = d3.select(map.getPanes().overlayPane).append("svg"),
g = svg.append("g").attr("class", "leaflet-zoom-hide");

d3.json("neighborhoods.geojson")
  .then(function(neighborhoods) {
    // Used to draw SVG paths alongside Leaflet
    const projectPoint = function(x, y) {
        const point = map.latLngToLayerPoint(new L.LatLng(y, x))
        this.stream.point(point.x, point.y)
    }
    // Creates the projections and paths using that initial function
    const projection = d3.geoTransform({point: projectPoint})
    const pathCreator= d3.geoPath().projection(projection);
    
    // Creates a path for each feature in the geoJson
    const areaPaths = g.selectAll('path')
        .data(neighborhoods.features)
        .join('path')
        
        // Listends to changes in map and calls a reset when necessary
        map.on("viewreset", reset);

        // Init for the map
        reset();

        // Function that recreates the paths properly
        function reset() {
            // Bounds based on the neighborhood geojson and map
            bounds = pathCreator.bounds(neighborhoods);
            var topLeft = bounds[0],
                bottomRight = bounds[1];
            
            //Adjusts width and height for the svg
            svg.attr("width", bottomRight[0] - topLeft[0])
                .attr("height", bottomRight[1] - topLeft[1])
                .style("left", topLeft[0] + "px")
                .style("top", topLeft[1] + "px");
            g.attr("transform", "translate(" + -topLeft[0] + "," 
                + -topLeft[1] + ")");

            // Initialize each path with its attributes
            areaPaths.attr("d", pathCreator)
                .attr('fill-opacity', 0.3)
                .attr('stroke', 'black')
                .attr("z-index", 3000)
                .attr('stroke-width', 1)
                .on("mouseover", function(d){
                            d3.select(this).attr("fill", "red")
                        })
                .on("mouseout", function(d){
                            d3.select(this).attr("fill", "black")
                        });
        } 
}).catch(function(error) {
    console.log(error)
});

d3.csv("../Collisions 2.csv").then(function(dataset) {
    dataset = dataset.slice(0, 10);
    
    collisions = dataset.filter(item => item.X != "" || item.Y != "")
    collisions.forEach(element => console.log(element));
    console.log(collisions[0])
    const overlay = d3.select(map.getPanes().overlayPane)
    const svg1 = overlay.select('svg').attr("pointer-events", "auto")
    
    const Dots = svg1.selectAll('circle')
                    .attr("class", "Dots")
                    .data(collisions)
                    .join('circle')
                        .attr("id", "dotties")
                        .attr("fill", "steelblue") 
                        .attr("stroke", "black")
                        //Leaflet has to take control of projecting points. Here we are feeding the latitude and longitude coordinates to
                        //leaflet so that it can project them on the coordinates of the view. Notice, we have to reverse lat and lon.
                        //Finally, the returned conversion produces an x and y point. We have to select the the desired one using .x or .y
                        .attr("cx", d => map.latLngToLayerPoint([d.Y,d.X]).x)
                        .attr("cy", d => map.latLngToLayerPoint([d.Y,d.X]).y)
                        .attr("r", 5)
                        .on('mouseover', function() { //function to add mouseover event
                            d3.select(this).transition() //D3 selects the object we have moused over in order to perform operations on it
                              .duration('150') //how long we are transitioning between the two states (works like keyframes)
                              .attr("fill", "red") //change the fill
                              .attr('r', 10) //change radius
                          })
                          .on('mouseout', function() { //reverse the action based on when we mouse off the the circle
                            d3.select(this).transition()
                              .duration('150')
                              .attr("fill", "steelblue")
                              .attr('r', 5)
                          });

    const update = () => Dots
        .attr("cx", d => map.latLngToLayerPoint([d.Y,d.Y]).x)
        .attr("cy", d => map.latLngToLayerPoint([d.Y,d.Y]).y)
  
    map.on("zoomed", update)
});

