(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory());
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    window.smoothScroll = factory();
    // if not used as module, execute directly
    window.smoothScroll.init();
  }
})(function() {
  'use strict';

  var on = function(element, eventType, selector, fn) {
    element.addEventListener(eventType, function(event) {
      var target = event.target.closest(selector);
      if (target && element.contains(target)) {
        handler.call(target, event);
      }
    });
  };

  var animate = function(fn, duration) {
    var start = null;

    var step = function(timestamp) {
      if (!start) {
        start = timestamp;
      }
      var progress = Math.min(1, (timestamp - start) / duration);
      fn(progress);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  };

  var cubicInOut = function(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  };

  var smoothScrollTo = function(endX, endY, options) {
    var duration = (options || {}).duration || 400;
    var easing = (options || {}).easing || cubicInOut;

    var startX = window.scrollX;
    var startY = window.scrollY;

    animate(function(progress) {
      var f = easing(progress);
      var x = typeof endX === 'number' ? startX * (1 - f) + endX * f : startX;
      var y = typeof endY === 'number' ? startY * (1 - f) + endY * f : startY;
      window.scrollTo(x, y);
    }, duration);
  };

  var smoothScrollToSelector = function(selector, options) {
    var headerSelector = (options || {}).headerSelector || '[data-scroll-header]';
    var header = document.querySelector(headerSelector);
    var scrollY = document.querySelector(selector).offsetTop;
    if (header) {
      scrollY -= header.getBoundingClientRect().height;
    }
    smoothScrollTo(null, scrollY, options);
  };

  var init = function(options) {
    window.addEventListener('popstate', function(event) {
      event.preventDefault();
      smoothScrollToSelector(window.location.hash, options);
    });

    var selector = (options || {}).selector || '[href^="#"]';
    on(document, 'click', selector, function(event) {
      event.preventDefault();

      var selector = this.getAttribute('href');
      history.pushState(null, null, selector);
      smoothScrollToSelector(selector, options);
    });
  };

  return {
    animate: animate,
    smoothScrollTo: smoothScrollTo,
    smoothScrollToSelector: smoothScrollToSelector,
    init: init,
  };
});
