var map = L.map('map').setView([47.6062, -122.3321], 11);
var tileLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png')
tileLayer.addTo(map)

var svg = d3.select(map.getPanes().overlayPane).append("svg"),
g = svg.append("g").attr("class", "leaflet-zoom-hide");

d3.json("neighborhoods.geojson")
  .then(function(neighborhoods){
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
  });;