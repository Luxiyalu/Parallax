Parallax
========

Provides parallax effect given a ratio (0-1). Based upon TweenMax.

### Code Example

```javascript
  // Create an array of keyframes, be sure to include frame ratio: 0 and ratio: 1
  // x, y, opacity, backgroundColor... anything that could be tweened through TweenMax could be tweened.
  // Easing could be added between frames.
  var keyframes = [
    {ratio: 0, frame: {}},
    {ratio: 0.5, frame: {x: 300}},
    {ratio: 1, frame: {y: 300, ease: Power3.easeOut}}
  ];
  
  // create parallax according to keyframes
  var parallax = new Parallax($('.obj'), keyframes);
  
  $(document).on('scroll', function() {
    // provide a ratio, to seek to the point
    var ratio = scrollY / $(window).height();
    
    // seek to the point according to ratio
    parallax.seek(ratio);
  };
```

##### Install with:
```
yarn add greensock-parallax
```

##### Link for demo repo: [link](https://github.com/Luxiyalu/parallax-demo).
