var curMonthRange = [3, 10]
var curPersonRange = [2, 6]
var dotMode = false
var curNeighborhood = "All_Neighborhoods"
var colorList = ["#de72fe", "#c7bad8", "#85ebfe", "#6e6089", "#9b4d31", "#297a1d", "#9052c0", "#5c75a5", "#698eba", "#d46222", "#6da095", "#b483bb", "#04d183", "#9bcdfe", "#2ffe8c", "#9d4279", "#c909aa", "#826cae", "#77787c", "#a96fb7", "#858f87", "#fd3b40", "#7fab7b", "#9e9edd", "#bba3be", "#f8b96c", "#7be553", "#c0e1ce", "#516e88", "#be0e5f", "#3957ff", "#d3fe14", "#c9080a", "#fec7f8", "#0b7b3e", "#0bf0e9", "#c203c8", "#fd9b39", "#888593", "#906407", "#98ba7f", "#fe6794", "#10b0ff", "#ac7bff", "#fee7c0", "#964c63", "#1da49c", "#0ad811", "#bbd9fd", "#fe6cfe", "#297192", "#d1a09c", "#78579e", "#81ffad", "#739400", "#ca6949", "#d9bf01", "#646a58", "#d5097e", "#bb73a9", "#ccf6e9", "#9cb4b6", "#b6a7d4", "#9e8c62", "#6e83c8", "#01af64", "#a71afd", "#cfe589", "#d4ccd1", "#fd4109", "#bf8f0e", "#2f786e", "#4ed1a5", "#d8bb7d", "#a54509", "#6a9276", "#a4777a", "#fc12c9", "#606f15", "#3cc4d9", "#f31c4e", "#73616f", "#f097c6", "#fc8772", "#92a6fe", "#875b44", "#699ab3", "#94bc19", "#7d5bf0", "#d24dfe", "#c85b74", "#68ff57", "#b62347", "#994b91", "#646b8c", "#977ab4", "#d694fd", "#c4d5b5", "#fdc4bd", "#1cae05", "#7bd972", "#e9700a", "#d08f5d", "#8bb9e1", "#fde945", "#a29d98", "#1682fb", "#9ad9e0", "#d6cafe", "#8d8328", "#b091a7", "#647579", "#1f8d11", "#e7eafd", "#b9660b", "#a4a644", "#fec24c", "#b1168c", "#188cc1", "#7ab297", "#4468ae", "#c949a6", "#d48295", "#eb6dc2", "#d5b0cb", "#ff9ffb", "#fdb082", "#af4d44", "#a759c4", "#a9e03a", "#0d906b", "#9ee3bd", "#5b8846", "#0d8995", "#f25c58", "#70ae4f", "#847f74", "#9094bb", "#ffe2f1", "#a67149", "#936c8e", "#d04907", "#c3b8a6", "#cef8c4", "#7a9293", "#fda2ab", "#2ef6c5", "#807242", "#cb94cc", "#b6bdd0", "#b5c75d", "#fde189", "#b7ff80", "#fa2d8e", "#839a5f", "#28c2b5", "#e5e9e1", "#bc79d8", "#7ed8fe", "#9f20c3", "#4f7a5b", "#f511fd", "#09c959", "#bcd0ce", "#8685fd", "#98fcff", "#afbff9", "#6d69b4", "#5f99fd", "#aaa87e", "#b59dfb", "#5d809d", "#d9a742", "#ac5c86", "#9468d5", "#a4a2b2", "#b1376e", "#d43f3d", "#05a9d1", "#c38375", "#24b58e", "#6eabaf", "#66bf7f", "#92cbbb", "#ddb1ee", "#1be895", "#c7ecf9", "#a6baa6", "#8045cd", "#5f70f1", "#a9d796", "#ce62cb", "#0e954d", "#a97d2f", "#fcb8d3", "#9bfee3", "#4e8d84", "#fc6d3f", "#7b9fd4", "#8c6165", "#72805e", "#d53762", "#f00a1b", "#de5c97", "#8ea28b", "#fccd95", "#ba9c57", "#b79a82", "#7c5a82", "#7d7ca4", "#958ad6", "#cd8126", "#bdb0b7", "#10e0f8", "#dccc69", "#d6de0f", "#616d3d", "#985a25", "#30c7fd", "#0aeb65", "#e3cdb4", "#bd1bee", "#ad665d", "#d77070", "#8ea5b8", "#5b5ad0", "#76655e", "#598100", "#86757e", "#5ea068", "#a590b8", "#c1a707", "#85c0cd", "#e2cde9", "#dcd79c", "#d8a882", "#b256f9", "#b13323", "#519b3b", "#dd80de", "#f1884b", "#74b2fe", "#a0acd2", "#d199b0", "#f68392", "#8ccaa0", "#64d6cb", "#e0f86a", "#42707a", "#75671b", "#796e87", "#6d8075", "#9b8a8d", "#f04c71", "#61bd29", "#bcc18f", "#fecd0f", "#1e7ac9", "#927261", "#dc27cf", "#979605", "#ec9c88", "#8c48a3", "#676769", "#546e64", "#8f63a2", "#b35b2d", "#7b8ca2", "#b87188", "#4a9bda", "#eb7dab", "#f6a602", "#cab3fe", "#ddb8bb", "#107959", "#885973", "#5e858e", "#b15bad", "#e107a7", "#2f9dad", "#4b9e83", "#b992dc", "#6bb0cb", "#bdb363", "#ccd6e4", "#a3ee94", "#9ef718", "#fbe1d9", "#a428a5", "#93514c", "#487434", "#e8f1b6", "#d00938", "#fb50e1", "#fa85e1", "#7cd40a", "#f1ade1", "#b1485d", "#7f76d6", "#d186b3", "#90c25e", "#b8c813", "#a8c9de", "#7d30fe", "#815f2d", "#737f3b", "#c84486", "#946cfe", "#e55432", "#a88674", "#c17a47", "#b98b91", "#fc4bb3", "#da7f5f", "#df920b", "#b7bbba", "#99e6d9", "#a36170", "#c742d8", "#947f9d", "#a37d93", "#889072", "#9b924c", "#23b4bc", "#e6a25f", "#86df9c", "#a7da6c", "#3fee03", "#eec9d8", "#aafdcb"]

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
    // the CSV has been prefiltered and cut down for testing
    // dataset = dataset.slice(0, 100);
    // collisions = dataset.filter(item => item.X != "" || item.Y != "")
    let neighborhoods = []
    // COUNTS COLLISIONS FOR NEIGHBORHOOD FOR A PLOT
    var neighborhoodColCounts = dataset.reduce((res, col) => {
        var nName = col.NEIGHBORHOOD 
        if (!res.hasOwnProperty(nName)) {
            neighborhoods.push(nName)
            res[nName] = {'COL_COUNT': 0,
                'X': col.NX,
                'Y': col.NY
            };
            res[nName]['X'] = col.NX
            res[nName]['Y'] = col.NY
        }
        res[nName]['COL_COUNT']++;
        return res;
    }, {});
    neighborhoodColCounts = Object.keys(neighborhoodColCounts).map(k => {
        let cur = neighborhoodColCounts[k]
        return {'NEIGHBORHOOD': k, 'COL_COUNT': cur['COL_COUNT'], 'X': cur['X'], 'Y': cur['Y']};});
    dotMode = true
    collisions = dotMode ? neighborhoodColCounts : dataset
    let points = collisions.reduce((res, col) => {
        res.push([col.Y, col.X])
        return res
    }, [])
    // ATTEMPT AT SHIFTING THE MAP PROPERLY DOES NOT WORK ATM
    let bounds = new L.LatLngBounds(points)
    console.log(bounds)
    map.fitBounds(bounds)
    
    // radius of dot based on number of collisions
    var radius = d3.scaleLinear()
        .domain([0, 10])
        .range([3, 10]);
    // opacity of dot based on number of people involved
    var opacity = d3.scaleLinear()
        .domain([1,3])
        .range([ .8, 1]) 
    // color of dot based on neighborhood
    var color = d3.scaleOrdinal()
        .domain(neighborhoods)
        .range(colorList)
    
    const overlay = d3.select(map.getPanes().overlayPane)
    const svg1 = overlay.select('svg').attr("pointer-events", "auto")
    const Dots = svg1.selectAll('circle')
                    .attr("class", "Dots")
                    .data(collisions)
                    .join('circle')
                        .attr("id", "dotties")
                        .attr("fill", function(d) {return color(d.NEIGHBORHOOD)}) 
                        .attr("opacity", function(d) {
                            if(dotMode) {return 1}
                            return opacity(d.PERSONCOUNT)})
                        .attr("stroke", "black")
                        //Leaflet has to take control of projecting points. Here we are feeding the latitude and longitude coordinates to
                        //leaflet so that it can project them on the coordinates of the view. Notice, we have to reverse lat and lon.
                        //Finally, the returned conversion produces an x and y point. We have to select the the desired one using .x or .y
                        .attr("cx", d => map.latLngToLayerPoint([d.Y,d.X]).x)
                        .attr("cy", d => map.latLngToLayerPoint([d.Y,d.X]).y)
                        .attr("r", function(d) {
                            if(dotMode) {return radius(d.COL_COUNT)}
                            return 4 })
                        .on('mouseover', function() { //function to add mouseover event
                            d3.select(this).transition() //D3 selects the object we have moused over in order to perform operations on it
                              .duration('150') //how long we are transitioning between the two states (works like keyframes)
                              .attr("fill", "red") //change the fill
                              .attr('r', 10) //change radius
                          })
                          .on('mouseout', function() { //reverse the action based on when we mouse off the the circle
                            d3.select(this).transition()
                              .duration('150')
                              .attr("fill", function(d) {return color(d.NEIGHBORHOOD)}) 
                              .attr('r', function(d) {
                                if(dotMode) {return radius(d.COL_COUNT)}
                                return 4 })
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