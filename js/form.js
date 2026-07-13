/* =============================================================
   form.js — Contact tabs, DHL-style sample estimator, form submission

   TO CONNECT TO EMAIL (no coding needed):
   1. Go to https://formspree.io and create a free account.
   2. Create a new form — you'll get an endpoint like:
      https://formspree.io/f/xabc1234
   3. Replace FORMSPREE_ENDPOINT below with that URL.
   4. Done — submissions from all three contact forms (Direct Order,
      On-Site Cupping, Sample Request) will arrive at info@moplaco.com,
      each tagged with its inquiry_type field.
   ============================================================= */

(function () {
  'use strict';

  /* ── CONFIGURATION — edit this ─────────────────────────── */
  var FORMSPREE_ENDPOINT = 'https://formspree.io/f/REPLACE_WITH_YOUR_ID';
  /* ────────────────────────────────────────────────────────── */

  var status = document.getElementById('form-status');

  /* ── Contact method tabs ────────────────────────────────── */
  var tabs   = document.querySelectorAll('.contact-tab');
  var panels = document.querySelectorAll('.contact-panel');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      panels.forEach(function (p) {
        p.classList.remove('active');
        p.hidden = true;
      });

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      var panel = document.getElementById('form-' + tab.dataset.panel);
      if (panel) {
        panel.classList.add('active');
        panel.hidden = false;
      }

      if (status) status.style.display = 'none';
    });
  });

  /* ── DHL-style sample shipping estimator ────────────────── */
  /* Indicative zone rates (USD) — base handling fee + per-kg freight.
     Modelled on standard DHL Express express-document/parcel pricing
     tiers from Ethiopia. Replace with live carrier rates if available. */
  var ZONES = {
    africa_me: { label: 'East Africa & Middle East', base: 28, perKg: 9  },
    europe:    { label: 'Europe',                     base: 38, perKg: 13 },
    asia:      { label: 'Asia Pacific',               base: 42, perKg: 15 },
    americas:  { label: 'Americas',                   base: 48, perKg: 17 },
    row:       { label: 'Rest of World',              base: 52, perKg: 19 }
  };

  var zoneSel      = document.getElementById('s-zone');
  var weightInput  = document.getElementById('s-weight');
  var estBaseEl    = document.getElementById('est-base');
  var estFreightEl = document.getElementById('est-freight');
  var estTotalEl   = document.getElementById('est-total');

  function updateEstimate() {
    if (!zoneSel || !weightInput || !estTotalEl) return;

    var zone = ZONES[zoneSel.value] || ZONES.asia;
    var weight = parseFloat(weightInput.value);
    if (!weight || weight < 0.1) weight = 0.1;

    var freight = zone.perKg * weight;
    var total   = zone.base + freight;

    estBaseEl.textContent    = '$' + zone.base.toFixed(2);
    estFreightEl.textContent = '$' + freight.toFixed(2) + ' (' + weight.toFixed(2) + ' kg × $' + zone.perKg.toFixed(2) + '/kg)';
    estTotalEl.textContent   = '$' + total.toFixed(2) + ' USD (est.)';
  }

  if (zoneSel)     zoneSel.addEventListener('change', updateEstimate);
  if (weightInput) weightInput.addEventListener('input', updateEstimate);
  updateEstimate();

  /* ── Shared submit handler for all three contact forms ─── */
  ['form-order', 'form-cupping', 'form-samples'].forEach(function (id) {
    var form = document.getElementById(id);
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var emailField = form.querySelector('[name="email"]');
      var email = emailField ? emailField.value.trim() : '';

      if (!email || !isValidEmail(email)) {
        showStatus('Please enter a valid email address.', 'error');
        return;
      }

      var submitBtn = form.querySelector('.form-submit');
      var originalLabel = submitBtn.textContent;
      submitBtn.textContent = 'Sending…';
      submitBtn.disabled = true;

      var payload = {};
      new FormData(form).forEach(function (value, key) {
        payload[key] = value;
      });

      /* Attach the computed shipping estimate for sample requests */
      if (id === 'form-samples' && estTotalEl) {
        payload.estimated_delivery_cost = estTotalEl.textContent;
      }

      fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      })
      .then(function (response) {
        if (response.ok) {
          showStatus('Thank you — we\'ll be in touch within 48 hours.', 'success');
          form.reset();
          updateEstimate();
        } else {
          showStatus('Something went wrong. Please email us directly at info@moplaco.com.', 'error');
        }
      })
      .catch(function () {
        showStatus('Could not send. Please email us at info@moplaco.com.', 'error');
      })
      .finally(function () {
        submitBtn.textContent = originalLabel;
        submitBtn.disabled = false;
      });
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
