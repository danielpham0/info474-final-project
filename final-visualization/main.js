// FINAL PROJECT VISUALIZATION: SEATTLE COLLISIONS
// DESIGNED & IMPLEMENTED BY DANIEL PHAM, KEVIN YIP & JONATHAN THOMAS

// INITIALIZE GLOBAL VARIABLES
// Initialize dataset structures
var dataset = []
var neighborhoodData = []
var neighborhoodList = []
var neighNameList = []
// Initialize interaction/filter variables
const ALL_NEIGHBORHOODS = "all_neighborhoods"
var curMonthRange = [3, 10]
var curPersonRange = [2, 6]
var dotMode = false
var dragMode = false
var curNeighborhood = ALL_NEIGHBORHOODS
var boundShift = [0,0]
// Initialize scale variables
var colorList = ["#de72fe", "#c7bad8", "#85ebfe", "#6e6089", "#9b4d31", "#297a1d", "#9052c0", "#5c75a5", "#698eba", "#d46222", "#6da095", "#b483bb", "#04d183", "#9bcdfe", "#2ffe8c", "#9d4279", "#c909aa", "#826cae", "#77787c", "#a96fb7", "#858f87", "#fd3b40", "#7fab7b", "#9e9edd", "#bba3be", "#f8b96c", "#7be553", "#c0e1ce", "#516e88", "#be0e5f", "#3957ff", "#d3fe14", "#c9080a", "#fec7f8", "#0b7b3e", "#0bf0e9", "#c203c8", "#fd9b39", "#888593", "#906407", "#98ba7f", "#fe6794", "#10b0ff", "#ac7bff", "#fee7c0", "#964c63", "#1da49c", "#0ad811", "#bbd9fd", "#fe6cfe", "#297192", "#d1a09c", "#78579e", "#81ffad", "#739400", "#ca6949", "#d9bf01", "#646a58", "#d5097e", "#bb73a9", "#ccf6e9", "#9cb4b6", "#b6a7d4", "#9e8c62", "#6e83c8", "#01af64", "#a71afd", "#cfe589", "#d4ccd1", "#fd4109", "#bf8f0e", "#2f786e", "#4ed1a5", "#d8bb7d", "#a54509", "#6a9276", "#a4777a", "#fc12c9", "#606f15", "#3cc4d9", "#f31c4e", "#73616f", "#f097c6", "#fc8772", "#92a6fe", "#875b44", "#699ab3", "#94bc19", "#7d5bf0", "#d24dfe", "#c85b74", "#68ff57", "#b62347", "#994b91", "#646b8c", "#977ab4", "#d694fd", "#c4d5b5", "#fdc4bd", "#1cae05", "#7bd972", "#e9700a", "#d08f5d", "#8bb9e1", "#fde945", "#a29d98", "#1682fb", "#9ad9e0", "#d6cafe", "#8d8328", "#b091a7", "#647579", "#1f8d11", "#e7eafd", "#b9660b", "#a4a644", "#fec24c", "#b1168c", "#188cc1", "#7ab297", "#4468ae", "#c949a6", "#d48295", "#eb6dc2", "#d5b0cb", "#ff9ffb", "#fdb082", "#af4d44", "#a759c4", "#a9e03a", "#0d906b", "#9ee3bd", "#5b8846", "#0d8995", "#f25c58", "#70ae4f", "#847f74", "#9094bb", "#ffe2f1", "#a67149", "#936c8e", "#d04907", "#c3b8a6", "#cef8c4", "#7a9293", "#fda2ab", "#2ef6c5", "#807242", "#cb94cc", "#b6bdd0", "#b5c75d", "#fde189", "#b7ff80", "#fa2d8e", "#839a5f", "#28c2b5", "#e5e9e1", "#bc79d8", "#7ed8fe", "#9f20c3", "#4f7a5b", "#f511fd", "#09c959", "#bcd0ce", "#8685fd", "#98fcff", "#afbff9", "#6d69b4", "#5f99fd", "#aaa87e", "#b59dfb", "#5d809d", "#d9a742", "#ac5c86", "#9468d5", "#a4a2b2", "#b1376e", "#d43f3d", "#05a9d1", "#c38375", "#24b58e", "#6eabaf", "#66bf7f", "#92cbbb", "#ddb1ee", "#1be895", "#c7ecf9", "#a6baa6", "#8045cd", "#5f70f1", "#a9d796", "#ce62cb", "#0e954d", "#a97d2f", "#fcb8d3", "#9bfee3", "#4e8d84", "#fc6d3f", "#7b9fd4", "#8c6165", "#72805e", "#d53762", "#f00a1b", "#de5c97", "#8ea28b", "#fccd95", "#ba9c57", "#b79a82", "#7c5a82", "#7d7ca4", "#958ad6", "#cd8126", "#bdb0b7", "#10e0f8", "#dccc69", "#d6de0f", "#616d3d", "#985a25", "#30c7fd", "#0aeb65", "#e3cdb4", "#bd1bee", "#ad665d", "#d77070", "#8ea5b8", "#5b5ad0", "#76655e", "#598100", "#86757e", "#5ea068", "#a590b8", "#c1a707", "#85c0cd", "#e2cde9", "#dcd79c", "#d8a882", "#b256f9", "#b13323", "#519b3b", "#dd80de", "#f1884b", "#74b2fe", "#a0acd2", "#d199b0", "#f68392", "#8ccaa0", "#64d6cb", "#e0f86a", "#42707a", "#75671b", "#796e87", "#6d8075", "#9b8a8d", "#f04c71", "#61bd29", "#bcc18f", "#fecd0f", "#1e7ac9", "#927261", "#dc27cf", "#979605", "#ec9c88", "#8c48a3", "#676769", "#546e64", "#8f63a2", "#b35b2d", "#7b8ca2", "#b87188", "#4a9bda", "#eb7dab", "#f6a602", "#cab3fe", "#ddb8bb", "#107959", "#885973", "#5e858e", "#b15bad", "#e107a7", "#2f9dad", "#4b9e83", "#b992dc", "#6bb0cb", "#bdb363", "#ccd6e4", "#a3ee94", "#9ef718", "#fbe1d9", "#a428a5", "#93514c", "#487434", "#e8f1b6", "#d00938", "#fb50e1", "#fa85e1", "#7cd40a", "#f1ade1", "#b1485d", "#7f76d6", "#d186b3", "#90c25e", "#b8c813", "#a8c9de", "#7d30fe", "#815f2d", "#737f3b", "#c84486", "#946cfe", "#e55432", "#a88674", "#c17a47", "#b98b91", "#fc4bb3", "#da7f5f", "#df920b", "#b7bbba", "#99e6d9", "#a36170", "#c742d8", "#947f9d", "#a37d93", "#889072", "#9b924c", "#23b4bc", "#e6a25f", "#86df9c", "#a7da6c", "#3fee03", "#eec9d8", "#aafdcb"]
// Preprocessor for data (not currently being used)
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

// INITIALIZE SVG'S AND VISUALIZATIONS
// Select and append leaflet map svg
var map = L.map('map').setView([47.6062, -122.3321], 11);
var tileLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png')
tileLayer.addTo(map)
var svg = d3.select(map.getPanes().overlayPane).append("svg"),
g = svg.append("g").attr("class", "leaflet-zoom-hide");
// Dot visualization svg
const overlay = d3.select(map.getPanes().overlayPane)
const svg1 = overlay.select('svg').attr("pointer-events", "auto")
// Kevin's stacked bar chart svg
var margin = {top: 220, right: 300, bottom: 50, left: 30},
    width = 900 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;
    padding = 100;
// append the svg object to the body of the page
var svg2 = d3.select("#collisionGraph1").style("margin-right", "20px") 
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.right + ")");

// READ AND HANDLE GEOJSON FOR NEIGHBORHOODS - initializes base layer of neighborhood boundaries
d3.json("neighborhoods.geojson")
  .then(function(neighborhoods) {
    // Note: Neighborhood names are "Neighborhood-Subneighborhood". 
    // If there are spaces, when we have a value, we replace those spaces with underscores.

    // Set up neighborhood select
    neighborhoodList = [...new Set(neighborhoods.features.map((feature) => {
        let n = getNeighName(feature.properties.nhood, feature.properties.name)
        neighNameList.push(getNeighValue(n))
        let centerPoint = turf.center(feature).geometry.coordinates
        //adjust the values for center point
        if (n) return [n, centerPoint[1], centerPoint[0]]
    }))]
    neighborhoodList.unshift(["All Neighborhoods", 47.6062, -122.3321])
    neighborhoodSelect.selectAll("option").data(neighborhoodList)
        .enter().append("option").attr("value", function(n) {
            // Should find a better way of doing the rounding thing, this will only work for this dataset
            // may need to recreate the CSV
            return getNeighValue(n[0]) + "/" + 
                Math.round(n[1] * 100000000) / 100000000 + "/" + Math.round(n[2] * 10000000) / 10000000
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
    // Creates label for each path
    const labels = g.selectAll("text")
        .data(neighborhoods.features)
        .enter()
        .append("svg:text")

    // Listens to changes in map and calls a reset when necessary
    map.on("viewreset", reset);
    // Init for the map
    reset();

    // Function that recreates the paths properly on zoom or any changes
    function reset() {
        // Bounds based on the neighborhood geojson and map
        bounds = pathCreator.bounds(neighborhoods);
        var topLeft = bounds[0],
        bottomRight = bounds[1];
        boundShift = topLeft
        // Updates chart to make sure boundaries are correct
        updateChart()
        //Adjusts width and height for the svg
        svg.attr("width", bottomRight[0] - topLeft[0])
            .attr("height", bottomRight[1] - topLeft[1])
            .style("left", topLeft[0] + "px")
            .style("top", topLeft[1] + "px");
        g.attr("transform", "translate(" + -topLeft[0] + "," 
            + -topLeft[1] + ")");
        
        // Initialize each path with its attributes
        areaPaths.attr("d", pathCreator)
            .attr('class', 'neighborhoodPath')
            .attr('fill-opacity', 0.3)
            .attr('stroke', 'black')
            .attr("z-index", 3000)
            .attr('stroke-width', 1)
            .on("mouseover", function(d){
                let fullName = getNeighName(d.properties.nhood, d.properties.name)
                d3.select(this).attr("fill", "red")
                d3.selectAll('.' + 
                    getNeighValue(fullName))
                    .style("display", "block")
                    .attr("x", d3.mouse(this)[0])
                    .attr("y", (d3.mouse(this)[1] - 10) +  "px")
            })
            .on("mousemove", function(d){
                let fullName = getNeighName(d.properties.nhood, d.properties.name)
                d3.select(this).attr("fill", "red")
                d3.selectAll('.' + 
                    getNeighValue(fullName))
                    .style("display", "block")
                    .attr("x", d3.mouse(this)[0])
                    .attr("y", (d3.mouse(this)[1] - 10) +  "px")
            })     
            .on("mouseout", function(d){
                let fullName = getNeighName(d.properties.nhood, d.properties.name)
                d3.select(this).attr("fill", "black")
                d3.selectAll('.' + 
                    getNeighValue(fullName))
                    .style("display", "none")
            }).on("click", function(d) {
                if (dragMode) {return}
                setMode(true)
                let centerPoint = turf.center(d).geometry.coordinates
                map.setView([centerPoint[1], centerPoint[0]], 14);
                if (curNeighborhood) {
                    let fullName = getNeighName(d.properties.nhood, d.properties.name)
                    curNeighborhood = getNeighValue(fullName)
                    neighborhoodSelect.property("value", curNeighborhood 
                        + "/" + Math.round(centerPoint[1] * 100000000) / 100000000 
                        + "/" + Math.round(centerPoint[0] * 10000000) / 10000000);
                }
                // update chart when a neighborhood is chosen to switch to dotMode
                updateChart()
            });
        
        // add text scale for sizing up based on boundaries of the svg
        let textScale = d3.scaleLinear()
            .domain([0, 15000])
            .range([6, 24]);
        labels.text(function(d){
                return getNeighName(d.properties.nhood, d.properties.name)
            })
            .attr("x", function(d){
                return pathCreator.centroid(d)[0];
            })
            .attr("y", function(d){
                return  pathCreator.centroid(d)[1];
            })
            .attr("class", function(d) {
                let fullName = getNeighName(d.properties.nhood, d.properties.name)
                return getNeighValue(fullName)
            })
            .style("display", "none")
            .attr("font-size", Math.round(textScale(bottomRight[1])) + "pt")
            .attr("text-anchor","middle");
    }
  }).catch(function(error) {
    console.log(error)
});

// LOAD COLLISIONS DATA AND UPDATE VISUALIZATION WITH MAP AND BARCHARTS
d3.csv("collisions_n.csv").then(function(collection) {
    // Initialize the map chart
    dataset = collection
    updateChart()

    // INITIALIZE ANALYTICS FOR CARD
    // calculate general analytics for the collisions
    let maxW = 0, wDict = {}, W = ''
    let maxC = 0, cDict = {}, C = ''
    for (col of collection) {
        if (!cDict.hasOwnProperty(col.ROADCOND)) {
            cDict[col.ROADCOND] = 0 }
        cDict[col.ROADCOND]++;
        if (cDict[col.ROADCOND] > maxC) {
            maxC = cDict[col.ROADCOND]
            C = col.ROADCOND }
        if (!wDict.hasOwnProperty(col.WEATHER))
            wDict[col.WEATHER] = 0
        wDict[col.WEATHER]++;
        if (wDict[col.WEATHER] > maxW) {
            maxW = wDict[col.WEATHER]
            W = col.WEATHER }
    }
    // Initialize analytics card wit hinformation
    d3.select('#analytics_loc').text("Neighborhood: All Collisions (Unfiltered)")
    d3.select('#analytics_num').text("Collisions: " + collection.length)
    d3.select('#analytics_sev').text("Most Common Road Condition: " + C
        + " (" + Math.round(maxC/collection.length*100) +"%)")
    d3.select('#analytics_cond').text("Most Common Weather: " + W 
        + " (" + Math.round(maxW/collection.length*100) +"%)")
    map.setView([47.6062, -122.3321], 11);
    d3.select('#analytics_loc_btn').on('click', function(){
        map.setView([47.6062, -122.3321], 11);
    })
});


// UPDATE CHART FUNCTION BASED ON CHANGES IN INTERACTIVE VARIABLES TRACKED GLOBALLY
function updateChart() {
    // INITIALIZE DATA BASED ON UPDATES
    // necessary for size scale of bubbles
    let maxCollisions = 0
    // filters through collisions based on filters
    var filteredCollisions = dataset.filter(function(d) {
        let date = new Date(d.INCDTTM)
        let month = date.getMonth()
        return d.PERSONCOUNT >= curPersonRange[0] && d.PERSONCOUNT <= curPersonRange[1] &&
            month >= curMonthRange[0] && month <= curMonthRange[1]
    })
    // generates collision counts in each neighborhood dependent on that filtered data
    var neighborhoodColCounts = filteredCollisions.reduce((res, col) => {
        var nName = getNeighValue(col.NEIGHBORHOOD)
        if (!res.hasOwnProperty(nName)) {
            // neighborhoodList.push(nName)
            res[nName] = {'COL_COUNT': 0,
                'X': col.NX,
                'Y': col.NY,
                'WEATHER': {},
                'ROADCOND': {}
            };
        }
        if (!res[nName]['WEATHER'].hasOwnProperty(col.WEATHER)) {
            res[nName]['WEATHER'][col.WEATHER] = 0
        }
        if (!res[nName]['ROADCOND'].hasOwnProperty(col.ROADCOND)) {
            res[nName]['ROADCOND'][col.ROADCOND] = 0
        }
        maxCollisions = Math.max(res[nName]['COL_COUNT'], maxCollisions)
        res[nName]['COL_COUNT']++;
        res[nName]['WEATHER'][col.WEATHER]++;
        res[nName]['ROADCOND'][col.ROADCOND]++;
        return res;
    }, {});
    // reformat collision counts to be readable by d3
    neighborhoodData = Object.keys(neighborhoodColCounts).map(k => {
        let cur = neighborhoodColCounts[k]
        return {'NEIGHBORHOOD': k, 'COL_COUNT': cur['COL_COUNT'], 'X': cur['X'], 'Y': cur['Y'], 
            'WEATHER': cur['WEATHER'], 'ROADCOND': cur['ROADCOND']};});
    // use the dataset we require for dot mode
    var collisions = !dotMode ? neighborhoodData : filteredCollisions

    // CREATE SCALES FOR EACH DOT ATTRIBUTE
    // radius of dot based on number of collisions
    var radius = d3.scaleLinear()
        .domain([0, maxCollisions])
        .range([4, 13]);
    // opacity of dot based on number of people involved
    var opacity = d3.scaleLinear()
        .domain([0,8])
        .range([ .8, 1]) 
    // color of dot based on neighborhood
    var colorScale = d3.scaleOrdinal()
        .domain(neighNameList)
        .range(colorList)
    // CREATE AND UPDATE THE CIRCLE SVG's
    // create all the dots
    const Dots = svg1.selectAll('circle')
                    .attr("class", "Dots")
                    .data(collisions)
                    .join('circle')
                        .attr("id", "dotties")
                        .attr("fill", function(d) {return colorScale(getNeighValue(d.NEIGHBORHOOD))}) // color based on neighborhood
                        .attr("opacity", function(d) {
                            if(dotMode) {return opacity(d.PERSONCOUNT)} // opacity based on number of people involved
                            return 1})
                        .attr("stroke", "white")
                        .attr("cx", d => map.latLngToLayerPoint([d.Y,d.X]).x - boundShift[0])
                        .attr("cy", d => map.latLngToLayerPoint([d.Y,d.X]).y - boundShift[1])
                        .attr("r", function(d) {
                            if(dotMode) {return 4}
                            return radius(d.COL_COUNT)}) // radius based on collisions in that neighborhood
                        .on('mouseover', function() { // handle when mouse is over dot
                            d3.select(this).transition() 
                              .duration('120')
                              .attr("fill", "white")
                              .attr('r', 10) 
                          })
                          .on('mouseout', function(d) { //reverse the action based on when we mouse off the the circle
                            d3.select(this).transition()
                              .duration('152')
                              .attr("fill", function(d) {return colorScale(getNeighValue(d.NEIGHBORHOOD))}) 
                              .attr('r', function(d) {
                                if(dotMode) {return 4}
                                return radius(d.COL_COUNT) })
                          })
                          .on('click', function(d) {
                            if(!dotMode) {
                                // NEIGHBORHOOD
                                let n = d.NEIGHBORHOOD.toLowerCase().split(/_|-/)
                                    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                                    .join(' ');                  
                                d3.select('#analytics_loc').text("Neighborhood: " + n)
                                d3.select('#analytics_num').text("Collisions: " + d.COL_COUNT)
                                // ROAD CONDITION ANALYTICS
                                let maxC = 0, C = ''
                                for (k of Object.keys(d.ROADCOND)) {
                                    if (d.ROADCOND[k] > maxC) {
                                        maxC = d.ROADCOND[k]
                                        C = k }
                                }
                                d3.select('#analytics_sev').text("Most Common Road Condition: " + C
                                    + " (" + Math.round(maxC/d.COL_COUNT*100) +"%)")
                                // WEATHER ANALYTICS
                                let maxW = 0, W = ''
                                for (k of Object.keys(d.WEATHER)) {
                                    if (d.WEATHER[k] > maxW) {
                                        maxW = d.WEATHER[k]
                                        W = k }
                                }
                                d3.select('#analytics_cond').text("Most Common Weather: " + W 
                                    + " (" + Math.round(maxW/d.COL_COUNT*100) +"%)")
                                // SETS LOCATION BUTTON
                                d3.select('#analytics_loc_btn').on('click', function() {
                                    map.setView([d.Y, d.X], 16);
                                })
                                // Update other parts of the vis on click
                                neighborhoodSelect.property("value", d.NEIGHBORHOOD
                                        + "/" + d.Y + "/" + d.X);
                                curNeighborhood = d.NEIGHBORHOOD
                                updateChart()
                                
                            } else {
                                let l = d.LOCATION.toLowerCase().split(' ')
                                    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                                    .join(' ');     
                                d3.select('#analytics_loc').text("Address: " + l)
                                d3.select('#analytics_num').text("People Involved: " + d.PERSONCOUNT)
                                d3.select('#analytics_sev').text("Severity: " + d.SEVERITYDESC)
                                d3.select('#analytics_cond').text("Weather: " + d.WEATHER)
                                d3.select('#analytics_loc_btn').on('click', function(){
                                    map.setView([d.Y, d.X], 18);
                                })
                                // Update other parts of the vis on click
                                neighborhoodSelect.property("value", getNeighValue(d.NEIGHBORHOOD)
                                        + "/" + d.NY + "/" + d.NX);
                                curNeighborhood = getNeighValue(d.NEIGHBORHOOD)
                                updateChart()
                            }
                          });

    // calculate general analytics for the filtered collisions
    let maxW = 0, wDict = {}, W = ''
    let maxC = 0, cDict = {}, C = ''
    for (col of filteredCollisions) {
        if (!cDict.hasOwnProperty(col.ROADCOND)) {
            cDict[col.ROADCOND] = 0 }
        cDict[col.ROADCOND]++;
        if (cDict[col.ROADCOND] > maxC) {
            maxC = cDict[col.ROADCOND]
            C = col.ROADCOND }
        if (!wDict.hasOwnProperty(col.WEATHER))
            wDict[col.WEATHER] = 0
        wDict[col.WEATHER]++;
        if (wDict[col.WEATHER] > maxW) {
            maxW = wDict[col.WEATHER]
            W = col.WEATHER }
    }
    d3.select('#analytics_all_btn').on('click', function(){
        d3.select('#analytics_loc').text("Neighborhood: All Neighborhoods")
        d3.select('#analytics_num').text("Collisions: " + filteredCollisions.length)
        d3.select('#analytics_sev').text("Most Common Road Condition: " + C
            + " (" + Math.round(maxC/filteredCollisions.length*100) +"%)")
        d3.select('#analytics_cond').text("Most Common Weather: " + W 
            + " (" + Math.round(maxW/filteredCollisions.length*100) +"%)")
        map.setView([47.6062, -122.3321], 11);
        d3.select('#analytics_loc_btn').on('click', function(){
            map.setView([47.6062, -122.3321], 11);
        })
        // Update other parts of the vis on click
        neighborhoodSelect.property("value", 'all_neighborhoods'
            + "/" + 47.6062 + "/" + -122.3321);
        curNeighborhood = 'all_neighborhoods'
        updateChart()
    })

    // STACKED BAR CHART
    // filter to neighborhood
    // WHILE WE WOULD WANT TO REMOVE THIS IN A MORE OPTIMAL MANNER THIS WAS THE ONLY SOLUTION WE COULD COME UP WITH
    // Effectively the issue is that we have two layers of data to update as well as the X and Y axis, it is much less
    // complicated to redraw, which is all we can really do with this due date.
    var neighFilteredCols = filteredCollisions.filter(function(d) {
        return (getNeighValue(d.NEIGHBORHOOD) == curNeighborhood || 
                curNeighborhood == ALL_NEIGHBORHOODS || curNeighborhood == ' ')
    })
    svg2.selectAll('*').remove();
    // Count severities for each collision type
    d3.select("#tempBarchartTitle").text("Collision Type vs. Severity Description for: " + curNeighborhood.toLowerCase().split(/_|-/)
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' '))
    var collisionTypeCounts = neighFilteredCols.reduce((res, col) => {
        var collType = col.COLLISIONTYPE;
        if (collType == '') collType = 'Unlisted'
        if (!res.hasOwnProperty(collType)) {
            res[collType] = {
                "Injury Collision": 0,
                "Unknown": 0,
                "Property Damage Only Collision": 0,
                "Serious Injury Collision": 0
            }
        }
        res[collType][col.SEVERITYDESC]++;
        return res;
    }, {});

    // reformat the collision type data to be readable by d3
    let totalColMax = 0
    collTypeData = Object.keys(collisionTypeCounts).map(k => {
        let cur = collisionTypeCounts[k]
        let curTotal = cur["Injury Collision"] + 
            cur["Property Damage Only Collision"] + 
            cur["Serious Injury Collision"] + cur["Unknown"]
        totalColMax = Math.max(totalColMax, curTotal)
        return{"COLLISION_TYPE": k, "INJURY": cur["Injury Collision"], 
            "PROPERTY_DAMAGE": cur["Property Damage Only Collision"], 
            "SERIOUS_INJURY": cur["Serious Injury Collision"],
            "UNKNOWN": cur["Unknown"], }
    });

    // groups: collision type, subgroups: severity count
    var subgroups = ["INJURY", "UNKNOWN", "PROPERTY_DAMAGE", "SERIOUS_INJURY"]
    var groups = collTypeData.map(function(d){
            return d.COLLISION_TYPE })

    // Add X axis
    var x = d3.scaleBand()
        .domain(groups)
        .range([25, width+250])
        .padding([.35])
        svg2.append("g")
        .attr("transform", "translate(0," + -60 + ")")
        .call(d3.axisBottom(x).tickSizeOuter(0));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, totalColMax + 5 - totalColMax%5])
        .range([ height, -200]);
        svg2.append("g")
        .attr("transform", "translate(" + 25 + ", -80)")
        .call(d3.axisLeft(y));

    // color palette = one color per subgroup
    var color = d3.scaleOrdinal()
        .domain(subgroups)
        .range(['#ffcc00','#ff9966','#99cc33', '#cc3300'])

    //stack the data? --> stack per subgroup
    var stackedData = d3.stack()
        .keys(subgroups)
        (collTypeData)

    // Show the bars
    var bars = svg2.append("g")
        .selectAll("g")
        // Enter in the stack data = loop key per key = group per group
        .data(stackedData)
        .enter().append("g")
        .attr("fill", function(d) { return color(d.key); })
        .selectAll("rect")
        // enter a second time = loop subgroup per subgroup to add all rectangles
    // Tooltip initialzied and hidden
    var tooltip = d3.select("#collisionGraph1")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "8px")
        .style("padding", "8px")
    bars.data(function(d) { return d; })
        .enter().append("rect")
        .attr("x", function(d) { return x(d.data.COLLISION_TYPE); })
        .attr("y", function(d) { return y(d[1]) -80; })
        .attr("height", function(d) { return y(d[0]) - y(d[1]); })
        .attr("width", x.bandwidth())
        .on("mouseover", function(d) {
            var subgroupName = d3.select(this.parentNode).datum().key;
            var subgroupValue = d.data[subgroupName];
            tooltip
                .html("<div>Severity: " + subgroupName + "</div><br>" + "<div>Number of Collisions: " + subgroupValue + "</div>")
                .style("opacity", 1)
                .style("left", "670px")
                .style("bottom", "235px")
        })
        .on("mouseleave", function(d) {
            tooltip
            .style("opacity", 0)
        })

    var legend = svg2.append('g')
        .attr('class', 'legend')
        .attr('transform', 'translate(' + 12 + ', 0)');

    legend.selectAll('rect')
        .data(stackedData)
        .enter()
        .append('rect')
        .attr('x', width + padding + 150)
        .attr('y', function(d, i) {
            return (i + 9) * -18;
        })
        .attr('width', 12)
        .attr('height', 12)
        .attr('fill', function(d, i){
            return color(d.key);
        });
    
    legend.selectAll('text')
        .data(subgroups)
        .enter()
        .append('text')
        .text(function(d) {
            return d;
        })
        .attr('x', width + padding + 168)
        .attr('y', function(d, i){
            return (i + 9) * -18;
        })
        .attr('text-anchor', 'start')
        .attr('alignment-baseline', 'hanging');

    svg2.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height - 30)
        .text("Collision Types");
    
    svg2.append("text")
        .attr("class", "y label")
        .attr("y", -25)
        .attr("x", padding)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Number of Collisions");
}

// INTERACTIVE TOOLS
// Button to return to general view - goes back to center
var backButton = d3.select('#back_button').style("margin", "10px")
    .on('click', function(){
        setMode(false)
        map.setView([47.6062, -122.3321], 11);
        neighborhoodSelect.property("value", ALL_NEIGHBORHOODS + "/47.6062/-122.3321");
        curNeighborhood = ALL_NEIGHBORHOODS
        updateChart()
});
// Select neighborhood item - used to swap between neighborhoods
var neighborhoodSelect = d3.select("#neighborhood_select")
// Callback function for when a neighborhood has been changed - either selected with select item or on map
function onNeighborhoodChanged() {
    var select = d3.select('#neighborhood_select').node();
    var zoom = 14
    // Get current value of select element
    n = select.options[select.selectedIndex].value.split("/");
    curNeighborhood = getNeighValue(n[0])
    neighborhoodCenter = [parseFloat(n[1]),parseFloat(n[2])]
    setMode(true)
    if (curNeighborhood == ALL_NEIGHBORHOODS) {
        zoom = 11
        setMode(false)
    }
    // on select go to that area
    map.setView(neighborhoodCenter, zoom);
    // update the chart so that dots are translated accordingly
    updateChart()
}
// Swaps between which mode we want the chart to be in dot vs bubble
function onModeChanged() {
    var mode_switch = d3.select('#mode_switch');
    dotMode = mode_switch.property('checked')
    updateChart()
}
// Swaps between whether we want to drag to explore the map or select to explore
function onDragChanged() {
    var drag_switch = d3.select('#drag_switch');
    dragMode = drag_switch.property('checked')
    if (dragMode) {
        d3.selectAll('.neighborhoodPath').attr("pointer-events", "none")
    } else {
        d3.selectAll('.neighborhoodPath').attr("pointer-events", "auto")
    }
}
// Month Slider - allows us to adjust which months we're filtering over
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
// Person Slider - allows us to adjust which number of people in the accident we're filtering over
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
        .ticks(8));
    var personBrushg = personSvg.append("g")
    .attr("class", "personBrush")
    .call(personBrush)
personBrush.move(personBrushg, curPersonRange.map(personX));
// How we handle changes in both
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
        updateChart()
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
        updateChart()
    }
}

// HELPER FUNCTIONS
// returns correctly formatted neighborhood name based on properties of the object
function getNeighName(dNhood, dName) {
    let n = dNhood|| dName
    if (dNhood  && dName) { return dNhood + "-" + dName }
    return n
}
// returns correctly formatted neighborhood name for values, eliminating spaces and making items uniform
function getNeighValue(neighborhoodName) {
    return neighborhoodName.replaceAll(' ', '_').toLowerCase()
}
// sets the mode of the switch and dotMode given a boolean for the map mode
function setMode(mode) {
    dotMode = mode
    var mode_switch = d3.select('#mode_switch');
    mode_switch.property('checked', mode)
}