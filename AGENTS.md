# AGENTS.md — rules for anyone (human or AI tool) editing this repo

This is James Atkins's personal site, published by GitHub Pages from `main` at https://end-us3r.github.io.
It is plain multi-page HTML, CSS, and JavaScript. No framework, no build step, no single-page app.

## The one hard rule
**Never push or merge to `main` without James's explicit yes.** Anything on `main` goes live within minutes.
All upgrade work happens on `upgrade/v1-structure` and reaches `main` only through a reviewed pull request.
James's personal work goes on `james/local-work` (or another `james/*` branch) and is folded into the upgrade branch by Stacky.

## Who edits what

### James owns (content)
- `about-me.html` text
- Home page copy strings in `index.html`, **after** Stacky's structure change lands
- Wording in `contact.html`
- `assets/images/profile_pic.png` and any new personal photos
- "Known gap" labels on the Inked Art demo (card on `projects-page.html`; the live demo is https://end-us3r.github.io/Inked-Art-Homepage-Project/) and the Nightmare demo (`projects-folder/nightmareGame.html`)

### Stacky owns (structure)
- Shared header, menu, and footer on `index.html`, `about-me.html`, `projects-page.html`
- `shell.css` (shared header, menu, and footer styles)
- CSS consolidation
- `js/contactForm.js`, `js/buttons.js`, `js/messages.js`
- `contact-form.html`
- Page structure in `contact.html`
- `project-template.css` and the page chrome inside `projects-folder`
- `site.webmanifest`, favicons (`assets/images/favicon-16x16.png`, `assets/images/favicon-32x32.png`, `assets/images/favicon.ico`, `assets/images/apple-touch-icon.png`, `assets/images/android-chrome-192x192.png`, `assets/images/android-chrome-512x512.png`, `favicon.ico` (to be created), `assets/images/safari-pinned-tab.svg` (to be created)), `sitemap.xml`, `robots.txt`

### Shared — claim in the Software Team room before editing
- `index.html`: Stacky does structure first, James does copy after
- `contact.html`: Stacky owns the page structure; James owns the wording
- `stylesheet.css`, `about-me.css`, `projects-page.css`: Stacky leads; Design Studio adjusts visual tokens later

### Design Studio (Phase 3 only)
- Visual tokens only: colors, type, spacing, legibility
- No changes to layout IDs, routing, or page structure

### Leave alone
- Demo game logic inside the seven project demos, unless a path or CSS link is broken. Keep all seven demos.

## Keep James's originals
This applies to everyone, including Design Studio and Grok Build.
- Visual work improves his existing theme and never replaces it. His colors (including each page's green, purple, and cyan), his fonts, and his overall style stay. Work is polish only: spacing, headings, readability, consistent buttons and cards, and small hover effects. No new theme (for example no terminal style).
- His original interactive features stay and only get improved, never removed: typing effect, inspire button, button effects in `js/buttons.js`, the contact form, and project card clicks.
- The Home typewriter effect stays unchanged. With JavaScript on, the text starts empty and types out with his original words, speed, and cursor. The full text never flashes first, and there is no skip, speed-up, or reduced-motion bypass.

## If you are an AI coding tool working for James
Only edit James's files above. If a fix needs a Stacky-owned or shared file, stop and tell James so he can claim it in the Software Team room first. Show every change before it is kept.

## Checkpoints (gates)

**Before layout/IA work (Phase 2) starts**
- Shared header/menu/footer on Home, About, and Projects
- Home page readable with JavaScript turned off: the full text shows only when JavaScript is off; with JavaScript on, the typewriter effect runs unchanged from an empty start
- One contact control only (no duplicate contact IDs); James's original contact form on `contact.html` stays and may be improved
- No `#inspire-button` console error
- `button_one` ID clash fixed

**Before the visual refresh (Phase 3) starts**
- Project cards use real links
- `project-template.css` exists and loads (no 404)
- All 7 demos reachable
- Codecademy footer link fixed
- Favicon, manifest, and sitemap load (no 404)
- No sideways scrolling at about 390px wide on the three main pages
- Image alt text, an H1 on Projects, and a skip link

**Before merge to `main` (live)**
- QA v1 acceptance passes
- James gives a separate, explicit yes. Merge is never automatic after Phase 3.

## Working habits
- Pull before each block of work. Push small commits often.
- Commit messages: `phaseN: short description` (for example `phase1: shared footer`).
- No force-push. No rewriting history on shared branches.
- Conflicts: Stacky wins on structure, James wins on content, Design tokens go last.
- Don't rewrite a file someone committed in the last hour without a ping in the Software Team room.
