/* =============================================================
   scroll-reveal.js — Lightweight scroll-triggered fade-ins
   Add class "reveal" to any element to opt in.
   Respects prefers-reduced-motion automatically (via CSS).
   ============================================================= */

(function () {
  'use strict';

  /* Exposed so content injected later (e.g. galani.html fetched
     dynamically into #page-galani by index.html) can register its
     own .reveal elements — the initial run below only sees whatever
     is in the DOM at DOMContentLoaded. */
  function setupScrollReveal(root) {
    const elements = (root || document).querySelectorAll('.reveal:not(.revealed)');

    if (!elements.length) return;

    /* Use IntersectionObserver if available (all modern browsers) */
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              observer.unobserve(entry.target); /* Fire once only */
            }
          });
        },
        { threshold: 0.12 }
      );

      elements.forEach(function (el) {
        observer.observe(el);
      });

    } else {
      /* Fallback: reveal all immediately */
      elements.forEach(function (el) {
        el.classList.add('revealed');
      });
    }
  }

  window.setupScrollReveal = setupScrollReveal;
  setupScrollReveal(document);

})();
