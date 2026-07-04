# One-Pager Animation Layer (index.html)

Added 2026-07-04. Professional scroll animation layer for the landing page
(`index.html` only — no other page touched).

## What it adds

| Piece | Where |
|---|---|
| `animations.css` | All animation styles, namespaced `al-` — new file |
| `animations.js`  | Tags elements + drives reveals/counters — new file |
| 2 include lines  | `index.html` `<head>` (marked with an `ANIMATION LAYER` comment) |
| Entrance-fix     | `index.html` dc-script: the 2.5s fallback used to force-activate **all** sections right after load, so every scroll entrance had already finished before you scrolled — that's why the page looked static. It now only activates sections already in view, and the scroll handler acts as the safety net. |

Effects: scroll-reveal (blur + rise, staggered) for section badges/headings/
sub-text/callouts/CTA band/footer, scroll progress bar, count-up stats,
cursor spotlight (desktop), sheen sweep on primary CTAs, hero tile bob, and
scroll-driven parallax on decorative art (modern browsers only, via
`animation-timeline`). Honours `prefers-reduced-motion`; RTL-safe (vertical
motion only). If the JS ever fails, all tagged elements are force-revealed —
content can never be left hidden (`window.__alRevealAll()` also does this
manually from the console).

## How to revert (full restore of the previous design)

```bash
git revert <animation-commit-sha>        # cleanest
# or, equivalently by hand:
#   1. delete animations.css, animations.js
#   2. remove the 3 marked lines in index.html <head>
#   3. git checkout <pre-anim-sha> -- index.html
```

The layer never rewrites existing markup/styles — it only adds classes and
CSS custom properties at runtime — so removal is guaranteed to restore the
exact previous look.
