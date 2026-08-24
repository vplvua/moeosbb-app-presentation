# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A [Slidev](https://sli.dev/) presentation for the «Моє ОСББ» mobile app (resident cabinet design, in Ukrainian). The deck was converted from a Claude Design canvas at `../../moeosbb-mobile-app/docs/design/canvases/presentation.dc.html` — that canvas is the content source of truth if the two ever diverge.

## Commands

- `npm run dev` — dev server with live reload at http://localhost:3030
- `npm run build` — build the static SPA into `dist/` (deployed to Netlify/Vercel per `netlify.toml` / `vercel.json`)
- `npm run export` — export to PDF/PNG/PPTX (uses `playwright-chromium`)

There are no tests or linters.

## Structure

- `slides.md` — deck headmatter plus the slide order: each slide is pulled in via `src: ./pages/NN-name.md`. To reorder or drop slides, edit only this file. The headmatter sets `canvasWidth: 1920`, so all sizes in slides use the original design's 1920×1080 pixel values.
- `pages/NN-name.md` — one file per slide (16 total, numbered in deck order). Each carries its own frontmatter (`layout: full`, `class: mo` for light slides, `class: mo dark` for dark ones) and hand-built HTML content. The last HTML comment in a file is that slide's presenter notes.
- `style.css` — brand tokens and reusable classes: `.kicker`, `.h` (title), `.bullets`/`.bul` (dot bullets, `.bul.red` variant), `.n` (numbered item, number via `data-n`), `.card`, `.quote` (`.quote.green`), `.chip`, `.phone` (phone screenshot: set width via `--pw`, corner radius scales automatically).
- `public/screens/` — phone-screen PNGs captured from the mobile app's design canvases; `public/logo/` — brand logos copied from the same canvases repo.
- `scripts/capture-screens.mjs` — regenerates `public/screens/` with Playwright. Serve the canvases dir first (`python3 -m http.server 8931` in `../../moeosbb-mobile-app/docs/design/canvases`), then run the script. Edit its `SHOTS` map to add screens.

## Gotchas

- Do NOT use short class names that collide with UnoCSS utilities in slide HTML (e.g. `class="b"` applies `border: 1px solid` — that's why the bullet class is `bul`).
- Keep no blank lines inside a slide's HTML block, otherwise markdown-it may start parsing the content as Markdown.
