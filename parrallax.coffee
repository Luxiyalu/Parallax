do (TweenMax, window, document) ->
  Parallax = (element, keyframes) ->
    # startingpoint must be 0
    @element = element
    @keyframes = keyframes
    do @compileTweens
    return
    
  Parallax::compileTweens = ->
    @tweens = []
    
    TweenMax.set @element, @keyframes[0].frame
    for i in [1...@keyframes.length]
      li = i - 1
      dt = @keyframes[i].ratio - @keyframes[li].ratio
      tween = TweenMax.to @element, dt, @keyframes[i].frame
      tween.keyframe = @keyframes[i]
      @tweens.push tween.pause()
      
  Parallax::seek = (ratio) ->
    prevIndex = @index || @getIndex(@ratio)
    currentIndex = @getIndex(ratio)
     
    # forward
    if !@ratio || @ratio < ratio
      for i in [prevIndex...currentIndex]
        tween = @tweens[i]
        duration = tween.duration()
        tween.seek(duration).pause()
        
    # backward
    else
      for i in [prevIndex...currentIndex]
        tween = @tweens[i]
        tween.seek(0).pause()
        
    # go to the position in the right tween
    span = @getSpan(ratio)
    @tweens[currentIndex].seek(span).pause()
    
    # store ratio for comparison next time
    @ratio = ratio
    @index = currentIndex
    
  Parallax::getSpan = (ratio) ->
    # calculate the specific time of the current span of tween
    span = ratio
    currentTween = do =>
      for tween in @tweens
        _r = tween.keyframe.ratio
        span -= tween.duration()
        return tween if ratio <= _r
    span += currentTween.duration()
    
  Parallax::getIndex = (ratio) ->
    index = 0
    span = ratio
    currentTween = do =>
      for tween in @tweens
        _r = tween.keyframe.ratio
        span -= tween.duration()
        return index if ratio <= _r
        index++
        
  # node export
  if typeof module is 'object' && typeof module.exports is 'object'
    module.exports = Parallax
  # window export
  else
    window.Parallax = Parallax
    # requirejs module definition
    if typeof window.define is 'function' && window.define.amd
      window.define 'parallax', [], ->
        Parallax
