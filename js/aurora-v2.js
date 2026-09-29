(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function initHeroShift() {
    var hero = document.querySelector(".hero");
    var media = hero && hero.querySelector(".hero-media");
    if (!hero || !media || reduce) return;

    var modal = document.getElementById("contact-dialog");
    var onScreen = true;
    var frame = 0;
    var x = 0;
    var y = 0;

    function paint() {
      frame = 0;
      if ((modal && !modal.hidden) || !onScreen) {
        media.style.setProperty("--shift-x", "0px");
        media.style.setProperty("--shift-y", "0px");
        return;
      }
      media.style.setProperty("--shift-x", x.toFixed(2) + "px");
      media.style.setProperty("--shift-y", y.toFixed(2) + "px");
    }

    function queue() {
      if (!frame) frame = window.requestAnimationFrame(paint);
    }

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        onScreen = entries[0].isIntersecting;
        if (!onScreen) {
          x = 0;
          y = 0;
          queue();
        }
      }).observe(hero);
    }

    hero.addEventListener("pointermove", function (event) {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
      var box = hero.getBoundingClientRect();
      x = Math.max(-12, Math.min(12, ((event.clientX - box.left) / box.width - 0.5) * 24));
      y = Math.max(-12, Math.min(12, ((event.clientY - box.top) / box.height - 0.5) * 24));
      queue();
    });

    hero.addEventListener("pointerleave", function (event) {
      if (event.pointerType && event.pointerType !== "mouse" && event.pointerType !== "pen") return;
      x = 0;
      y = 0;
      queue();
    });
  }

  function initTabs() {
    var root = document.querySelector(".chapters");
    if (!root || root.querySelector("[role='tablist']")) return;
    var panels = Array.prototype.slice.call(root.querySelectorAll("article.chapter"));
    if (!panels.length) return;

    var list = document.createElement("div");
    list.setAttribute("role", "tablist");
    list.setAttribute("aria-label", "About James");
    var tabs = panels.map(function (panel, index) {
      var heading = panel.querySelector("h2");
      var kicker = panel.querySelector(".kicker");
      var tab = document.createElement("button");
      tab.type = "button";
      tab.id = "tab-" + panel.id.replace(/^ch-/, "");
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-controls", panel.id);
      tab.textContent = ((kicker ? kicker.textContent.trim() + " " : "") + heading.textContent.trim());
      panel.setAttribute("role", "tabpanel");
      panel.setAttribute("aria-labelledby", tab.id);
      panel.tabIndex = 0;
      list.appendChild(tab);
      return tab;
    });

    function select(index, focusTab) {
      tabs.forEach(function (tab, i) {
        var on = i === index;
        tab.setAttribute("aria-selected", on ? "true" : "false");
        tab.tabIndex = on ? 0 : -1;
        document.getElementById(tab.getAttribute("aria-controls")).hidden = !on;
      });
      if (focusTab) tabs[index].focus();
    }

    select(0, false);
    root.insertBefore(list, root.firstChild);
    root.classList.add("chapters--tabs");

    list.addEventListener("keydown", function (event) {
      var current = tabs.findIndex(function (tab) {
        return tab.getAttribute("aria-selected") === "true";
      });
      var next = null;
      if (event.key === "ArrowRight") next = (current + 1) % tabs.length;
      else if (event.key === "ArrowLeft") next = (current - 1 + tabs.length) % tabs.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = tabs.length - 1;
      if (next === null) return;
      event.preventDefault();
      select(next, true);
    });

    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () {
        select(index, false);
      });
    });
  }

  function initProjects() {
    var bar = document.querySelector(".filter");
    var tiles = Array.prototype.slice.call(document.querySelectorAll(".tile"));
    if (bar) {
      bar.hidden = false;
      var buttons = Array.prototype.slice.call(bar.querySelectorAll("[data-filter]"));
      var count = bar.querySelector(".filter-count");
      buttons.forEach(function (button) {
        button.addEventListener("click", function () {
          var tag = button.getAttribute("data-filter");
          var shown = 0;
          tiles.forEach(function (tile) {
            var tags = (tile.getAttribute("data-tags") || "").split(/\s+/);
            var match = tag === "all" || tags.indexOf(tag) !== -1;
            tile.hidden = !match;
            if (match) {
              shown += 1;
              tile.classList.add("is-in");
            }
          });
          buttons.forEach(function (item) {
            item.setAttribute("aria-pressed", item === button ? "true" : "false");
          });
          if (count) count.textContent = "Showing " + shown + " of " + tiles.length;
        });
      });
    }

    tiles.forEach(function (tile) {
      var more = tile.querySelector(".more");
      var code = tile.querySelector("a.code");
      if (!more || !code || tile.querySelector(".more-toggle")) return;
      var toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "more-toggle code";
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-controls", more.id);
      toggle.textContent = "More";
      more.hidden = true;
      var slot = code.closest("p") || code;
      slot.parentNode.insertBefore(toggle, slot);
      toggle.addEventListener("click", function () {
        var open = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", open ? "false" : "true");
        toggle.textContent = open ? "More" : "Less";
        more.hidden = open;
      });
    });
  }

  function initReveal() {
    if (reduce || !("IntersectionObserver" in window)) return;
    var nodes = document.querySelectorAll(".glass, .chapters, .orbit, .tile, .band .cap");
    if (!nodes.length) return;
    document.documentElement.classList.add("js-reveal");
    function show(node) {
      node.classList.add("is-in");
      watcher.unobserve(node);
    }
    var watcher = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) show(entry.target);
      });
    }, { threshold: 0.15 });
    function showPassed() {
      nodes.forEach(function (node) {
        if (node.classList.contains("is-in")) return;
        var rect = node.getBoundingClientRect();
        if (rect.bottom <= 0) show(node);
      });
    }
    nodes.forEach(function (node) {
      node.classList.add("reveal");
      watcher.observe(node);
    });
    window.addEventListener("scroll", showPassed, { passive: true });
    showPassed();
  }

  function start() {
    initHeroShift();
    initTabs();
    initProjects();
    initReveal();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
