# Boxes & Papers by Kaffy: sample website (React)

React + Vite sample website for TBL Kaffy Resources: a wholesale homepage and a store dashboard preview.

## Run it

```bash
npm install
npm run dev
```

Then open the address it prints (usually http://localhost:5173).

- Homepage: `http://localhost:5173/`
- Dashboard preview: `http://localhost:5173/#/dashboard`

## Project structure

```
src/
├── main.jsx              → starts the app
├── App.jsx               → switches between homepage and dashboard
├── data/products.js      → products, prices, stock, WhatsApp number (edit this)
├── context/CartContext.jsx → cart state (add, remove, totals, toast)
├── pages/
│   ├── Home.jsx          → homepage, puts all sections together
│   └── Dashboard.jsx     → order & stock dashboard preview
├── components/
│   ├── Header.jsx        → logo, menu, cart button
│   ├── Hero.jsx          → top section
│   ├── BulkCalculator.jsx→ live bulk price calculator
│   ├── TrustStrip.jsx    → delivery / payment / factory points
│   ├── Buyers.jsx        → retailers, event planners, companies
│   ├── Catalogue.jsx     → product cards with tier prices and filters
│   ├── QuoteForm.jsx     → bulk quote form (sends to WhatsApp)
│   ├── Sections.jsx      → occasions, how it works, reviews, visit/FAQ, CTA
│   ├── Overlays.jsx      → cart drawer, Paystack demo, toast, WhatsApp button
│   ├── Footer.jsx
│   ├── ProductArt.jsx    → product illustrations (replace with real photos)
│   └── Icons.jsx
└── styles/
    ├── global.css
    └── dashboard.css
```

## Put it online (free)

```bash
npm run build
```

Then drag the `dist` folder onto https://app.netlify.com/drop and send Kaffy the link.
Or push to GitHub and import the repo on Vercel (it detects Vite automatically).

## Before sending

- Prices and stock in `src/data/products.js` are placeholders.
- Product images are illustrations. Swap in Kaffy's real photos for the full build.
- The Paystack button is a demo. The full build uses WooCommerce + Paystack for real payments, stock and staff accounts.

The old plain-HTML version is in `_old-html-version/` for reference.
