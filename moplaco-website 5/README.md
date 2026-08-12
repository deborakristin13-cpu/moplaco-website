# Moplaco Trading PLC — Website Redesign

**Prepared by:** Debora Kristin Samosir (IESE MBA Intern, June–August 2026)  
**Prepared for:** Heleanna Georgalis, General Manager, Moplaco Trading PLC  
**Status:** Design mockup — ready for developer implementation

---

## Project overview

This is a full multi-file website redesign for Moplaco Trading PLC (moplaco.com).
It replaces the existing site with a modern, internationally credible B2B design
suited to Moplaco's global buyer audience (roasters, importers, distributors across
40+ countries).

Galani Coffee (galanicoffee.com) — Moplaco's consumer-facing café brand — is
integrated as a dedicated tab/page within the same site rather than a separate
website, establishing a unified brand family.

---

## File structure

```
moplaco-website/
│
├── index.html              ← Main entry point (Moplaco homepage)
├── galani.html             ← Galani Coffee brand page
├── README.md               ← This file
│
├── css/
│   ├── tokens.css          ← Design tokens: colours, type scale, spacing
│   ├── base.css            ← Reset, typography, shared layout utilities
│   ├── components.css      ← Reusable UI components (nav, cards, buttons, forms)
│   ├── moplaco.css         ← Moplaco-specific section styles
│   └── galani.css          ← Galani-specific section styles
│
├── js/
│   ├── nav.js              ← Sticky nav, mobile menu, scroll behaviour
│   ├── tabs.js             ← Moplaco ↔ Galani tab switching
│   ├── scroll-reveal.js    ← Lightweight scroll-triggered fade-ins
│   └── form.js             ← Contact form validation and submission handling
│
├── pages/
│   ← (Optional) Separate HTML files per section if developer chooses
│     to split into a multi-page site instead of single-page tabs
│
└── assets/
    └── img/
        ← Place high-resolution photos here.
          Current mockup pulls images directly from moplaco.com and
          Galani's Wix CDN as placeholders. Replace with owned files
          before going live. See IMAGE NOTES below.
```

---

## Design system

### Colour palette (defined in css/tokens.css)

| Token                | Hex       | Usage                              |
|---------------------|-----------|------------------------------------|
| `--espresso`        | `#1C1008` | Primary dark bg, nav, hero         |
| `--espresso-deep`   | `#100A04` | Footer                             |
| `--espresso-mid`    | `#241508` | Galani dark sections, tab bar      |
| `--espresso-light`  | `#2E1E0C` | Card backgrounds, dividers         |
| `--gold`            | `#D4A847` | Moplaco primary accent, CTAs       |
| `--gold-galani`     | `#C8A96A` | Galani accent (slightly softer)    |
| `--parchment`       | `#F0E6CC` | Light section backgrounds, text on dark |
| `--parchment-warm`  | `#FAF6EE` | Alt light section background       |
| `--text-muted`      | `#7A6448` | Body text on dark backgrounds      |
| `--text-faint`      | `#4A3420` | Footer text, subtle labels         |
| `--border-dark`     | `#2E1E0C` | Dividers on dark backgrounds       |

### Typography

- **Display / headlines:** Playfair Display (Google Fonts) — 700 weight, used sparingly for h1/h2
- **Body / UI:** Inter (Google Fonts) — 400 and 600 weights
- Both loaded via Google Fonts in `<head>` of each HTML file.

### Type scale

| Role        | Size  | Weight | Font             |
|-------------|-------|--------|------------------|
| h1 hero     | 52px  | 700    | Playfair Display |
| h2 section  | 32px  | 700    | Playfair Display |
| h3 card     | 18px  | 600    | Inter            |
| eyebrow     | 11px  | 600    | Inter, uppercase, tracked |
| body        | 15px  | 400    | Inter            |
| small/label | 11px  | 400–600| Inter            |

### Spacing system (8px base grid)
`8 / 16 / 24 / 32 / 48 / 64 / 80px`

---

## Pages & sections

### index.html (Moplaco)
1. **Nav** — sticky, logo + links + "Request Samples" CTA + Galani tab switcher
2. **Hero** — full-bleed farm photo, headline, sub, two CTAs, year watermark
3. **Stats bar** — 5 key numbers on parchment background
4. **Our Story** — two-column: text left, timeline right
5. **Our Coffees & Origins** — origin tags card + photo grid
6. **Supply Chain** — 4-step horizontal process (Farm → Process → QC → Export)
7. **Sustainability & Social Impact** — two-column with community photos
8. **Ethiopian Coffee Insights** — 3-card education section
9. **Updates / Journal** — 3 latest post cards
10. **Galani bridge banner** — handoff to Galani page
11. **Contact & Inquiry form** — two-column: info left, form right
12. **Footer** — logo, links, social, copyright

### galani.html (Galani Coffee)
1. **Hero** — café interior photo, distinct warm tone
2. **Galani stats bar** — dark espresso background
3. **About Galani** — origin of name (River Gelan), brand story
4. **Our Cafés** — 5 location cards with hours and phone
5. **Learning** — SCA-certified course cards
6. **Photo strip** — 4-column café imagery
7. **Back-to-Moplaco bridge banner**
8. **Footer** — shared footer with Moplaco cross-link

---

## How to run locally

No build tools required. This is plain HTML/CSS/JS.

```bash
# Option 1: Open directly in browser
open index.html

# Option 2: Serve with Python (avoids any local CORS issues)
cd moplaco-website
python3 -m http.server 8000
# Then visit: http://localhost:8000
```

---

## How to deploy (migrate to moplaco.com)

1. **Purchase hosting** — recommend Netlify (free tier works), Vercel, or any shared hosting.
2. **Upload all files** — drag the entire `moplaco-website/` folder to hosting provider.
3. **Point domain** — in the moplaco.com domain registrar, update the DNS A record or CNAME to point to the new host. This is the only step that requires access to the domain registrar account.
4. **Replace placeholder images** — swap all `moplaco.com/assets/img/...` src paths with final owned image files placed in `assets/img/`.
5. **Connect contact form** — the form in `index.html` currently logs to console. Connect to a backend service such as Formspree (formspree.io — free tier available, no coding needed) by replacing the form action with your Formspree endpoint.

### Formspree setup (5 minutes, no developer needed)
```html
<!-- Replace this in index.html: -->
<form id="contact-form">

<!-- With this: -->
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

---

## Image notes

All images in this mockup are pulled from:
- `https://moplaco.com/assets/img/...` — existing Moplaco site images
- `https://static.wixstatic.com/...` — Galani's current Wix site images

**Before going live:** Replace all external image URLs with locally hosted files
in `assets/img/`. Recommended format: WebP with JPEG fallback. Aim for under
200KB per image for fast load times.

Suggested shots to commission or source from @moplaco_trading Instagram:
- Hero: wide landscape of Sheka farm or Yirgacheffe washing station
- Origins section: one portrait per major origin (Yirgacheffe, Sidamo, Guji, Harrar)
- Supply chain: picking, washing, drying beds, lab cupping, loading
- Galani: interior of Jacross branch, barista at work, cupping session

---

## Customisation guide for non-developers

The following changes can be made by editing HTML files directly in any text editor
(e.g. Notepad, TextEdit, VS Code):

| What to change             | Where to find it                        |
|----------------------------|-----------------------------------------|
| Phone number               | Search `+251` in index.html             |
| Email address              | Search `info@moplaco.com`               |
| Hero headline              | `<h1 class="hero-headline">` in index.html |
| Stats numbers              | `.stat-number` elements in index.html   |
| Café hours / phones        | `galani.html`, section id `cafes`       |
| Origin tags                | `.origin-tag` elements in index.html    |
| Journal posts              | Section id `journal` in index.html      |
| Colour palette             | `css/tokens.css` — change hex values    |

---

## Contact for handover questions

This project was prepared by Debora Kristin Samosir during her internship at
Moplaco Trading PLC (June–August 2026). For questions about design decisions
or implementation, contact via IESE Business School alumni network.
