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

  var animate = function(apply, duration) {
    var start = null;

    var step = function(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min(1, (timestamp - start) / duration);
      apply(progress);
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
    if (header) scrollY -= header.getBoundingClientRect().height;
    smoothScrollTo(null, scrollY, options);
  };

  var init = function(options) {
    var selector = (options || {}).selector || '[href^="#"]';
    var links = document.querySelectorAll(selector);

    window.addEventListener('popstate', function(event) {
      event.preventDefault();
      smoothScrollToSelector(window.location.hash, options);
    });

    var smoothScrollClick = function(event) {
      event.preventDefault();

      var selector = event.currentTarget.getAttribute('href');
      history.pushState(null, null, selector);
      smoothScrollToSelector(selector, options);
    };

    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', smoothScrollClick);
    }
  };

  return {
    animate: animate,
    smoothScrollTo: smoothScrollTo,
    smoothScrollToSelector: smoothScrollToSelector,
    init: init,
  };
});
