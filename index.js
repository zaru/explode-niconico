const jQuery = require('jquery')
window.jQuery = jQuery
window.$ = jQuery
require("jquery-image-explode")

function domExplode(dom, position) {
  let domHtml = dom.prop('outerHTML')
  let domWidth = dom.width()
  let domHeight = dom.height()
  domHtml = domHtml.replace(/(left|top):\s*[0-9]+px/g, "")

  let data = `<svg xmlns='http://www.w3.org/2000/svg' width='${domWidth}' height='${domHeight}'>` +
               "<foreignObject width='100%' height='100%'>" +
                 "<div xmlns='http://www.w3.org/1999/xhtml'>" +
                   domHtml +
                 "</div>" +
               "</foreignObject>" +
             "</svg>"
  let DOMURL = self.URL || self.webkitURL || self
  let svg = new Blob([data], {type: "image/svg+xml;charset=utf-8"})
  let url = DOMURL.createObjectURL(svg)

  dom.hide()

  let img = $('<img>')
  img.css('position', 'fixed')
  img.css('top', position.y + 'px')
  img.css('left', position.x + 'px')
  img.attr('src', url)
  $('body').append(img)

  img.explode({
    "minWidth":3,"maxWidth":12,"radius":600,"minRadius":15,
    "release":true,"fadeTime":300,"recycle":false,
    "recycleDelay":500,"explodeTime":231,"round":false,
    "minAngle":0,"maxAngle":360,"gravity":10,"groundDistance":1000
  })
}

function start() {
  $(document).on('click', 'div', function() {
    if ($(this).css('position') == 'fixed') {
      const rect = $(this)[0].getBoundingClientRect()
      domExplode($(this), rect)
    }
  })
}

module.exports = start
