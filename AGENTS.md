# AGENTS.md — rules for anyone (human or AI tool) editing this repo

This is James Atkins's personal site, published by GitHub Pages from `main` at https://end-us3r.github.io.
It is plain multi-page HTML, CSS, and JavaScript. No framework, no build step, no single-page app.

## The one hard rule
**Never push or merge to `main` without James's explicit yes.** Anything on `main` goes live within minutes. Going live is a separate yes after that.
Work lands on `upgrade/v1-structure` and reaches `main` only through a reviewed pull request.
Rough test builds go on a separate test branch made from `upgrade/v1-structure`.
James's personal work goes on `james/local-work` (or another `james/*` branch) and is folded into the upgrade branch by Stacky.

## Two tracks
Work follows two tracks. Do not mix them.

`upgrade/v1-structure` keeps main's visible look: menu, colors, fonts, the typing greeting, and effects. Only structure changes that visitors cannot see are allowed there.

On upgrade the menu must match main at 1280, 390, and 375 pixels wide on every page: same links and order, same look, same phone menu open and close. James approved four exceptions (2026-09-28 and 2026-09-29):
- Contact on the Home phone menu, About, and Projects opens `contact.html`. The Home computer menu's Contact keeps main's pop-up.
- No page scrolls sideways at any width from 320 to 1280 pixels (widened from phones only on 2026-10-02), except `assets/old_index.html`, James's old saved copy, which no page links to. Fix the element that is too wide instead of hiding the overflow on the whole page. The one allowed exception is the existing phone-only `html, body { overflow-x: clip }` in `projects-page.css` (480px and under). It stays so the phone view doesn't change. Don't add any new ones.
- The phone menu opens with JavaScript off.
- On the mobile (responsive) layout only, meaning 480px wide or less where the phone menu takes over, the top nav bar slides away when you scroll down and comes back when you scroll up (approved 2026-09-29). It always shows at the top of the page, while the phone menu is open, and when anything in it gets keyboard focus. With JavaScript off it stays put, and with reduce motion on it appears without sliding. Wider layouts keep the nav bar fixed exactly as it is now. The footer does not hide.

James approved a separate exception on 2026-09-29. Five demo pages load `project-template.css` and keep James's original colors. They do not match main's browser-default look. The pages are `coffeeBot.html` (CoffeeBot), `gpaCalculator.html` (GPA Calculator), `boredlessTourist.html` (Boredless Tourist), `rps.html` (Rock Paper Scissors), and `nightmareGame.html` (Nightmare). `houseTour.html` keeps James's original look from main. On 2026-09-29 James approved fixing what is broken on it. The fixes change only the items listed in the houseTour fix PR.

Upgrade has no Skip to content link and no custom focus outline. It uses the browser's default focus outline, as main does. The JA hover card with social links stays on Home only, as on main.

Project cards open in the same tab (James lock 2026-09-27).

The six old project pages are `coffeeBot.html`, `gpaCalculator.html`, `boredlessTourist.html`, `rps.html`, `nightmareGame.html`, and `houseTour.html`. The five demo pages load `project-template.css` and keep James's original colors. `houseTour.html` keeps James's original look from main. On 2026-09-29 James approved fixing what is broken on it. The fixes change only the items listed in the houseTour fix PR.

The Aurora rules apply only to `test/aurora-home` and later `test/aurora-*` branches. Aurora does not go into upgrade or main until James gives a separate yes to move it.

## Who edits what

### James owns (content)
- `about-me.html` text
- Home page copy strings in `index.html`, **after** Stacky's structure change lands
- Wording in `contact.html`
- `assets/images/profile_pic.png` and any new personal photos
- "Known gap" labels on the Inked Art demo (card on `projects-page.html`; the live demo is https://end-us3r.github.io/Inked-Art-Homepage-Project/) and the Nightmare demo (`projects-folder/nightmareGame.html`)

### Stacky owns (structure)
- Each page's menu on `index.html`, `about-me.html`, and `projects-page.html` matches main at 1280/390/375 (its own links and look), except the four approved fixes. A shared footer is fine if it looks the same as main's.
- `shell.css` (each page's own menu styles, matching main at 1280/390/375 except the four approved fixes; a shared footer is fine if it looks the same as main's)
- CSS consolidation
- `js/contactForm.js`, `js/buttons.js`, `js/messages.js`
- `contact-form.html`
- Page structure in `contact.html`
- `project-template.css` (the five demo pages load it and keep James's original colors) and the page chrome inside `projects-folder`. `houseTour.html` keeps James's original look from main. On 2026-09-29 James approved fixing what is broken on it. The fixes change only the items listed in the houseTour fix PR.
- `site.webmanifest`, favicons (`assets/images/favicon-16x16.png`, `assets/images/favicon-32x32.png`, `assets/images/favicon.ico`, `assets/images/apple-touch-icon.png`, `assets/images/android-chrome-192x192.png`, `assets/images/android-chrome-512x512.png`, `favicon.ico` (to be created), `assets/images/safari-pinned-tab.svg` (to be created)), `sitemap.xml`, `robots.txt`

### Shared — claim in the Software Team room before editing
- `index.html`: Stacky does structure first, James does copy after
- `contact.html`: Stacky owns the page structure; James owns the wording
- `stylesheet.css`, `about-me.css`, `projects-page.css`: Stacky leads; Design Studio adjusts visual tokens later

### Design Studio (Phase 3 only)
- Visual tokens only: colors, type, spacing, legibility
- No changes to layout IDs, routing, or page structure

### Leave alone
- Keep all seven demos. `houseTour.html` keeps James's original look from main. On 2026-09-29 James approved fixing what is broken on it. The fixes change only the items listed in the houseTour fix PR. For the other demos, leave the game logic alone unless a path or CSS link is broken. The five demo pages load `project-template.css` and keep James's original colors.

## Aurora Deep Field
James locked this look on 2026-09-28. On 2026-09-27 he restarted the site from scratch with a futuristic space, robotics, and tech theme. These rules apply only to `test/aurora-home` and later `test/aurora-*` branches. Aurora does not go into upgrade or main until James gives a separate yes to move it.

### Reference build
The approved design reference is the design team's final Aurora handoff, approved by James on 2026-09-28. The handoff includes a README with build notes, a mockup, renders, all 7 NASA photos in computer and phone sizes, and credits. It is kept outside this repo. If the design team posts an updated version later, that version replaces it. The approved Aurora v2 plan (James, 2026-09-28) and the design team's later v3 photo swaps (James, 2026-09-29) set which photos are used. The photo list in this file (14 photos, 30 files) is the only source for which photos may be used.
- Phones download only the phone-size photos, for example with a `picture` element.
- Long project cards grow taller without breaking the layout.

### What carries over
- Only James's words, and his seven projects. The words are the greeting sentence, the About text, and the project names, descriptions, and links. New text is only UI labels and photo captions.
- The old colors, fonts, theme, and effects are no longer locked.

### The look
The background is near-black `#07060a`. Text is warm white `#f6f4ef`, muted text is `#d5d0c8`, and hairline lines are `rgba(246, 244, 239, 0.28)`. The color comes from the photographs. Keep these colors and fonts unchanged.
Titles use Cormorant Garamond. Paragraphs use Outfit. Small labels use IBM Plex Mono.
On Home, the aurora photo fills the first screen, and the greeting is set large in the lower part of the picture, clear of the station structure. The welcome text sits in a dark glass panel. Introduction, Background, and Interests are three columns with a hairline over each. On a phone, those three columns stack. With JavaScript on, those chapters are tabs. A contained View from orbit photo sits after the chapters. A full-width Crab Nebula band follows that.
On Projects, the page is a card grid: 2 columns on a computer, 1 on a phone. Smaller photos sit inside the cards, not full-screen photos in a row. The name, description, and code button sit with each card. A long card grows taller without breaking the layout.

### Image rhythm
Never two full-width photos back to back. Between any two photos there is a text section, a panel, or at least 96px of empty space (64px on phone). At most two full-width photos per page. A contained photo sits inside the page margins, at most 1200px wide. Projects is a card grid (2 columns on a computer, 1 on a phone) with smaller photos inside the cards, not full-screen photos in a row.

### Greeting
The greeting words stay the same. How the sentence appears is open: typing, a scramble, or a fade. Whatever effect is used, the full sentence must be readable with JavaScript off and when the device is set to reduce motion. The box holding the greeting is sized for the full sentence, so the page does not jump.

### Motion
On a computer, the aurora photo drifts very slowly. On a phone, photos stay still. There is no phone or device tilt.
With reduce motion on, the page holds completely still: no drift, no parallax, and no fade-ins. Switches are instant.

### Photos
Use only the NASA public-domain images listed here. WebP only. Load a desktop size and a phone size with a `picture` element. The files are in `images/aurora/`.

Phone files must be no more than 1,280 px wide and no more than 450 KB. Desktop files must be no more than 2,560 px wide and no more than 500 KB.

The first photo on each page loads right away (the aurora on Home, the Himalayas band on Projects) and must not be `loading="lazy"`. Every other photo uses `loading="lazy"`, including the hidden picker views.

Every page that shows a NASA photo has a credit line in its footer. That line names each photo used on that page, including all picker views on Home, with the full credit exactly as written below. A page passes when the footer includes the matching line for every NASA photo on that page:
- `Aurora: NASA / Johnson Space Center` — Home hero (loads right away): `aurora-manitoba-hero-d.webp`, `aurora-manitoba-hero-p.webp`. Projects card 03: `aurora-manitoba-d.webp`, `aurora-manitoba-p.webp`. Alt: "The aurora borealis over Canada, seen from the International Space Station".
- `Whole Earth: NASA / Johnson Space Center` — `bluemarble-d.webp`, `bluemarble-p.webp`. Alt: "The whole Earth, photographed by the Apollo 17 crew". Caption: "Whole Earth from Apollo 17, 7 Dec. 1972. NASA / Johnson Space Center." Home, View from orbit (default).
- `Hurricane Florence: NASA / Johnson Space Center` — `florence-d.webp`, `florence-p.webp`. Alt: "Hurricane Florence seen from the International Space Station". Caption: "Hurricane Florence over the Atlantic, from the ISS, 12 Sept. 2018. NASA / Johnson Space Center." Home, View from orbit.
- `Europe at night: NASA/Chris Williams` — `vienna-night-d.webp`, `vienna-night-p.webp`. Alt: "Vienna and Bratislava at night along the Danube, seen from the International Space Station". Caption: "Vienna and Bratislava at night, from the ISS, 18 Jan. 2026. NASA/Chris Williams." Home, View from orbit.
- `Aurora over city lights: NASA/Chris Williams` — `aurora-europe-d.webp`, `aurora-europe-p.webp`. Alt: "Green and red aurora over the city lights of Europe". Caption: "Aurora above the city lights of Italy and Germany, from the ISS, 19 Jan. 2026. NASA/Chris Williams." Home, View from orbit.
- `Sahara coast: NASA / Johnson Space Center` — `sahara-coast-d.webp`, `sahara-coast-p.webp`. Alt: "The desert coast of Mauritania". Caption: "The Sahara meets the Atlantic in Mauritania, from the ISS, 16 May 2024. NASA / Johnson Space Center." Home, View from orbit.
- `Crab Nebula: NASA/ESA/JPL/Arizona State Univ.` — `crab-d.webp`, `crab-p.webp`. Alt: "The Crab Nebula". Caption: "Crab Nebula. NASA, ESA, JPL, Arizona State Univ." Keep this full credit. ESA is named because Hubble is a NASA/ESA telescope. This is not an ESA/Webb image. Home, deep field band. Projects card 04.
- `Himalayas: NASA / Johnson Space Center` — `himalaya-d.webp`, `himalaya-p.webp`. Alt: "The Himalayas and Mount Everest". Projects, top band (loads right away).
- `Earth from orbit at sunrise: NASA / Johnson Space Center` — `sunrise-d.webp`, `sunrise-p.webp`. Alt: "Sunrise above the clouds, seen from orbit". Projects card 01.
- `Los Angeles at night: NASA / Johnson Space Center` — `la-night-d.webp`, `la-night-p.webp`. Alt: "Los Angeles at night, seen from orbit". Projects card 02.
- `Earthrise: NASA / Johnson Space Center` — `earthrise-d.webp`, `earthrise-p.webp`. Alt: "Earthrise over the Moon". Projects card 05.
- `Perseverance panorama: NASA/JPL-Caltech/MSSS/ASU` — `terrain-d.webp`, `terrain-p.webp`. Alt: "Perseverance panorama on Mars". Projects card 06.
- `Mars globe: NASA/JPL/USGS` — `mars-d.webp`, `mars-p.webp`. Alt: "Mars globe". Projects card 07.
- `Sun glint, Indian Ocean: NASA / Johnson Space Center` — `glint-d.webp`, `glint-p.webp`. Alt: "The sun's glint on a partly cloudy Indian Ocean". Caption: "Sun glint, Indian Ocean. NASA / Johnson Space Center." Projects, closing band.

Home footer credit line, exactly:
`Aurora: NASA / Johnson Space Center. Crab Nebula: NASA/ESA/JPL/Arizona State Univ. Whole Earth: NASA / Johnson Space Center. Hurricane Florence: NASA / Johnson Space Center. Europe at night: NASA/Chris Williams. Aurora over city lights: NASA/Chris Williams. Sahara coast: NASA / Johnson Space Center.`

Projects footer credit line, exactly:
`Earth from orbit at sunrise: NASA / Johnson Space Center. Los Angeles at night: NASA / Johnson Space Center. Aurora: NASA / Johnson Space Center. Crab Nebula: NASA/ESA/JPL/Arizona State Univ. Earthrise: NASA / Johnson Space Center. Perseverance panorama: NASA/JPL-Caltech/MSSS/ASU. Mars globe: NASA/JPL/USGS. Himalayas: NASA / Johnson Space Center. Sun glint, Indian Ocean: NASA / Johnson Space Center.`

A general `Photographs: NASA` line alone is not enough. A caption on a full-width photo band, like the Crab Nebula caption in the mockup, is fine in addition to the footer line. It does not replace the footer line.

Do not use ESA/Webb images. Mission Control and Red Planet Lab are saved for future ideas only. They are not part of this build.

### Interactions
v2 may add these, in plain JavaScript and CSS, with no libraries. They live in one small file, `js/aurora-v2.js`:
- Desktop pointer depth on the hero
- About chapters as tabs
- The View from orbit picker (CSS radio buttons, so it works with JavaScript off)
- Project filter and More buttons
- Gentle scroll fade-ins

With JavaScript off, everything still works and all content is visible. With reduce motion on, the page holds completely still: no drift, no parallax, and no fade-ins. Switches are instant.
Put new controls inside `header`, `main`, or `footer`, so the contact pop-up can lock them. One contact control per page. Do not load `js/contactForm.js` on Aurora pages.

### How the site is built
Plain GitHub Pages, with no build step and no frameworks. Motion and depth come from CSS and small scripts, with no heavy 3D or video backgrounds. Loading the fonts above with a Google Fonts link is fine. Use relative paths for links and assets so previews via raw.githack work. Every page has a phone version, with no sideways scroll at 390 and 375 pixels wide. Text stays readable over the photos at every point.

### Contact form
- The Contact page (`contact.html`) stays exactly as it is for now. Its form uses the demo pop-up that tells visitors nothing was sent. Do not point it at the Formspree placeholder, because that would send visitors to an error page.
- If the Aurora contact pop-up is built, it can take the Aurora look. It keeps the same three required fields (name, email, message) and the same honest "nothing was sent" behavior as the Contact page. It does not send to the placeholder address.
- Real sending waits until James sets up a real Formspree address. Then both forms switch to sending real messages in one small change, and QA tests it. Setting up that address is James's decision and is not part of the redesign.
- The pop-up closes with Esc and with a tap outside. It works with a keyboard and with screen readers.
- With JavaScript off, the Contact link still reaches the Contact page.
- There is one contact control per page (no duplicate contact IDs).

### What stays working
- `js/buttons.js` and its button effects stay as they are. Do not reuse `#button_one` through `#button_seven`.
- Project cards open in the same tab.
- `houseTour.html` keeps James's original look from main. On 2026-09-29 James approved fixing what is broken on it. The fixes change only the items listed in the houseTour fix PR.

## If you are an AI coding tool working for James
Only edit James's files above. If a fix needs a Stacky-owned or shared file, stop and tell James so he can claim it in the Software Team room first. Show every change before it is kept.

## Checkpoints (gates)

### Upgrade track
**Before layout/IA work (Phase 2) starts**
- Each page's menu matches main at 1280/390/375 (its own links and look), except the four approved fixes. A shared footer is fine if it looks the same as main's.
- The greeting is the same as main
- One contact control only (no duplicate contact IDs). The Contact page and the pop-up keep the honest "nothing was sent" demo, and neither posts to the Formspree placeholder, until James sets up a real Formspree address.
- No `#inspire-button` console error
- `button_one` ID clash fixed

**Before the visual refresh (Phase 3) starts**
- Project cards use real links
- `project-template.css` exists and loads (no 404)
- Five demo pages (`coffeeBot.html`, `gpaCalculator.html`, `boredlessTourist.html`, `rps.html`, `nightmareGame.html`) load `project-template.css` and keep James's original colors. `houseTour.html` keeps James's original look from main. On 2026-09-29 James approved fixing what is broken on it. The fixes change only the items listed in the houseTour fix PR.
- All 7 demos reachable
- Codecademy footer link fixed
- Favicon, manifest, and sitemap load (no 404)
- No sideways scroll on any page at any width from 320 to 1280 pixels, including 481, 768, and 820 (except `assets/old_index.html`, James's old saved copy, which no page links to)
- On Home, with the page scrolled to the bottom: the welcome text never covers the "Be inspired!" heading or its button, and never runs under the footer, at any width from 320 to 1280 and any window height from 600 up. The greeting stays clear of the welcome text. The quote box that opens after "Click me" stays fully on screen and never makes the page scroll sideways.
- Image alt text, an H1 on Projects, and a skip link

**Before merge to `main` (live)**
- QA v1 acceptance passes
- Menu matches main at 1280/390/375 except the four approved fixes
- Five demo pages (`coffeeBot.html`, `gpaCalculator.html`, `boredlessTourist.html`, `rps.html`, `nightmareGame.html`) load `project-template.css` and keep James's original colors. `houseTour.html` keeps James's original look from main. On 2026-09-29 James approved fixing what is broken on it. The fixes change only the items listed in the houseTour fix PR.
- James gives a separate, explicit yes. Merge is never automatic after Phase 3.

### Aurora track
These checks are for `test/aurora-home` and later `test/aurora-*` branches.
- The greeting is readable with JavaScript off and when reduce motion is on. The words stay the same, and the box is sized for the full sentence so the page does not jump.
- JavaScript off: both pages are fully readable. All three chapters are visible. All seven cards show their full descriptions. The filter bar is hidden. The Earth picker still switches. Contact goes to `contact.html`.
- Reduce motion on: no drift, no parallax, no fade-ins, and every switch is instant.
- Phone at 390 and 375 pixels wide: no sideways scroll, and no two full-width photos touch. Tap targets are at least 44 pixels tall.
- Keyboard only: Tab reaches every control in order, with a visible ring. Arrow keys work in the tabs and the picker. Enter and Space work on More and the filters. Esc closes the pop-up and focus returns to Contact.
- Must not break: `js/buttons.js` stays unchanged, and `#button_one` through `#button_seven` are not reused. Project links open in the same tab (no `target`, and no click handler on the whole card). The footer on each page names every photo on that page with the exact credit lines in the photo list. The contact pop-up `#contact-dialog` opens from `[data-contact]`, traps focus, closes with Esc and a tap outside, and shows the "Nothing was sent" message in `#contact-status`.
- Phone files are no more than 1,280 px wide and no more than 450 KB. Desktop files are no more than 2,560 px wide and no more than 500 KB. Phones download only the phone-size (`-p`) files. The first photo on each page is not `loading="lazy"`. Every other photo is.

## Working habits
- Pull before each block of work. Push small commits often.
- Commit messages: `phaseN: short description` (for example `phase1: shared footer`).
- No force-push. No rewriting history on shared branches.
- Conflicts: Stacky wins on structure, James wins on content, Design tokens go last.
- Don't rewrite a file someone committed in the last hour without a ping in the Software Team room.
