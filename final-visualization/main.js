// Global function called when select element is changed
function onFiltersChanged() {
    var select = d3.select('#categorySelect').node();
    // Get current value of select element
    var category = select.options[select.selectedIndex].value;
    // Update chart with the selected category of letters
    updateChart(category, getRange());
}

// recall that when data is loaded into memory, numbers are loaded as strings
// this function helps convert numbers into string during data preprocessing
function dataPreprocessor(row) {
    return {
        letter: row.letter,
        frequency: +row.frequency
    };
}

var svg = d3.select('svg');

// Get layout parameters
var svgWidth = +svg.attr('width');
var svgHeight = +svg.attr('height');

var padding = {t: 60, r: 40, b: 30, l: 40};

// Compute chart dimensions
var chartWidth = svgWidth - padding.l - padding.r;
var chartHeight = svgHeight - padding.t - padding.b;

// Compute the spacing for bar bands based on all 26 letters
var barBand = chartHeight / 26;
var barHeight = barBand * 0.7;

// Create a group element for appending chart elements
var chartG = svg.append('g')
    .attr('transform', 'translate('+[padding.l, padding.t]+')');

// A map with arrays for each category of letter sets
var lettersMap = {
    'all-letters': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
    'only-consonants': 'BCDFGHJKLMNPQRSTVWXZ'.split(''),
    'only-vowels': 'AEIOUY'.split('')
};
d3.csv('letter_freq.csv', dataPreprocessor).then(function(dataset) {
    // Create global variables here and intialize the chart
    letters = dataset;
    maxFrequency = Math.max(...letters.map((element) => {return element['frequency']}))
    xScale = d3.scaleLinear().domain([0, maxFrequency]).range([0,chartWidth])
    // **** Your JavaScript code goes here ****
    var xAxis = d3.axisTop(xScale).ticks(6).tickFormat(d3.format(".0%"))
    var xAxisBot = d3.axisBottom(xScale).ticks(6).tickFormat(d3.format(".0%"))
    svg.append('g').attr('transform', "translate(40,55)").call(xAxis) // append xScale twice on top and bottom
    svg.append('g').attr('transform', "translate(40," + (svgHeight - 25) + ")").call(xAxisBot) 
    svg.append('text').text("Letter Frequency (%)").attr('transform', "translate(75,25)") // append title of graph
    
    // handle frequency slider and add event listener
    freqSlider = slider(0,maxFrequency*100)
    freqSlider.addEventListener('input', onFiltersChanged)
    
    // Update the chart for all letters to initialize
    updateChart('all-letters', getRange());
});


function updateChart(filterKey, range) {
    // Create a filtered array of letters based on the filterKey
    var filteredLetters = letters.filter(function(d){
        return lettersMap[filterKey].indexOf(d.letter) >= 0 && 
            (d.frequency*100 > range[0]) && (d.frequency*100 < range[1])
    });

    // **** Draw and Update your chart here ****
    var bars = chartG.selectAll('.bar')
        .data(filteredLetters, function(d){
            return d.letter
    })

    var barsEnter = bars.enter().append('g').attr('class', 'bar') 
    barsEnter.merge(bars) // merge them before we apply in order to update both new and old
        .attr('transform', function(d,i) {
            return 'translate(' + [0, i*barBand+4]+')'; //Update position based on index
        })
    barsEnter.append('rect').attr('width', function(d) {return xScale(d.frequency)}).attr('height', barHeight)
    barsEnter.append('text').attr('x', -20).attr('y', 12).text(function(d){return d.letter})

    bars.exit().remove();

}

// Remember code outside of the data callback function will run before the data loads

// CODE FROM https://observablehq.com/@sarah37/snapping-range-slider-with-d3-brush
// ADAPTED TO THIS SCENARIO
slider = function(min, max) {

    var range = [min, max]
  
    // set width and height of svg
    var w = 400
    var h = 50
    // var margin = {top: 130,
    //               bottom: 135,
    //               left: 40,
    //               right: 40}
    var margin = {top: 0,
                  bottom: 20,
                  left: 10,
                  right: 40}
  
    // dimensions of slider bar
    var width = w - margin.left - margin.right;
    var height = h - margin.top - margin.bottom;
  
    // create x scale
    var x = d3.scaleLinear()
      .domain(range)  // data space
      .range([0, width]);  // display space
    
    // create svg and translated g
    var svg = d3.select('#slider').attr('width', w).attr('height', h)
    const g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`)
    
    // labels
    var labelL = g.append('text')
      .attr('id', 'labelleft')
      .attr('x', 0)
      .attr('y', height + 5)
  
    var labelR = g.append('text')
      .attr('id', 'labelright')
      .attr('x', 0)
      .attr('y', height + 5)
  
    // define brush
    var brush = d3.brushX()
      .extent([[0,0], [width, height]])
      .on('brush', function() {
        var s = d3.event.selection;
        // update and move labels
        labelL.attr('x', s[0])
          .text((x.invert(s[0]).toFixed(2)))
        labelR.attr('x', s[1])
          .text((x.invert(s[1]).toFixed(2)))
        // move brush handles      
        handle.attr("display", null).attr("transform", function(d, i) { return "translate(" + [ s[i], - height / 4] + ")"; });
        // update view
        // if the view should only be updated after brushing is over, 
        // move these two lines into the on('end') part below
        svg.node().value = s.map(function(d) {var temp = x.invert(d); return +temp.toFixed(2)});
        svg.node().dispatchEvent(new CustomEvent("input"));
      })
  
    // append brush to g
    var gBrush = g.append("g")
        .attr("class", "brush")
        .call(brush)
  
    // add brush handles (from https://bl.ocks.org/Fil/2d43867ba1f36a05459c7113c7f6f98a)
    var brushResizePath = function(d) {
        var e = +(d.type == "e"),
            x = e ? 1 : -1,
            y = height / 2;
        return "M" + (.5 * x) + "," + y + "A6,6 0 0 " + e + " " + (6.5 * x) + "," + (y + 6) + "V" + (2 * y - 6) +
          "A6,6 0 0 " + e + " " + (.5 * x) + "," + (2 * y) + "Z" + "M" + (2.5 * x) + "," + (y + 8) + "V" + (2 * y - 8) +
          "M" + (4.5 * x) + "," + (y + 8) + "V" + (2 * y - 8);
    }
  
    var handle = gBrush.selectAll(".handle--custom")
      .data([{type: "w"}, {type: "e"}])
      .enter().append("path")
      .attr("class", "handle--custom")
      .attr("stroke", "#000")
      .attr("fill", '#eee')
      .attr("cursor", "ew-resize")
      .attr("d", brushResizePath);
      
    // override default behaviour - clicking outside of the selected area 
    // will select a small piece there rather than deselecting everything
    // https://bl.ocks.org/mbostock/6498000
    gBrush.selectAll(".overlay")
      .each(function(d) { d.type = "selection"; })
      .on("mousedown touchstart", brushcentered)
    
    function brushcentered() {
      var dx = x(1) - x(0), // Use a fixed width when recentering.
      cx = d3.mouse(this)[0],
      x0 = cx - dx / 2,
      x1 = cx + dx / 2;
      d3.select(this.parentNode).call(brush.move, x1 > width ? [width - dx, width] : x0 < 0 ? [0, dx] : [x0, x1]);
    }
    
    // select entire range
    gBrush.call(brush.move, range.map(x))
    getRange = function() { var range = d3.brushSelection(gBrush.node()).map(d => Math.round(x.invert(d))) 
        return range}
    return svg.node()
  }