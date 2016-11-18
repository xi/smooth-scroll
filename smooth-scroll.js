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

var smoothScrollTo = function(endY, container, duration) {
  container = container || window;
  duration = duration || 250;

  var startY = container.scrollY;

  animate(function(progress) {
    // var f = Math.sin(Math.PI * (progress - 0.5)) / 2 + 0.5;
    var f = (3 - 2 * progress) * progress * progress;
    container.scrollTo(0, startY * (1 - f) + endY * f);
  }, duration);
};

var smoothScrollClick = function(event) {
  event.preventDefault();

  var selector = event.currentTarget.getAttribute('href');
  var scrollY = document.querySelector(selector).offsetTop;

  history.pushState(null, null, selector);
  smoothScrollTo(scrollY);
};

document.querySelectorAll('[href^="#"]').forEach(function(el) {
  el.addEventListener('click', smoothScrollClick);
});
