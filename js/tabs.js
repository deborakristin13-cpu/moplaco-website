/* =============================================================
   tabs.js — Moplaco ↔ Galani tab / page switching
   Called from inline onclick OR imported as a module.
   ============================================================= */

(function () {
  'use strict';

  /* All elements that trigger a page switch */
  const triggers = document.querySelectorAll('[data-tab]');
  const pages    = document.querySelectorAll('.site-page');
  const tabBtns  = document.querySelectorAll('.tab-bar__tab');

  function showPage(name) {
    /* Hide all pages */
    pages.forEach(function (p) {
      p.hidden = true;
      p.setAttribute('aria-hidden', 'true');
    });

    /* Show target page */
    const target = document.getElementById('page-' + name);
    if (target) {
      target.hidden = false;
      target.setAttribute('aria-hidden', 'false');
      /* Scroll to top of content, not entire window */
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    /* Update tab bar active state */
    tabBtns.forEach(function (btn) {
      btn.classList.remove('active--moplaco', 'active--galani');
      if (btn.dataset.tab === name) {
        btn.classList.add('active--' + name);
      }
    });

    /* Update URL hash without full reload */
    history.pushState(null, '', '#' + name);
  }

  /* Attach click handlers to all tab triggers */
  triggers.forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      showPage(el.dataset.tab);
    });
  });

  /* Handle browser back/forward */
  window.addEventListener('popstate', function () {
    const hash = window.location.hash.replace('#', '') || 'moplaco';
    showPage(hash);
  });

  /* On load: show page based on URL hash */
  (function init() {
    const hash = window.location.hash.replace('#', '') || 'moplaco';
    showPage(hash);
  })();

  /* Expose globally for inline onclick fallback */
  window.showPage = showPage;

})();
