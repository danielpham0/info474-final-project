var curMonthRange = [3, 10]
var curPersonRange = [2, 6]
var dotMode = false
var curNeighborhood = "All_Neighborhoods"

// Global function called when select element is changed
function onNeighborhoodChanged() {
    var select = d3.select('#neighborhood_select').node();
    var zoom = 14
    // Get current value of select element
    n = select.options[select.selectedIndex].value.split("/");
    curNeighborhood = n[0]
    neighborhoodCenter = [parseFloat(n[1]),parseFloat(n[2])]
    if (curNeighborhood == "All_Neighborhoods") {
        zoom = 11
    }
    // on select go to that area
    map.setView(neighborhoodCenter, zoom);
    // TODO: Update chart here -- will need to handle value "all"
}

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

var neighborhoodSelect = d3.select("#neighborhood_select")

var backButton = d3.select('#back_button').style("margin", "10px")
    .on('click', function(){
        dotMode = false
        // TODO: Update chart here
        map.setView([47.6062, -122.3321], 11);
        neighborhoodSelect.property("value", "All_Neighborhoods/47.6062/-122.3321");
});

d3.json("neighborhoods.geojson")
  .then(function(neighborhoods) {
    // Set up neighborhood select
    let neighborhoodList = [...new Set(neighborhoods.features.map((feature) => {
        let n = feature.properties.nhood || feature.properties.name
        if (feature.properties.nhood && feature.properties.name) {
            n = feature.properties.nhood + "-" + feature.properties.name
        }
        let centerPoint = turf.center(feature).geometry.coordinates
        //adjust the values for center point
        if (n) return [n, centerPoint[1], centerPoint[0]]
    }))]
    neighborhoodList.unshift(["All Neighborhoods", 47.6062, -122.3321])
    neighborhoodSelect.selectAll("option").data(neighborhoodList)
        .enter().append("option").attr("value", function(n) {
            return n[0].replaceAll(' ', '_') + "/" + n[1] + "/" + n[2]
        }).text(function(n) {
                return n[0]
        })

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
    
    const labels = g.selectAll("text")
        .data(neighborhoods.features)
        .enter()
        .append("svg:text")

    
    // Listens to changes in map and calls a reset when necessary
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
                    if (d.properties.nhood && d.properties.name) {
                        d3.selectAll('.' + (d.properties.nhood + "-" + d.properties.name)
                            .replaceAll(' ', '_'))
                            .style("display", "block")
                    }
            })
            .on("mouseout", function(d){
                    d3.select(this).attr("fill", "black")
                    if (d.properties.nhood && d.properties.name) {
                        d3.selectAll('.' + (d.properties.nhood + "-" + d.properties.name)
                            .replaceAll(' ', '_'))
                            .style("display", "none")
                    }
            }).on("click", function(d) {
                dotMode = true
                let centerPoint = turf.center(d).geometry.coordinates
                map.setView([centerPoint[1], centerPoint[0]], 14);
                if (curNeighborhood) {
                    curNeighborhood = (d.properties.nhood + "-" + d.properties.name)
                        .replaceAll(' ', '_')
                    neighborhoodSelect.property("value", curNeighborhood 
                        + "/" + centerPoint[1] + "/" + centerPoint[0]);
                }
                //TODO: update map based on these properties
            });
        
        // add text scale for sizing up based on boundaries of the svg
        let textScale = d3.scaleLinear()
            .domain([0, 15000])
            .range([6, 24]);
        labels.text(function(d){
                return d.properties.nhood + "-" + d.properties.name;
            })
            .attr("x", function(d){
                return pathCreator.centroid(d)[0];
            })
            .attr("y", function(d){
                return  pathCreator.centroid(d)[1];
            })
            .attr("class", function(d) {
                if (d.properties.nhood && d.properties.name) {
                    return (d.properties.nhood + "-" + d.properties.name).replaceAll(' ', '_')
                }
            })
            .style("display", "none")
            .attr("font-size", Math.round(textScale(bottomRight[1])) + "pt")
            .attr("text-anchor","middle");
    }
  }).catch(function(error) {
    console.log(error)
});

// Kevin's stacked bar chart
var margin = {top: 10, right: 30, bottom: 20, left: 50},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg2 = d3.select("#collisionGraph1")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

d3.csv("test_collisions_n.csv").then(function(dataset) {
    // dataset = dataset.slice(0, 100);
    
    collisions = dataset.filter(item => item.X != "" || item.Y != "")
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
                        .attr("r", 3)
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

    // Kevin's stacked bar chart
    // Array of subgroups, which are the unique severity descriptions
    //var subgroups = d3.map(dataset, function(d) {return(d.SEVDESC)})
    //var subgroups = [...new Set(dataset.SEVERITYDESC)]
    //console.log(dataset.SEVDESC)

    var subgroups = [];
    for (let i = 0; i < dataset.length; i++) {
        if (subgroups.includes(dataset[i].SEVERITYDESC)) {
            subgroups.push();
        } else {
            subgroups.push(dataset[i].SEVERITYDESC);
        }
    }

    // List of groups = value of the first column called group -> I show them on the X axis
    // NEEDS FIX, how to get unique, individual collision types?
    //var groups = d3.map(dataset, function(d){return(d.COLTYPE)}).keys()
    var groups = [];
    for (let i = 0; i < dataset.length; i++) {
        if (groups.includes(dataset[i].COLLISIONTYPE)) {
            groups.push();
        } else {
            groups.push(dataset[i].COLLISIONTYPE);
        }
    }

    // Create counter for each of the severity descriptions.
    sev1_count = 0;
    sev2_count = 0;
    sev3_count = 0;
    sev4_count = 0;
    for (let i = 0; i < dataset.length; i++) {
        if (dataset[i].SEVERITYDESC == subgroups[0]) {
            sev1_count++;
        } else if (dataset[i].SEVERITYDESC == subgroups[1]) {
            sev2_count++;
        } else if (dataset[i].SEVERITYDESC == subgroups[2]) {
            sev3_count++;
        } else {
            sev4_count++;
        }
    }

    var subgroup_counts = [sev1_count, sev2_count, sev3_count, sev4_count];
    console.log(groups)
    console.log(subgroup_counts)

    // Add X axis
    // var x = d3.scaleBand()
    //     .domain(groups)
    //     .range([0, width])
    //     .padding([0.2])
    // svg2.append("g")
    //     .attr("transform", "translate(0," + height + ")")
    //     .call(d3.axisBottom(x).tickSizeOuter(0));
    
    //   // Add Y axis
    // var y = d3.scaleLinear()
    //   .domain([0, 60])
    //   .range([ height, 0 ]);
    //   svg2.append("g")
    //   .call(d3.axisLeft(y));
  
    // // color palette = one color per subgroup
    // var color = d3.scaleOrdinal()
    //   .domain(subgroups)
    //   .range(['#e41a1c','#377eb8','#4daf4a', '#BF40BF'])
  
    // //stack the data? --> stack per subgroup
    // var stackedData = d3.stack()
    //   .keys(subgroups)
    //   (dataset)
    // console.log(stackedData)
    // Show the bars
    // svg2.append("g")
    //   .selectAll("g")
    //   // Enter in the stack data = loop key per key = group per group
    //   .data(stackedData)
    //   .enter().append("g")
    //     .attr("fill", function(d) { return color(d.key); })
    //     .selectAll("rect")
    //     // enter a second time = loop subgroup per subgroup to add all rectangles
    //     .data(function(d) { return d; })
    //     .enter().append("rect")
    //       .attr("x", function(d) { return x(d.data.COLLISIONTYPE); })
    //       .attr("y", function(d) { return y(d[1]); })
    //       .attr("height", function(d) { return y(d[0]) - y(d[1]); })
    //       .attr("width",x.bandwidth())

    // DANIEL's SLIDERS
    // Month Slider
    var margin = 5,
        width = 400 - margin * 2,
        height = 20;
    var monthX = d3.scaleLinear()
        .domain([1,12])
        .range([0, width]);
    var monthBrush = d3.brushX()
        .extent([[0,0], [width,height]])
        .on("brush", brushed);
    var monthSvg = d3.select("#month_slider").append("svg")
        .attr("width", width + margin * 2)
        .attr("height", height + margin)
      .append("g")
        .attr("transform", "translate(" + margin + "," + margin + ")")
        .call(d3.axisBottom()
            .scale(monthX)
            .ticks(12));
    var monthBrushg = monthSvg.append("g")
        .attr("class", "monthBrush")
        .call(monthBrush)
    monthBrush.move(monthBrushg, curMonthRange.map(monthX));
    // Person Slider
    var personX = d3.scaleLinear()
        .domain([0,8])
        .range([0, width]);
    var personBrush = d3.brushX()
        .extent([[0,0], [width,height]])
        .on("brush", brushed);
    var personSvg = d3.select("#person_slider").append("svg")
        .attr("width", width + margin * 2)
        .attr("height", height + margin)
      .append("g")
        .attr("transform", "translate(" + margin + "," + margin + ")")
        .call(d3.axisBottom()
            .scale(personX)
            .ticks(5));
    var personBrushg = personSvg.append("g")
        .attr("class", "personBrush")
        .call(personBrush)
    personBrush.move(personBrushg, curPersonRange.map(personX));
    
    // How we handle changes in both
    // TODO: Add an update chart function here which takes those ranges into account
    // brush runs immediately so we can just call it here with curMonthRange and curPersonRange
    function brushed() {
        if ($(this).hasClass("monthBrush")) {
            var range = d3.brushSelection(this)
                .map(monthX.invert);
            d3.select("#month_span")
            .text(function(d, i) {
                return "Month Range: " + 
                    Math.round(range[0]) + ' to ' + Math.round(range[1])
            })
            curMonthRange = [Math.round(range[0]), Math.round(range[1])]
        }
        else if ($(this).hasClass("personBrush")) {
            var range = d3.brushSelection(this)
                .map(personX.invert);
            d3.select("#person_span")
                .text(function(d) {
                    return "Person Range: " +
                        Math.round(range[0]) + ' to ' + Math.round(range[1])
                })
            curPersonRange = [Math.round(range[0]), Math.round(range[1])]
        }
    }
});