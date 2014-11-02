var generator = require('./libs/generator');

var code = [
    '@found "You", ->',
    '  @message "get", "JUMLY"',
  ].join('\n');

generator('sequence', code, 'example.png', function () {
  console.log("Done!");
});
