var numbers = [5, 4, 10, 1],
    data = [
      { date: '2014-01-01', amount: 10 },
      { date: '2014-02-01', amount: 20 },
      { date: '2014-03-01', amount: 40 },
      { date: '2014-04-01', amount: 80 }
    ];

console.log(d3.min(numbers));
console.log(d3.max(data, (d, i) => {
    return d.amount
}));

var y = d3.scaleLinear().range([200, 0]);
y.domain(d3.extent(data, (d) => { return d.amount }));

var x = d3.scaleTime()
    .domain([
        new Date(Date.parse('2014-01-01')),
        new Date(Date.parse('2014-04-01'))
    ])
    .range([0, 300]);

console.log(x(new Date(Date.parse('2014-02-01'))));

var xAxis = d3.axisBottom(x)
    .ticks(4);

var yAxis = d3.axisLeft(y).ticks(8)

var svg = d3.select('svg');
    // .append('svg')
    //     .attr('width', 300)
    //     .attr('height', 150);

// svg.append('g').call(xAxis);

// svg.append('g').call(yAxis);

var sales = [
    { product: 'Hoodie', count: 7 },
    { product: 'Jacket', count: 6 },
    { product: 'Snuggie', count: 9 }
];

var rects = svg.selectAll('rect').data(sales);
var newRects = rects.enter();

var maxCount = d3.max(sales, (d, i) => { return d.count });

var x = d3.scaleLinear()
    .range([0, 300])
    .domain([0, maxCount]);

var y = d3.scaleBand()
    .range([0, 75])
    .domain(sales.map((d, i) => {
        return d.product;
    }))

newRects.append('rect')
    .attr('x', x(0))
    .attr('y', (d, i) => {
        return y(d.product);
    })
    .attr('height', y.step())
    .attr('width', (d, i) => {
        return x(d.count)
    })






