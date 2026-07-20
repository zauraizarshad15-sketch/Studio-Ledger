(function () {
  "use strict";

  /* ------------------------------------------------------------------
     Mobile nav toggle
     ------------------------------------------------------------------ */
  var navToggle = document.getElementById("navToggle");
  var nav = document.getElementById("primary-nav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var isOpen = nav.getAttribute("data-state") === "open";
      nav.setAttribute("data-state", isOpen ? "closed" : "open");
      navToggle.setAttribute("aria-expanded", String(!isOpen));
    });

    // Close the mobile menu after a link is chosen
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 767px)").matches) {
          nav.setAttribute("data-state", "closed");
          navToggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  /* ------------------------------------------------------------------
     Live viewport reading — demonstrates the responsive breakpoints
     used throughout the layout (mobile-first, 768px, 1024px)
     ------------------------------------------------------------------ */
  var reading = document.getElementById("viewportReading");

  function currentBreakpointLabel() {
    var w = window.innerWidth;
    if (w >= 1024) return "Desktop";
    if (w >= 768) return "Tablet";
    return "Mobile";
  }

  function updateViewportReading() {
    if (!reading) return;
    reading.textContent =
      "Viewport: " + currentBreakpointLabel() + " · " + window.innerWidth + "px";
  }

  updateViewportReading();
  window.addEventListener("resize", updateViewportReading);

  /* ------------------------------------------------------------------
     Site log widget — add / complete / remove entries, persisted
     locally so a studio's log survives a page refresh.
     ------------------------------------------------------------------ */
  var STORAGE_KEY = "studio-ledger-site-log";

  var form = document.getElementById("logForm");
  var input = document.getElementById("logInput");
  var list = document.getElementById("logList");
  var emptyMessage = document.getElementById("logEmpty");

  function loadEntries() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      return [];
    }
  }

  function saveEntries(entries) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch (err) {
      /* storage unavailable — fail silently, state still lives in memory */
    }
  }

  var entries = loadEntries();

  function formatTime(iso) {
    var date = new Date(iso);
    return date.toLocaleDateString(undefined, { month: "short", day: "numeric" }) +
      " · " +
      date.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
  }

  function render() {
    if (!list) return;
    list.innerHTML = "";

    if (entries.length === 0) {
      emptyMessage.hidden = false;
      return;
    }
    emptyMessage.hidden = true;

    entries.forEach(function (entry) {
      var item = document.createElement("li");
      item.className = "log-entry" + (entry.done ? " is-done" : "");

      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = entry.done;
      checkbox.setAttribute("aria-label", "Mark entry complete: " + entry.text);
      checkbox.addEventListener("change", function () {
        entry.done = checkbox.checked;
        saveEntries(entries);
        render();
      });

      var textWrap = document.createElement("span");
      textWrap.className = "log-entry-text";

      var textEl = document.createElement("span");
      textEl.textContent = entry.text;

      var timeEl = document.createElement("span");
      timeEl.className = "log-entry-time";
      timeEl.textContent = formatTime(entry.createdAt);

      textWrap.appendChild(textEl);
      textWrap.appendChild(timeEl);

      var removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.textContent = "Remove";
      removeBtn.setAttribute("aria-label", "Remove entry: " + entry.text);
      removeBtn.addEventListener("click", function () {
        entries = entries.filter(function (e) { return e.id !== entry.id; });
        saveEntries(entries);
        render();
      });

      item.appendChild(checkbox);
      item.appendChild(textWrap);
      item.appendChild(removeBtn);
      list.appendChild(item);
    });
  }

  if (form && input) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var value = input.value.trim();
      if (!value) return;

      entries.unshift({
        id: Date.now().toString(36) + Math.random().toString(36).slice(2),
        text: value,
        done: false,
        createdAt: new Date().toISOString()
      });

      saveEntries(entries);
      render();
      input.value = "";
      input.focus();
    });
  }

  render();
})();
