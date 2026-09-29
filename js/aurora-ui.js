(function () {
  var modal = document.getElementById("contact-dialog");
  if (!modal) return;

  var opener = null;
  var pageParts = document.querySelectorAll("header, main, footer");

  function tabbable() {
    return Array.prototype.slice.call(
      modal.querySelectorAll("a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex='-1'])")
    ).filter(function (el) {
      return !el.hidden && el.getAttribute("aria-hidden") !== "true";
    });
  }

  function isOpen() {
    return modal.classList.contains("open");
  }

  function setPageInert(on) {
    pageParts.forEach(function (el) {
      if ("inert" in el) el.inert = on;
    });
  }

  function openModal(trigger) {
    opener = trigger || document.activeElement;
    modal.hidden = false;
    modal.classList.add("open");
    setPageInert(true);
    modal.focus();
  }

  function closeModal() {
    if (!isOpen()) return;
    modal.classList.remove("open");
    modal.hidden = true;
    setPageInert(false);
    var back = opener;
    opener = null;
    if (back && typeof back.focus === "function") back.focus();
  }

  document.querySelectorAll("[data-contact]").forEach(function (btn) {
    btn.setAttribute("aria-haspopup", "dialog");
    btn.setAttribute("aria-controls", "contact-dialog");
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      openModal(btn);
    });
  });

  modal.querySelectorAll("[data-close]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      closeModal();
    });
  });

  modal.addEventListener("click", function (e) {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", function (e) {
    if (!isOpen()) return;
    if (e.key === "Escape") {
      e.preventDefault();
      closeModal();
      return;
    }
    if (e.key !== "Tab") return;
    var items = tabbable();
    if (!items.length) {
      e.preventDefault();
      modal.focus();
      return;
    }
    var first = items[0];
    var last = items[items.length - 1];
    var active = document.activeElement;
    if (e.shiftKey) {
      if (active === first || active === modal || !modal.contains(active)) {
        e.preventDefault();
        last.focus();
      }
    } else if (active === last || active === modal || !modal.contains(active)) {
      e.preventDefault();
      first.focus();
    }
  });

  document.addEventListener("focusin", function (e) {
    if (!isOpen()) return;
    if (modal.contains(e.target)) return;
    var items = tabbable();
    if (items.length) items[0].focus();
    else modal.focus();
  });

  var form = modal.querySelector("form");
  if (!form) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var status = document.getElementById("contact-status");
    if (!status) return;
    status.hidden = false;
    status.textContent = "Nothing was sent. This form is a demo and does not deliver messages.";
  });
})();
