var margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 50
},
    width = 1200 - margin.left - margin.right,
    height = 1200 - margin.top - margin.bottom

// parse data / time
var parseTime = d3.timeParse('%Y')

// set ranges
var x = d3.scaleTime().range([0, width])
var y = d3.scaleLinear().range([height, 0])

// define line
var valueline = d3.line()
    .x(d => x(d.discovery_date))
    .y(d => y(d.discovery_order))
    .curve(d3.curveStepAfter)

// append svg object
// append group
// move group
var svg = d3.select('body').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')


// do stuff with data
d3.json('/data/discovery_order.json', (error, data) => {
    if (error) console.error(error)
    // format data, objects are passed by ref and therefore can be changed
    // unlike array of primitives
    data = data.elements
    data.forEach(d => {
        d.discovery_date = parseTime(d.discovery_date)        
    })

    // scale range of data
    x.domain([parseTime("1210"), d3.max(data, d => d.discovery_date )])
    y.domain([0, d3.max(data, d => d.discovery_order )])

    // add valueline path
    svg.append('path')
        .data([data])
        .attr('class', 'line')
        .attr('d', valueline)
    
    // add x-axis
    svg.append('g')
        .attr('transform', 'translate(0, ' + height + ')')
        .call(d3.axisBottom(x));
    
    // add x label
    let x_offset = width/2
    let y_offset = height + margin.top + 20
    svg.append('text')
        .attr('transform', `translate(${x_offset}, ${y_offset})`)
        .style('text-anchor', 'middle')
        .text('Year Discovered')
    
    // add y-axis
    svg.append('g')
        .call(d3.axisLeft(y))

    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 0 - margin.left)
        .attr('x', 0 - height/2)
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .text('Discovered Order')
    
    svg.append('text')
        .attr('transform', `translate(${x_offset}, 0)`)
        .style('text-anchor', 'middle')
        .attr('font-size', '26')
        .attr('font-family', 'sans-serif')
        .text('Chronological Rate of Acquisition of Chemical Elements')
    
})


