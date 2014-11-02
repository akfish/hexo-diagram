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

```markdown
```[diagram_type]
[diagram_code]
``````

Valid `diagram_type` values are:

* sequence
* robustness

If user does not specify one, `sequence` will be used as default.

```markdown
```sequence
@found "You", ->
  @message "Think", ->
    @message "Write your idea", "JUMLY", ->
      @create "Diagram"
jumly.css "background-color":"#8CC84B"
``````

For more information on how to write jumly syntax, visit [Jumly](http://jumly.tmtk.net/).
