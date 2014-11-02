hexo-diagram
===================

Render UML diagrams in your blog powered by [Jumly](http://jumly.tmtk.net/).

## Feature

* Sequence diagram
* Robustness diagram

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

For more information on how to write jumly syntax, visit [Jumly](http://jumly.tmtk.net/).
