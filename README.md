hexo-diagram
===================

## Features

Render diagrams in your blog:
* Sequence Diagram - powered by [Jumly][Jumly]
* Robustness Diagram - powered by [Jumly][Jumly]
* Flow Chart - powered by [flowchart.js][flowchart.js]

See those renders' website for help information on syntax.

### Limitations of flowchart

* Diagrams are generated statically. Any interactive features (i.e. node links) will be lost.
* Custom styling is not supported.

Those issues will be fixed in later versions.

## Install

```shell
npm install hexo-diagram --save
```

## Usage

Syntax:

<pre lang="markdown"><code>
```[diagram_type]
[diagram_code]
```
</code></pre>

Valid `diagram_type` values are:

* sequence
* robustness
* flow

If user does not specify one, `sequence` will be used as default.

<pre lang="markdown"><code>
```sequence
@found "You", ->
  @message "Think", ->
    @message "Write your idea", "JUMLY", ->
      @create "Diagram"
jumly.css "background-color":"#8CC84B"
```
</code></pre>

For more information on how to write jumly syntax, visit [Jumly][Jumly].

[Jumly]: http://jumly.tmtk.net/
[flowchart.js]: http://adrai.github.io/flowchart.js/
