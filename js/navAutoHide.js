/* Slides the top nav away on scroll down and back on scroll up.
   The class only changes visibility through CSS inside max-width: 480px,
   so a wider layout never moves even if the class is present.
   With this script off, the class is never added and the bar stays put. */
(function () {
  if (!window.matchMedia) return;

  var THRESHOLD = 8;
  var JUMP_HOLD_MS = 500;
  /* A wheel, key, or touch and the scroll it causes land in the same
     frame, or the next one. Later movement is the page shifting itself. */
  var USER_SCROLL_MS = 100;
  var HIDDEN_CLASS = "nav-hidden";

  var bar = findBar();
  if (!bar) return;

  var narrow = window.matchMedia("(max-width: 480px)");
  var scroller = document.scrollingElement || document.documentElement;
  var lastY = 0;
  var ignoreUntil = 0;
  /* Direction comes from the visitor's own input, not from how far the
     page moved. The home greeting nudges scrollY in +36px steps without
     a size change, and that nudge can land in the same beat as a scroll
     up. Scroll deltas would call that a scroll down and hide the bar. */
  var inputDir = 0;
  var dragMode = false;
  var lastInputAt = 0;
  var touchStartY = null;
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

  /* Wheel, touch, and keys set the direction. It stays until the next
     one of those, so a self-scroll cannot flip an upward gesture. */
  function noteInput(dir) {
    inputDir = dir;
    dragMode = false;
    lastInputAt = Date.now();
  }

  function noteDrag() {
    dragMode = true;
    inputDir = 0;
    lastInputAt = Date.now();
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
    var gestured = Date.now() - lastInputAt < USER_SCROLL_MS;

    /* Upward wheel, swipe, or key. Keep the bar shown until a real
       downward gesture, including when the page nudges itself downward
       in the same beat. */
    if (!dragMode && inputDir < 0) {
      show();
      lastY = y;
      return;
    }

    /* Downward wheel, swipe, or key. Only that gesture hides the bar.
       A nudge the other way in the same beat does not show it again. */
    if (!dragMode && inputDir > 0 && gestured) {
      if (delta >= THRESHOLD) {
        hide();
        lastY = y;
      } else if (delta <= -THRESHOLD) {
        lastY = y;
      }
      return;
    }

    /* Scrollbar dragging still follows the scroll itself. Anything else
       with no fresh drag is the page moving on its own. */
    if (!dragMode || !gestured) {
      remember(y, max);
      return;
    }

    if (delta <= -THRESHOLD) {
      show();
      lastY = y;
      return;
    }

    if (delta < THRESHOLD) return;

    hide();
    lastY = y;
  }

  function onWheel(event) {
    if (event.deltaY > 0) noteInput(1);
    else if (event.deltaY < 0) noteInput(-1);
  }

  function onTouchStart(event) {
    if (!event.touches || event.touches.length !== 1) {
      touchStartY = null;
      return;
    }
    touchStartY = event.touches[0].clientY;
  }

  function onTouchMove(event) {
    if (touchStartY === null || !event.touches || !event.touches.length) return;
    var dy = event.touches[0].clientY - touchStartY;
    if (!dy) return;
    /* Finger moving down scrolls the page up. */
    noteInput(dy > 0 ? -1 : 1);
  }

  function onTouchEnd() {
    touchStartY = null;
  }

  function scrollKeyDir(event) {
    var key = event.key;
    if (key === "ArrowDown" || key === "PageDown" || key === "End") return 1;
    if (key === "ArrowUp" || key === "PageUp" || key === "Home") return -1;
    if (key === " " || key === "Spacebar") return event.shiftKey ? -1 : 1;
    return 0;
  }

  function onKeyDown(event) {
    if (event.defaultPrevented) return;
    var dir = scrollKeyDir(event);
    if (!dir) return;
    var target = event.target;
    var tag = target && target.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || (target && target.isContentEditable)) return;
    noteInput(dir);
  }

  function scrollbarGutter() {
    return Math.max(0, window.innerWidth - document.documentElement.clientWidth);
  }

  function onPointerDown(event) {
    if (event.pointerType === "touch" || event.button !== 0) return;
    var gutter = scrollbarGutter();
    if (gutter > 0 && event.clientX >= window.innerWidth - gutter) noteDrag();
  }

  function onPointerMove(event) {
    if (event.pointerType === "touch" || !event.buttons) return;
    noteDrag();
  }

  /* The greeting changes the size of the page. Resync while that is
     happening so the next real scroll is measured from where the
     browser actually is. An upward gesture stays shown. */
  function syncToLayout() {
    var upward = !dragMode && inputDir < 0;
    if (Date.now() - lastInputAt < USER_SCROLL_MS && !upward) return;
    var reading = metrics();
    if (!narrow.matches || reading.y <= THRESHOLD || upward) show();
    if (reading.y > reading.max) return;
    remember(reading.y, reading.max);
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
  /* Capture so the direction is stored before the browser applies the
     scroll. Keydown stays on the bubble so a control that already
     consumed the key (the phone-menu button) is left alone. */
  window.addEventListener("wheel", onWheel, { capture: true, passive: true });
  window.addEventListener("touchstart", onTouchStart, { capture: true, passive: true });
  window.addEventListener("touchmove", onTouchMove, { capture: true, passive: true });
  window.addEventListener("touchend", onTouchEnd, { capture: true, passive: true });
  window.addEventListener("touchcancel", onTouchEnd, { capture: true, passive: true });
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("pointerdown", onPointerDown, { passive: true });
  window.addEventListener("pointermove", onPointerMove, { passive: true });

  if (window.ResizeObserver) {
    var layoutObserver = new ResizeObserver(syncToLayout);
    layoutObserver.observe(document.documentElement);
    layoutObserver.observe(document.body);
    var mainEl = document.querySelector("main");
    if (mainEl) layoutObserver.observe(mainEl);
  }

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
