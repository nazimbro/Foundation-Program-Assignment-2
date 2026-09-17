# Marquee — Movie Explorer

A responsive movie/TV explorer built with React, Tailwind CSS, and the [TVMaze API](https://www.tvmaze.com/api). Browse the full catalogue, search by title, and open a details modal for any title — no API key required.

**Live demo:** (https://foundation-program-assignment-2.vercel.app/)

---

## Features

- **Home page** — navbar, hero banner with a call-to-action, footer.
- **Movie Listing page** — debounced live search (`/search/shows?q=`) that falls back to the full catalogue (`/shows`) when the search box is empty.
- **Movie Card** — poster, title, rating, release year, "See details" button.
- **Details Modal** — backdrop image, overview, rating, release date, genres, network/status. Closes via the ✕ button, the Close button, the backdrop, or the Escape key.
- Fully responsive: single column on mobile, up to a 4-column grid on desktop.
- Loading skeletons and error states for every network call.

---

## Tech stack

| Layer      | Choice                                   |
|------------|-------------------------------------------|
| Framework  | React 18 + Vite                          |
| Routing    | React Router 6                           |
| Styling    | Tailwind CSS                             |
| Data       | TVMaze API (free, no key, CORS-enabled)  |

---

## Project structure

```
movie-explorer/
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── src/
│   ├── main.jsx              # React entry point + router setup
│   ├── App.jsx                # Layout shell + route definitions
│   ├── index.css              # Tailwind directives + global styles
│   ├── api/
│   │   └── tvmaze.js          # All TVMaze API calls + data normalization
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── HeroBanner.jsx
│   │   ├── SearchBar.jsx
│   │   ├── MovieCard.jsx
│   │   ├── MovieGrid.jsx
│   │   └── MovieModal.jsx
│   └── pages/
│       ├── Home.jsx
│       └── MovieListing.jsx
└── README.md
```

### File-by-file notes

- **`api/tvmaze.js`** — the only file that talks to the network. `getAllShows()` and `searchShows()` hit TVMaze; `normalizeShow()` converts TVMaze's raw show object (which has inconsistent/nullable fields) into a flat shape the UI can rely on: `{ id, title, poster, year, rating, summary, genres, network, status }`.
- **`pages/MovieListing.jsx`** — owns all state for the listing page: the cached full catalogue, the currently displayed list, loading/error flags, and the selected movie for the modal. Search is debounced 400ms so it doesn't fire a request on every keystroke.
- **`components/MovieModal.jsx`** — a controlled component (`movie` + `onClose`). Locks page scroll while open and listens for Escape, both cleaned up on unmount.
- Every component is presentational and stateless except `MovieListing`, keeping state management in one place.

---

## Getting started

### Prerequisites
- [Node.js](https://nodejs.org/) 18 or later
- npm (comes with Node.js)

### Installation

```bash
# 1. Clone your repository
git clone <your-repo-url>
cd movie-explorer

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

The app runs at `http://localhost:5173`.

No `.env` file or API key is needed — TVMaze's public endpoints are used directly from the browser.

### Available scripts

| Command           | What it does                              |
|--------------------|--------------------------------------------|
| `npm run dev`      | Starts the Vite dev server with hot reload |
| `npm run build`    | Builds an optimized production bundle to `dist/` |
| `npm run preview`  | Serves the production build locally for a final check |

---

## Testing instructions

This project doesn't include an automated test suite — verify it manually with the checklist below (all confirmed working on the build produced with this project):

1. `npm run dev` → open `http://localhost:5173`.
2. **Home page**: hero loads, "Explore now" navigates to `/movies`.
3. **Movie Listing page**: full catalogue loads with skeleton placeholders while fetching.
4. Type a title (e.g. "girls") into the search bar → grid updates to matching results after a brief debounce.
5. Clear the search box → grid returns to the full catalogue.
6. Click **See details** on any card → modal opens with poster, rating, release date, genres, and overview.
7. Close the modal via the **✕** icon, the **❌ Close** button, clicking the dark backdrop, and pressing **Esc** — all four should work.
8. Resize the browser (or use DevTools device mode) from mobile to desktop width → layout goes from a single column to a 3–4 column grid.
9. `npm run build` → should complete with no errors (already verified for you in this delivery).

---

## Deployment guide

Any static host works, since this is a fully client-side Vite app. Two common options:

### Vercel
```bash
npm install -g vercel
vercel
```
Accept the defaults — Vercel auto-detects Vite (`build` command: `vite build`, output directory: `dist`).

### Netlify
```bash
npm run build
```
Then either drag the generated `dist/` folder into the Netlify dashboard, or connect your GitHub repo with:
- **Build command:** `npm run build`
- **Publish directory:** `dist`

### GitHub Pages
1. `npm install -D gh-pages`
2. Add to `package.json`: `"homepage": "https://<username>.github.io/<repo-name>"` and a script `"deploy": "gh-pages -d dist"`.
3. `npm run build && npm run deploy`

After deploying, update the **Live demo** link at the top of this README.

---

## Design notes

The visual identity leans into the "cinema marquee" idea directly: a near-black theater backdrop, a single warm amber accent used deliberately for CTAs/ratings/links, a condensed display typeface (Big Shoulders Display) for headlines, and a filmstrip sprocket-hole motif in the hero — rather than a generic dashboard/SaaS look.
