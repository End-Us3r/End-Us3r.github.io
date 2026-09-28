# AGENTS.md — rules for anyone (human or AI tool) editing this repo

This is James Atkins's personal site, published by GitHub Pages from `main` at https://end-us3r.github.io.
It is plain multi-page HTML, CSS, and JavaScript. No framework, no build step, no single-page app.

## The one hard rule
**Never push or merge to `main` without James's explicit yes.** Anything on `main` goes live within minutes. Going live is a separate yes after that.
Work lands on `upgrade/v1-structure` and reaches `main` only through a reviewed pull request.
Rough test builds go on a separate test branch made from `upgrade/v1-structure`.
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
- Keep all seven demos. Leave `houseTour.html` untouched. For the other demos, leave the game logic alone unless a path or CSS link is broken.

## Aurora Deep Field
James locked this look on 2026-09-28. On 2026-09-27 he restarted the site from scratch with a futuristic space, robotics, and tech theme. This applies to everyone, including Design Studio and Grok Build.

### Reference build
The approved design reference is the design team's final Aurora handoff, approved by James on 2026-09-28. The handoff includes a README with build notes, a mockup, renders, all 7 NASA photos in computer and phone sizes, and credits. It is kept outside this repo. If the design team posts an updated version later, that version replaces it.
- Phones download only the phone-size photos, for example with a `picture` element.
- Long project cards grow taller without breaking the layout.

### What carries over
- Only James's words, and his seven projects. The words are the greeting sentence, the About text, and the project names, descriptions, and links.
- The old colors, fonts, theme, and effects are no longer locked.

### The look
The background is near-black `#07060a`. Text is warm white `#f6f4ef`, muted text is `#d5d0c8`, and hairline lines are `rgba(246, 244, 239, 0.28)`. The color comes from the photographs.
Titles use Cormorant Garamond. Paragraphs use Outfit. Small labels use IBM Plex Mono.
On Home, the aurora photo fills the first screen, and the greeting is set large in the lower part of the picture, clear of the station structure. The welcome text sits in a dark glass panel. A full-width Crab Nebula band follows. Introduction, Background, and Interests are three columns with a hairline over each. On a phone, those three columns stack.
On Projects, the cards are tall and equal height. The photo covers each card. The name, description, and code button sit on a dark panel at the bottom left. A long card grows taller without breaking the layout.

### Greeting
The greeting words stay the same. How the sentence appears is open: typing, a scramble, or a fade. Whatever effect is used, the full sentence must be readable with JavaScript off and when the device is set to reduce motion. The box holding the greeting is sized for the full sentence, so the page does not jump.

### Motion
On a computer, the aurora photo drifts very slowly. On a phone, photos stay still. With reduce motion on, nothing moves.

### Photos
Use only the NASA public-domain images listed here. Save each one as WebP, with a desktop size and a phone size, and keep each file under 300 KB.

Every page that shows a NASA photo has a credit line in its footer. That line names each photo used on that page, with the full credit exactly as written below. A page passes when the footer includes the matching line for every NASA photo on that page:
- `Aurora: NASA / Johnson Space Center` — `aurora-d.webp`, `aurora-p.webp`
- `Crab Nebula: NASA/ESA/JPL/Arizona State Univ.` — `crab-d.webp`, `crab-p.webp`. Keep this full credit. ESA is named because Hubble is a NASA/ESA telescope. This is not an ESA/Webb image.
- `Earth from orbit at sunrise: NASA / Johnson Space Center` — `earth-d.webp`, `earth-p.webp`
- `California at night: NASA / Johnson Space Center` — `night-d.webp`, `night-p.webp`
- `Mars globe: NASA/JPL/USGS` — `mars-d.webp`, `mars-p.webp`
- `Perseverance panorama: NASA/JPL-Caltech/MSSS/ASU` — `terrain-d.webp`, `terrain-p.webp`
- `Earthrise: NASA / Johnson Space Center` — `earthrise-d.webp`, `earthrise-p.webp`

A general `Photographs: NASA` line alone is not enough. A caption on a full-width photo band, like the Crab Nebula caption in the mockup, is fine in addition to the footer line. It does not replace the footer line.

Do not use ESA/Webb images. Mission Control and Red Planet Lab are saved for future ideas only. They are not part of this build.

### How the site is built
Plain GitHub Pages, with no build step and no frameworks. Motion and depth come from CSS and small scripts, with no heavy 3D or video backgrounds. Loading the fonts above with a Google Fonts link is fine. Use relative paths for links and assets so previews via raw.githack work. Every page has a phone version, with no sideways scroll at 390 and 375 pixels wide. Text stays readable over the photos at every point.

### Contact form
The look of the contact form may change to the Aurora pop-up. Its behavior stays the same as the current `contact-form.html`.
- The same three fields are required: name, email, and message.
- The form sends a real POST to the same address the current form uses. Today that address is the Formspree placeholder `https://formspree.io/f/YOUR_ID`.
- It must never be swapped for a demo or a `javascript:void(0)` action.
- Changing that address to a real one is James's decision and is not part of the redesign.
- The pop-up closes with Esc and with a tap outside. It works with a keyboard and with screen readers.
- With JavaScript off, the Contact link still reaches a working contact form.

### What stays working
- `js/buttons.js` and its button effects stay as they are.
- Project cards open in the same tab.
- `houseTour.html` is left untouched.

## If you are an AI coding tool working for James
Only edit James's files above. If a fix needs a Stacky-owned or shared file, stop and tell James so he can claim it in the Software Team room first. Show every change before it is kept.

## Checkpoints (gates)

**Before layout/IA work (Phase 2) starts**
- Shared header/menu/footer on Home, About, and Projects
- The greeting is readable with JavaScript off and when reduce motion is on. The words stay the same, and the box is sized for the full sentence so the page does not jump
- One contact control only (no duplicate contact IDs). The contact form may use the Aurora pop-up look, and it keeps the current `contact-form.html` behavior: three required fields and a real POST to `https://formspree.io/f/YOUR_ID`, never a `javascript:void(0)` demo
- No `#inspire-button` console error
- `button_one` ID clash fixed

**Before the visual refresh (Phase 3) starts**
- Project cards use real links
- `project-template.css` exists and loads (no 404)
- All 7 demos reachable
- Codecademy footer link fixed
- Favicon, manifest, and sitemap load (no 404)
- No sideways scroll at 390 and 375 pixels wide on every page
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
