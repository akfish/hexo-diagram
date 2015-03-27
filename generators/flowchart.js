var makePhantom = require('./factory/phantom');
var path = require('path');
var env = require('../env');

var styles = [
];

var scripts = [
  'jquery-2.0.0.min.js',
  'raphael-min.js',
  'flowchart-latest.js'
];

var wrapCode = function (type, code) {
  return [
      "<script type='text/flowchart'>",
      code,
      "</script>",
      "<div id='diagram'></div>",
      "<script>",
      "  var src = $('script[type=\"text/flowchart\"]').text();",
      "  var diagram = flowchart.parse(src);",
      "  diagram.drawSVG('diagram');",
      "</script>"

    ].join('\n');
}

var to_evaluate = function (ph, page) {
  return function() {
    return $('#diagram').html();
  }
}

var env = require("../env");
var path = require("path");
var after_evaluate = function (ph, page, output, callback) {
  return function(html) {
    page.render(path.join(env.diagramFolder, output));
    ph.exit();
    if (typeof(callback) === 'function') {
      callback(null, "![](/diagrams/" + output + ")");
    }
    // ph.exit();
    // if (typeof(callback) === 'function') {
    //   callback(null, "{% raw %}" + html + "{% endraw %}");
    // }
  }
}

module.exports = makePhantom(styles, scripts, wrapCode, to_evaluate, after_evaluate);
