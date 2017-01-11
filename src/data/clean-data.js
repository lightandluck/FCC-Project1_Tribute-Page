let fs = require('fs')
let disc = require('./discovery.json')
let elements = disc.elements

elements.forEach((element, index) => {
  element.discovery_order = index + 1
})

disc.elements = elements
fs.writeFile('discovery_order.json', JSON.stringify(disc), (err) => {
  if (err) throw err
  console.log('saved')
})


