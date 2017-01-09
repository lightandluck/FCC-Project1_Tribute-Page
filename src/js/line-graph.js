var margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 50
},
    width = 900 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom

// parse data / time
var parseTime = d3.timeParse('%d-%b-%y')

// set ranges
var x = d3.scaleTime().range([0, width])
var y = d3.scaleLinear().range([height, 0])

// define line
var valueline = d3.line()
    .x(d => x(d.date))
    .y(d => y(d.close))

// append svg object
// append group
// move group
var svg = d3.select('body').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')


// do stuff with data
d3.csv('/data/data.csv', (error, data) => {
    if (error) console.error(error)
    console.log(data)
    // format data, objects are passed by ref and therefore can be changed
    // unlike array of primitives
    data.forEach(d => {
        d.date = parseTime(d.date)
        //simple way to change in integer
        d.close = +d.close
    })

    // scale range of data
    x.domain(d3.extent(data, d => d.date ))
    y.domain([0, d3.max(data, d => d.close )])

    // add valueline path
    svg.append('path')
        .data([data])
        .attr('class', 'line')
        .attr('d', valueline)
    
    // add x axis
    svg.append('g')
        .attr('transform', 'translate(0, ' + height + ')')
        .call(d3.axisBottom(x))

    svg.append('g')
        .call(d3.axisLeft(y))
    
})


