var phantom = require('phantom');
var path = require('path');
var base = path.resolve(__dirname, '../assets').replace(/\\/g, "/") + "/"

var head = [
    "<!doctype html>",
    "<head>",
    "  <meta charset='utf-8'/>",
    "  <link href='" + base + "jumly.min.css' rel='stylesheet'/>",
    "  <script src='" + base + "jquery-2.0.0.min.js'></script>",
    "  <script src='" + base + "coffee-script.js'></script>",
    "  <script src='" + base + "jumly.min.js'></script>",
    "  <title>Diagram Generator</title>",
    "</head>",
    "<body>",
  ].join('\n');

var tail = "</body>";

var wrapCode = function (type, code) {
  return [
      "<script type='text/jumly+" + type + "'>",
      code,
      "</script>"
    ].join('\n');
}

module.exports = function (type, code, output, callback) {
  phantom.create(function (ph) {
    ph.createPage(function (page) {
      page.setContent(head + wrapCode(type, code) + tail, "./", function(status) {
        page.evaluate(function() {
          return $('body').children().last()[0].getBoundingClientRect();
        }, function(rect) {
          page.set('clipRect', rect);
          page.render(output);
          ph.exit();
          if (typeof(callback) === 'function') {
            callback();
          }
        });
      })
    });
  });
}
