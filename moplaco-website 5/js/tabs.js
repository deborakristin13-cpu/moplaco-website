/* =============================================================
   tabs.js — Moplaco ↔ Galani tab / page switching
   Only responds to 'moplaco' and 'galani' hashes.
   All other hashes (#story, #contact, etc.) are left to
   normal browser anchor scroll behaviour — not intercepted.
   ============================================================= */

(function () {
  'use strict';

  /* Valid tab names only — anything else is a scroll anchor */
  const VALID_TABS = ['moplaco', 'galani'];

  const pages   = document.querySelectorAll('.site-page');
  const tabBtns = document.querySelectorAll('.tab-bar__tab');

  function isValidTab(name) {
    return VALID_TABS.indexOf(name) !== -1;
  }

  function showPage(name) {
    /* Only act on known tab names */
    if (!isValidTab(name)) return;

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

  /* Attach click handlers to [data-tab] elements only */
  document.querySelectorAll('[data-tab]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      showPage(el.dataset.tab);
    });
  });

  /* Handle browser back/forward — only for valid tab hashes */
  window.addEventListener('popstate', function () {
    const hash = window.location.hash.replace('#', '');
    if (isValidTab(hash)) {
      showPage(hash);
    }
  });

  /* On load: only switch tab if hash is a valid tab name.
     Scroll anchors (#story, #contact, etc.) are left alone
     so the browser handles them naturally. */
  (function init() {
    const hash = window.location.hash.replace('#', '');
    if (isValidTab(hash)) {
      showPage(hash);
    } else {
      /* No tab hash — show moplaco by default without touching the URL */
      pages.forEach(function (p) {
        p.hidden = true;
        p.setAttribute('aria-hidden', 'true');
      });
      const defaultPage = document.getElementById('page-moplaco');
      if (defaultPage) {
        defaultPage.hidden = false;
        defaultPage.setAttribute('aria-hidden', 'false');
      }
      tabBtns.forEach(function (btn) {
        btn.classList.remove('active--moplaco', 'active--galani');
        if (btn.dataset.tab === 'moplaco') {
          btn.classList.add('active--moplaco');
        }
      });
    }
  })();

  /* Expose globally for inline onclick fallback */
  window.showPage = showPage;

})();
