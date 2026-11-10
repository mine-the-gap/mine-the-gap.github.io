/* Light/dark theme toggle (the same as app.minethegap.eu's core/theme.js). Default is automatic (follows the OS); one header button flips light <-> dark.
   Loaded synchronously in <head> so a saved choice is on <html> before the first paint (no flash). CSP
   forbids inline scripts, so this lives in a static file. Key: mtg-theme, one of "light" / "dark"
   (absent = automatic). The sun/moon icon is swapped by CSS from the same state, so it needs no JS. */
(function () {
  "use strict";
  var root = document.documentElement, KEY = "mtg-theme",
      mq = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function apply(value) {
    if (value === "light" || value === "dark") root.setAttribute("data-theme", value);
    else root.removeAttribute("data-theme");  // automatic: let the OS decide
  }
  function isDark() {
    var v = root.getAttribute("data-theme");
    if (v === "dark") return true;
    if (v === "light") return false;
    return !!(mq && mq.matches);  // automatic
  }

  apply(stored());  // before paint

  // Delegated: the button lives in <project-header>, which is rendered after this script runs.
  document.addEventListener("click", function (e) {
    var btn = e.target.closest && e.target.closest("[data-theme-toggle]");
    if (!btn) return;
    var next = isDark() ? "light" : "dark";
    apply(next);
    try { localStorage.setItem(KEY, next); } catch (err) {}
  });
})();
