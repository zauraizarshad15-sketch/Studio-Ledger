# Studio Ledger — Project 1: Responsive Frontend Interface

A responsive front end for a fictional small-studio site-tracking app, built for
the DecodeLabs Full Stack Project 1 brief: **HTML, CSS, and vanilla JavaScript
only — no frameworks.**

## Files

- `index.html` — semantic HTML5 structure (header/nav, hero, dashboard, main
  content grid, sidebar, footer)
- `styles.css` — mobile-first CSS using Grid for page layout, Flexbox for
  components, `clamp()` for fluid type, and a small design-token system
- `script.js` — nav toggle, a live "viewport reading" badge, and an
  interactive site-log widget with `localStorage` persistence

## How it meets the brief

| Requirement | Where |
|---|---|
| Semantic landmarks | `<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>` |
| CSS Grid for macro layout | page shell, stat grid, project grid, two-column content area |
| Flexbox for micro components | nav list, buttons, log entries |
| Mobile-first breakpoints | single column by default, `min-width: 768px` (tablet) and `min-width: 1024px` (desktop) |
| Fluid typography | `clamp()` on headings and hero copy |
| Basic state / interactivity | mobile menu toggle, live breakpoint badge, add/complete/remove site-log entries |
| Accessibility | skip link, visible focus states, `aria-live`/`aria-label`s on the dynamic widget, reduced-motion support |

## Running it

No build step. Open `index.html` in a browser, or serve the folder with any
static server, e.g.:

```
npx serve .
```

Resize the browser window and watch the "Viewport" reading in the hero update
live across the mobile → tablet → desktop breakpoints.
