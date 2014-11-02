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
      page.set('onConsoleMessage', function(msg) {
        console.log('CONSOLE: ' + msg);
      });
      page.setContent(head + wrapCode(type, code) + tail, "./", function(status) {
        page.evaluate(function() {
          function growRect(current, next) {
            var n = {}
            n.left = Math.min(current.left, next.left);
            n.top = Math.min(current.top, next.top);
            n.right = Math.max(current.right, next.right);
            n.bottom = Math.max(current.bottom, next.bottom);
            n.height = n.bottom - n.top;
            n.width = n.right - n.left;
            return n;
          }

          var diagram = $('body').children().last();
          var r = diagram[0].getBoundingClientRect();
          function walk(node) {
            var rect = node[0].getBoundingClientRect();
            r = growRect(r, rect);
            node.children().each(function () { walk($(this)); })
          }
          walk(diagram);
          return r;
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
