var makePhantom = require('./factory/phantom');
var path = require('path');
var env = require('../env');

var styles = [
  'jumly.min.css'
];

var scripts = [
    'jquery-2.0.0.min.js',
    'coffee-script.js',
    'jumly.min.js'
];

var wrapCode = function (type, code) {
  return [
      "<script type='text/jumly+" + type + "'>",
      code,
      "</script>"
    ].join('\n');
}

var wrapCode = function (type, code) {
  return [
      "<script type='text/jumly+" + type + "'>",
      code,
      "</script>"
    ].join('\n');
}

var to_evaluate = function (ph, page) {
  return function() {
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
  }
}

var after_evaluate = function (ph, page, output, callback) {
  return function(rect) {
    page.set('clipRect', rect);
    page.render(path.join(env.diagramFolder, output));
    ph.exit();
    if (typeof(callback) === 'function') {
      callback(null, "![](/diagrams/" + output + ")");
    }
  }
}

module.exports = makePhantom(styles, scripts, wrapCode, to_evaluate, after_evaluate);
