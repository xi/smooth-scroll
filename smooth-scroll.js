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

  var smoothScrollTo = function(endY, duration, easing) {
    duration = duration || 400;
    easing = easing || cubicInOut;

    var startY = window.scrollY;

    animate(function(progress) {
      var f = easing(progress);
      window.scrollTo(0, startY * (1 - f) + endY * f);
    }, duration);
  };

  var init = function() {
    var smoothScrollClick = function(event) {
      event.preventDefault();

      var selector = event.currentTarget.getAttribute('href');
      var scrollY = document.querySelector(selector).offsetTop;

      history.pushState(null, null, selector);
      smoothScrollTo(scrollY);
    };

    window.addEventListener('popstate', function(event) {
      event.preventDefault();

      var selector = window.location.hash;
      var scrollY = document.querySelector(selector).offsetTop;

      smoothScrollTo(scrollY);
    });

    var links = document.querySelectorAll('[href^="#"]');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', smoothScrollClick);
    };
  };

  return {
    animate: animate,
    smoothScrollTo: smoothScrollTo,
    init: init,
  };
});
