/* =============================================================
   form.js — Contact form validation and submission
   
   TO CONNECT TO EMAIL (no coding needed):
   1. Go to https://formspree.io and create a free account.
   2. Create a new form — you'll get an endpoint like:
      https://formspree.io/f/xabc1234
   3. Replace FORMSPREE_ENDPOINT below with that URL.
   4. Done — submissions will arrive at info@moplaco.com.
   ============================================================= */

(function () {
  'use strict';

  /* ── CONFIGURATION — edit this ─────────────────────────── */
  var FORMSPREE_ENDPOINT = 'https://formspree.io/f/REPLACE_WITH_YOUR_ID';
  /* ────────────────────────────────────────────────────────── */

  var form    = document.getElementById('contact-form');
  var status  = document.getElementById('form-status');

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    /* Basic validation */
    var name   = form.querySelector('[name="name"]').value.trim();
    var email  = form.querySelector('[name="email"]').value.trim();
    var origin = form.querySelector('[name="origin"]').value;

    if (!name || !email) {
      showStatus('Please fill in your name and email.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showStatus('Please enter a valid business email address.', 'error');
      return;
    }

    /* Show loading state */
    var submitBtn = form.querySelector('.form-submit');
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;

    /* Submit to Formspree */
    fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        name:    name,
        email:   email,
        origin:  origin,
        message: form.querySelector('[name="message"]').value.trim()
      })
    })
    .then(function (response) {
      if (response.ok) {
        showStatus('Thank you — we\'ll be in touch within 48 hours.', 'success');
        form.reset();
      } else {
        showStatus('Something went wrong. Please email us directly at info@moplaco.com.', 'error');
      }
    })
    .catch(function () {
      showStatus('Could not send. Please email us at info@moplaco.com.', 'error');
    })
    .finally(function () {
      submitBtn.textContent = 'Send Inquiry';
      submitBtn.disabled = false;
    });
  });

  /* ── Helpers ────────────────────────────────────────────── */

  function showStatus(message, type) {
    if (!status) return;
    status.textContent = message;
    status.className = 'form-status form-status--' + type;
    status.style.display = 'block';
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

})();
