let jsdom = require('jsdom')

jsdom.env({
  url: 'https://en.wikipedia.org/wiki/Timeline_of_chemical_element_discoveries',
  done: (err, window) => {
    global.window = window
    global.document = window.document

    let tables = document.getElementsByClassName('jquery-tablesorter')
    let data = []
    
    for (let i = 0; i < tables.length - 1; i++) {
      let r = 0
      while (row = tables[i].rows[r++]) {
        let element = {

        }
      }
    }
    
  }
})