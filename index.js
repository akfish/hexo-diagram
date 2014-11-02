var async = require('async');
var path = require('path');
var jumly = require('./generators/jumly');

var r = /\n*(`{3,}|~{3,}) *(.+)? *\n([\s\S]+?)\s*\1\n*/g

var generators = {
  'sequence': jumly,
  'robustness': jumly
}
console.log("Hexo Diagram Filter")
var base = hexo.source.base;
var diagramFolder = path.join(base, 'diagrams');
console.log(diagramFolder);

hexo.extend.filter.register('before_post_render', function(data, callback){
  // console.log(data.content);
  var matches;
  var diagrams = {};
  var tasks = []
  var i = 0;

  function makeTask(lang, code, output, str) {
    return function (cb) {
      console.log("Generate: [" + lang + "]" + output);
      var gen = generators[lang];
      gen(lang, code, path.join(diagramFolder, output), function (err) {
        cb(err, {src: str, output: output});
      })
    }
  }
  // Gather all diagram blocks
  while ((matches = r.exec(data.content)) != null) {
    var str = matches[0];
    var lang = matches[2];
    var code = matches[3];
    if (lang in generators) {
      var diagram = diagrams[str] = {
        lang: lang,
        code: code,
        index: i
      }
      // console.log(diagram);
      var output = data.slug + "-diagram-" + i + ".png";
      // console.log(path.join(diagramFolder, output));
      tasks.push(makeTask(lang, code, output, str));
      i++;
    }
  }
  // Execute generators
  async.parallel(tasks, function (err, results) {
    // TODO: handle error
    // Results
    results.forEach(function (o) {
      diagrams[o.src].output = o.output;
    })
    // Replace output
    data.raw = data.content = data.content.replace(r, function(match, ticks, lang, code, offset, str) {
      if (match in diagrams && diagrams[match].output)
        return "\n![](/diagrams/" + diagrams[match].output + ")\n";
      return match;
    });
    // Done
    callback(err, data);
  });

}, 1);
