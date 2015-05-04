var phantom = require('phantom');
var path = require('path');
var base = path.resolve(__dirname, '../../assets').replace(/\\/g, "/") + "/"

function makeGenerator(styles, scripts, wrapper, to_evaluate, after_evaluate) {
  var head = [
      "<!doctype html>",
      "<head>",
      "  <meta charset='utf-8'/>",
    ];

  if (styles) {
    styles.forEach(function(css) {
      head.push("<link href='file://" + base + css + "' rel='stylesheet' />");
    });
  }

  if (scripts) {
    scripts.forEach(function(js) {
      head.push("<script src='file://" + base + js + "'></script>");
    });
  }
  head = head.concat([
      "  <title>Diagram Generator</title>",
      "</head>",
      "<body>",
    ]).join('\n');

  var tail = "</body>";

  return function (type, code, output, callback) {
    phantom.create(function (ph) {
      ph.createPage(function (page) {
        page.set('onConsoleMessage', function(msg) {
          console.log('CONSOLE: ' + msg);
        });
        var content = head + wrapper(type, code) + tail;
        page.setContent(content, "./", function(status) {
          page.evaluate(to_evaluate(ph, page), after_evaluate(ph, page, output, callback));
        })
      });
    });
  }
}

module.exports = makeGenerator;
