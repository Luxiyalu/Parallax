Parallax
========

Provides parallax effect given a ratio (0-1). Based upon TweenMax.

### Code Example

```coffeescript
define ['jquery', 'parallax'], ($) ->
  # create an object
  keyframes = []
  keyframes.push ratio: 0, frame: {}
  keyframes.push ratio: .2, frame: {x: $(window).width() - $('.obj').width(), backgroundColor: 'green'}
  keyframes.push ratio: .4, frame: {y: $(window).height() - $('.obj').height(), backgroundColor: 'blue'}
  keyframes.push ratio: .6, frame: {x: 0, backgroundColor: 'red'}
  keyframes.push ratio: 1, frame: {y: 0, backgroundColor: 'black'}
  
  # create the tweens according to ratio
  parallax = new Parallax($('.obj'), keyframes)
    
  h = $('html').height() - $(window).height()
  $(document).on 'scroll', ->
    ratio = scrollY / h
    parallax.seek(ratio)
```
