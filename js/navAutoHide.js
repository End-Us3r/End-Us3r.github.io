/* Slides the top nav away on scroll down and back on scroll up.
   The class only changes visibility through CSS inside max-width: 480px,
   so a wider layout never moves even if the class is present.
   With this script off, the class is never added and the bar stays put. */
(function () {
  if (!window.matchMedia) return;

  var THRESHOLD = 8;
  var JUMP_HOLD_MS = 500;
  var HIDDEN_CLASS = "nav-hidden";

  var bar = findBar();
  if (!bar) return;

  var narrow = window.matchMedia("(max-width: 480px)");
  var scroller = document.scrollingElement || document.documentElement;
  var lastY = 0;
  var ignoreUntil = 0;
  var ticking = false;

  function findBar() {
    var site = document.querySelector(".site-header");
    if (site && site.querySelector("nav, .site-nav")) return site;
    var header = document.querySelector("header");
    if (header && header.querySelector("nav")) return header;
    return null;
  }

  function show() {
    bar.classList.remove(HIDDEN_CLASS);
  }

  function hide() {
    bar.classList.add(HIDDEN_CLASS);
  }

  function menuOpen() {
    var boxes = document.querySelectorAll(".nav-fallback, .site-menu-checkbox");
    var i;
    for (i = 0; i < boxes.length; i++) {
      if (boxes[i].checked) return true;
    }
    var dropdowns = document.querySelectorAll(".mobile-dropdown");
    for (i = 0; i < dropdowns.length; i++) {
      if (dropdowns[i].style.display === "flex") return true;
    }
    return false;
  }

  function focusInside() {
    var active = document.activeElement;
    return !!(active && active !== document.body && bar.contains(active));
  }

  function metrics() {
    var y = window.scrollY || window.pageYOffset || 0;
    var view = window.innerHeight || 0;
    var max = 0;
    var el = scroller;

    if (el === document.body) {
      y = document.body.scrollTop || 0;
      max = Math.max(0, document.body.scrollHeight - document.body.clientHeight);
      return { y: y, max: max };
    }

    var root = document.scrollingElement || document.documentElement;
    var height = Math.max(
      root ? root.scrollHeight : 0,
      document.documentElement.scrollHeight,
      document.body ? document.body.scrollHeight : 0
    );
    max = Math.max(0, height - view);
    return { y: y, max: max };
  }

  function remember(y, max) {
    if (y <= 0) lastY = 0;
    else if (y > max) lastY = max;
    else lastY = y;
  }

  function onScroll() {
    var reading = metrics();

    if (!narrow.matches) {
      show();
      remember(reading.y, reading.max);
      return;
    }

    var y = reading.y;
    var max = reading.max;

    /* At the top, and while iOS rubber-bands above it, stay visible.
       Do not store a negative position, or the bounce back looks like
       a scroll down and the bar flickers away. */
    if (y <= 0) {
      show();
      lastY = 0;
      return;
    }

    /* Past the bottom: leave the bar and lastY alone. */
    if (y > max) return;

    /* An in-page jump is not a scroll the visitor made. Keep the bar
       up, then resync once the jump has settled. */
    if (Date.now() < ignoreUntil) return;

    if (menuOpen() || focusInside()) {
      show();
      lastY = y;
      return;
    }

    if (y <= THRESHOLD) {
      show();
      lastY = y;
      return;
    }

    var delta = y - lastY;
    if (Math.abs(delta) < THRESHOLD) return;

    if (delta > 0) hide();
    else show();
    lastY = y;
  }

  function requestTick() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      ticking = false;
      onScroll();
    });
  }

  function noteScroller(event) {
    var target = event.target;
    if (target === document || target === document.documentElement) {
      scroller = document.scrollingElement || document.documentElement;
    } else if (target === document.body) {
      scroller = document.body;
    }
    requestTick();
  }

  window.addEventListener("scroll", noteScroller, { passive: true });
  document.addEventListener("scroll", noteScroller, { capture: true, passive: true });

  function onWidthChange() {
    if (!narrow.matches) show();
  }

  if (narrow.addEventListener) narrow.addEventListener("change", onWidthChange);
  else if (narrow.addListener) narrow.addListener(onWidthChange);

  bar.addEventListener("focusin", function () {
    show();
    var reading = metrics();
    remember(reading.y, reading.max);
  });

  function holdForJump() {
    ignoreUntil = Date.now() + JUMP_HOLD_MS;
    show();
    window.setTimeout(function () {
      var reading = metrics();
      remember(reading.y, reading.max);
    }, JUMP_HOLD_MS);
  }

  document.addEventListener("click", function (event) {
    var node = event.target;
    while (node && node !== document) {
      if (node.nodeType === 1 && node.tagName === "A") {
        var href = node.getAttribute("href") || "";
        if (href.charAt(0) === "#") holdForJump();
        break;
      }
      node = node.parentNode;
    }
    if (menuOpen()) {
      show();
      var reading = metrics();
      remember(reading.y, reading.max);
    }
  });

  window.addEventListener("hashchange", holdForJump);

  document.addEventListener("change", function (event) {
    var target = event.target;
    if (!target || !target.classList) return;
    if (!target.classList.contains("nav-fallback") && !target.classList.contains("site-menu-checkbox")) return;
    if (target.checked) show();
  });

  lastY = metrics().y > 0 ? metrics().y : 0;
})();
