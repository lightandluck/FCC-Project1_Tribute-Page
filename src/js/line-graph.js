var margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 50
},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// parse data / time
var parseTime = d3.timeParse('%d-%b-%y');

// set ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// define line
var valueline = d3.line()
    .x((d) => { return x(d.date) })
    .y((d) => { return y(d.close) });


