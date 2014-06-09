// Generated by CoffeeScript 1.7.1
(function() {
  (function(TweenMax, window, document) {
    var Parallax;
    Parallax = (function() {
      function Parallax(element, keyframes) {
        this.element = element;
        this.keyframes = keyframes;
        this.compileTweens();
      }

      return Parallax;

    })();
    Parallax.prototype.compileTweens = function() {
      var dt, i, li, tween, _i, _ref, _results;
      this.tweens = [];
      TweenMax.set(this.element, this.keyframes[0].frame);
      _results = [];
      for (i = _i = 1, _ref = this.keyframes.length; 1 <= _ref ? _i < _ref : _i > _ref; i = 1 <= _ref ? ++_i : --_i) {
        li = i - 1;
        dt = this.keyframes[i].ratio - this.keyframes[li].ratio;
        tween = TweenMax.to(this.element, dt, this.keyframes[i].frame);
        tween.keyframe = this.keyframes[i];
        _results.push(this.tweens.push(tween.pause()));
      }
      return _results;
    };
    Parallax.prototype.seek = function(ratio) {
      var currentIndex, duration, i, prevIndex, span, tween, _i, _j;
      ratio = Math.max(ratio, 0);
      ratio = Math.min(ratio, 1);
      prevIndex = this.index || this.getIndex(this.ratio);
      currentIndex = this.getIndex(ratio);
      if (!this.ratio || this.ratio < ratio) {
        for (i = _i = prevIndex; prevIndex <= currentIndex ? _i < currentIndex : _i > currentIndex; i = prevIndex <= currentIndex ? ++_i : --_i) {
          tween = this.tweens[i];
          duration = tween.duration();
          tween.seek(duration).pause();
        }
      } else {
        for (i = _j = prevIndex; prevIndex <= currentIndex ? _j < currentIndex : _j > currentIndex; i = prevIndex <= currentIndex ? ++_j : --_j) {
          tween = this.tweens[i];
          tween.seek(0).pause();
        }
      }
      span = this.getSpan(ratio);
      this.tweens[currentIndex].seek(span).pause();
      this.ratio = ratio;
      return this.index = currentIndex;
    };
    Parallax.prototype.getSpan = function(ratio) {
      var currentTween, span;
      span = ratio;
      currentTween = (function(_this) {
        return function() {
          var tween, _i, _len, _r, _ref;
          _ref = _this.tweens;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            tween = _ref[_i];
            _r = tween.keyframe.ratio;
            span -= tween.duration();
            if (ratio <= _r) {
              return tween;
            }
          }
        };
      })(this)();
      return span += currentTween.duration();
    };
    Parallax.prototype.getIndex = function(ratio) {
      var currentTween, index, span;
      index = 0;
      span = ratio;
      return currentTween = (function(_this) {
        return function() {
          var tween, _i, _len, _r, _ref;
          _ref = _this.tweens;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            tween = _ref[_i];
            _r = tween.keyframe.ratio;
            span -= tween.duration();
            if (ratio <= _r) {
              return index;
            }
            index++;
          }
        };
      })(this)();
    };
    if (typeof module === 'object' && typeof module.exports === 'object') {
      return module.exports = Parallax;
    } else {
      window.Parallax = Parallax;
      if (typeof window.define === 'function' && window.define.amd) {
        return window.define('parallax', [], function() {
          return Parallax;
        });
      }
    }
  })(TweenMax, window, document);

}).call(this);

//# sourceMappingURL=parrallax.map