# Loomwork Theme System — Proposal

**Date:** March 2, 2026  
**Author:** Copilot (design proposal for Dan)  
**Status:** Draft  

---

## The Problem

Loomwork is a content-first Astro starter. Right now, theming means hand-editing CSS variables in `site.css`. That works for someone like Dan, but if Loomwork is going to be a real starter framework people _fork and go_ with, it needs:

1. A beautiful default that works out of the box for 80% of use cases
2. A set of curated themes for common site types (blog, portfolio, docs, small biz)
3. A switching mechanism so simple it makes WordPress theme browsing look like tax software

---

## How It Works: One Line

### In `site.config.ts`:

```ts
export const SITE = {
  theme: "manuscript",      // ← change this. that's it.
  // ... rest of config
};
```

### What Happens Under the Hood

`Base.astro` loads the theme CSS file automatically:

```astro
{/* In <head> — after global.css, before site.css */}
<link rel="stylesheet" href={`/themes/${SITE.theme}.css`} />
```

Load order:
1. **`global.css`** — framework reset, base prose, utilities (never touch)
2. **`themes/{name}.css`** — theme variables + layout variants + dark mode
3. **`site.css`** — your overrides (still works, still yours)

You can still override anything in `site.css`. Themes are a starting point, not a prison.

### File Structure

```
src/
  themes/
    manuscript.css      ← default
    brutalist.css
    atelier.css
    terminal.css
    gazette.css
    alpine.css
    campfire.css
    moonrise.css
    fieldnotes.css
    neon.css
    _base.css           ← shared dark-mode media query scaffold
```

That's it. Ten CSS files. No plugin system. No theme registry. No npm packages. No build step. Just CSS.

---

## The Default Theme: Manuscript

**Design philosophy:** _"The best article you've ever read."_

Manuscript is what you get when you fork Loomwork and change nothing. It should feel polished enough to ship, neutral enough to rebrand, and readable enough to trust with 3,000 words of prose.

### Visual Identity

| Property | Value | Why |
|----------|-------|-----|
| **Mood** | Calm, literate, trustworthy | Content-first means reading-first |
| **Background** | Warm off-white `#FAFAF8` | Easier on eyes than pure white, warmer than cool gray |
| **Text** | Near-black `#1A1B1E` | High contrast without harshness |
| **Accent** | Muted terracotta `#C2662D` | Warm, distinctive, works on light and dark |
| **Headings** | `Source Serif 4` (Google Fonts) | Modern serif with variable weight — editorial without being stuffy |
| **Body** | `Source Sans 3` (Google Fonts) | Clean humanist sans, engineered for screen reading |
| **Code** | `JetBrains Mono` | Industry standard, ligatures, great at small sizes |
| **Border radius** | `0.375rem` (6px) | Soft but not bubbly |
| **Content width** | `42rem` (~672px) | Optimal measure for prose (65-75 chars/line) |
| **Line height** | `1.75` | Generous for comfortable scanning |

### Light Mode

```
Background:     #FAFAF8  (warm paper)
Surface:        #FFFFFF  (cards, callouts)
Alt background: #F3F1EC  (code blocks bg in prose, section bands)
Text:           #1A1B1E  (near-black)
Text muted:     #6B6B76  (secondary text, captions, dates)
Accent:         #C2662D  (links, CTAs, active states)
Accent hover:   #A14E1C  (darker on hover)
Accent light:   #FDF0E8  (accent background tint)
Border:         #E2DFD9  (subtle, warm gray)
Code bg:        #1E1E2E  (dark code blocks, Catppuccin-inspired)
```

### Dark Mode

```
Background:     #1A1B1E  (soft black, not pure #000)
Surface:        #242530  (cards, elevated elements)
Alt background: #2A2B36  (section bands, aside)
Text:           #E4E3DF  (warm off-white)
Text muted:     #9B9A94  (secondary text)
Accent:         #E07A3A  (slightly brighter terracotta for dark)
Accent hover:   #F09050  (lighter on hover in dark)
Accent light:   #2E2520  (muted warm tint)
Border:         #3A3B45  (subtle dark border)
Code bg:        #16161E  (deeper black for code)
```

### Layout Characteristics

- **Header:** Clean horizontal nav, site name on left as text (no logo dependency), nav links right, frosted glass on scroll. Hamburger on mobile.
- **Hero (index):** Left-aligned, big serif heading, muted subtext, single CTA button. No background images. Content speaks.
- **Prose:** Centered column at `42rem`. Generous paragraph spacing. Blockquotes with left border accent. Inline code with warm tinted background.
- **Cards:** Subtle border, light surface background, gentle hover lift (2-3px translateY + soft shadow). No harsh drop shadows.
- **Footer:** Centered, small, site name + copyright + optional links. Border top only. Disappears into the background.
- **Animations:** Subtle fade-up on scroll for sections. No bouncing, no sliding, no particles. Restrained.

### Why This Specific Default

| Compared to... | Manuscript's advantage |
|----------------|----------------------|
| **System fonts only** | Source Serif/Sans give it a polished feel that system-ui can't match. The Google Fonts import is one URL. |
| **Pure white (#fff)** | Off-white reduces eye strain and feels warmer. The site won't look like a blank browser tab. |
| **Blue accent** | Every framework defaults to blue. Terracotta is distinctive, warm, works for both startups and personal sites. |
| **No dark mode** | Ships with `prefers-color-scheme` support. Users who set their OS to dark get a great experience with zero config. |
| **Tailwind utility hell** | Pure CSS variables. Inspect element tells you everything. No class soup. |

---

## The Ten Themes

### 1. `manuscript` (Default)
> _"The best article you've ever read."_

**Best for:** Blogs, personal sites, documentation, writing-focused content  
**Palette:** Warm off-white / near-black / terracotta accent  
**Fonts:** Source Serif 4 (headings) + Source Sans 3 (body) + JetBrains Mono (code)  
**Layout:** Centered prose column, horizontal nav, subtle cards  
**Dark mode:** Warm dark with soft black background  
**Personality:** Like a well-typeset book. Confident, readable, gets out of the way.

---

### 2. `brutalist`
> _"No decoration. No apology."_

**Best for:** Developer portfolios, manifestos, punk-rock personal sites, "view source" types  
**Palette:** Pure white `#FFFFFF` / pure black `#000000` / no accent (or single harsh red `#FF0000`)  
**Fonts:** `Space Mono` (everything) — monospace headings, monospace body, monospace nav  
**Layout:**  
- No border-radius anywhere (`0px`)
- Thick 2-3px borders instead of shadows
- Full-width sections, no max-width constraint on headers
- Navigation is a flat list of links, no hover effects, just underline
- Cards have hard black borders, no hover lift
- Blockquotes use a thick left bar and bold text
**Dark mode:** Inverted — black background, white text, same harsh aesthetic  
**Personality:** "I built this site in 20 minutes and it looks exactly how I wanted." Opinionated. Honest. If Craigslist had gone to design school.

---

### 3. `atelier`
> _"Space to breathe."_

**Best for:** Designers, photographers, creative portfolios, agencies  
**Palette:** Near-white `#F8F7F5` / charcoal `#2C2C2C` / warm gold accent `#B8860B`  
**Fonts:** `Playfair Display` (display headings) + `Work Sans` (body) — dramatic contrast  
**Layout:**  
- Extra-generous whitespace (2x default spacing)
- Asymmetric hero: heading left-aligned at large size, hero text offset
- Image-forward: any `<img>` in prose gets extra margin and optional full-bleed treatment
- Nav is minimal — just the site name and a single "Menu" toggle that reveals links
- Cards use a thin top-border accent line on hover (like the current Throughline cards)
- Footer is barely there — just a copyright line
**Dark mode:** Charcoal background `#1C1C1C` with cream text, gold accents glow  
**Personality:** A gallery opening. Every pixel has room. The content is the art, the frame doesn't compete.

---

### 4. `terminal`
> _"ssh into my website."_

**Best for:** Developer blogs, open source project sites, technical documentation, hacker aesthetic  
**Palette:**  
- Light: White `#FAFAFA` / dark text `#1E1E1E` / green accent `#22C55E`  
- Dark: Near-black `#0D1117` (GitHub dark) / gray text `#C9D1D9` / green `#3FB950`  
**Fonts:** `Fira Code` (everything — yes, even body text) or `IBM Plex Mono`  
**Layout:**  
- Monospace everything, including nav
- Header shows site name with a blinking cursor: `loomwork_`
- Navigation styled as terminal commands: `~/blog  ~/projects  ~/about`
- Code blocks are the star — extra generous, syntax-highlighted
- Cards have a 1px solid border, look like terminal panels
- Status badges use terminal-style colored dots (● green / ● yellow / ● red)
- Footer shows a fake prompt: `$ exit — © 2026`
**Dark mode:** The _primary_ mode. Light mode is the variant here.  
**Personality:** You `git clone` websites for fun. Your IDE is your happy place. This site proves it.

---

### 5. `gazette`
> _"Above the fold."_

**Best for:** News sites, newsletters, magazines, content-heavy blogs, media organizations  
**Palette:** True white `#FFFFFF` / black `#111111` / single red accent `#D32F2F`  
**Fonts:** `Libre Baskerville` (headings — newspaper serif) + `Inter` (body) + `Source Code Pro` (code)  
**Layout:**  
- Wider content area (`--content-width: 52rem`)
- Optional multi-column layout on index: 2-column or 3-column article grid
- Strong horizontal rules between sections (2px black)
- Headlines have tight letter-spacing and are larger than other themes
- Small caps for section labels and categories (like "OPINION" or "TECHNOLOGY")
- Byline + date formatting built in (author · date · read time)
- Card layout is list-style on mobile, grid on desktop
- Pull quotes styled as oversized italic serif with quotation marks
**Dark mode:** Dark charcoal `#1A1A1A` / off-white text / muted red accent  
**Personality:** "We have things to say, and we say them with authority." Every section has weight. The typographic hierarchy does the work.

---

### 6. `alpine`
> _"Ship it."_

**Best for:** SaaS docs, startup landing pages, product sites, developer documentation  
**Palette:** Clean white `#FFFFFF` / slate `#0F172A` / blue accent `#3B82F6`  
**Fonts:** `Inter` (everything — variable weight for both headings and body) + `JetBrains Mono` (code)  
**Layout:**  
- Tight, efficient spacing
- Slightly wider layout (`--content-width: 48rem`)
- Header is clean: logo left, nav center or right, CTA button is a pill shape
- Hero has a gradient badge/pill above the heading (like "v2.0 — Now with dark mode")
- Cards have soft rounded corners (`0.75rem`), subtle shadows, no borders
- Buttons are rounded pills
- Code blocks have a copy button area (just the styling — JS is separate)
- Callout boxes styled for tip/warning/info/danger
- Footer has a multi-column link grid (product, resources, company)
**Dark mode:** Slate `#0F172A` background, blue accent brightened  
**Personality:** Clean, modern, professional. "We have a design system and we use it." Feels like it could be the docs for a well-funded startup.

---

### 7. `campfire`
> _"Pull up a chair."_

**Best for:** Personal blogs, small businesses, restaurants, nonprofits, community sites  
**Palette:**  
- Cream `#FEF7ED` / dark brown `#3D2B1F` / burnt orange `#D97706` / forest green `#15803D`  
**Fonts:** `Lora` (headings — warm, readable serif) + `Nunito` (body — friendly rounded sans)  
**Layout:**  
- Generous border-radius everywhere (`0.75rem` - `1rem`)
- Soft, warm shadows with an amber tint
- Hero feels inviting — centered text, warm background tint
- Cards have a slight cream/tan background, feel like index cards
- Buttons are rounded, friendly, not aggressive
- Blockquotes use a warm amber left border
- Image styling: rounded corners, subtle warm shadow
- Navigation has a slightly heavier weight, feels tactile
**Dark mode:** Deep espresso brown `#1C1410` / warm cream text / amber accents  
**Personality:** Warm, approachable, human. The coffee shop of websites. Content feels like a conversation, not a presentation. Your aunt could use this site and feel at home.

---

### 8. `moonrise`
> _"After dark."_

**Best for:** Premium portfolios, agencies, luxury brands, music/entertainment, dark-first sites  
**Palette:**  
- Primary: Deep navy `#0B0F1A` / slate text `#B8BCC8` / cool purple accent `#8B5CF6`  
- Light mode: Soft gray `#F5F5F7` / near-black text / muted purple  
**Fonts:** `Outfit` (headings — geometric, modern, variable weight) + `DM Sans` (body) + `Fira Code` (code)  
**Layout:**  
- Dark-first design (dark _is_ the default, light is the variant)
- Generous spacing, things float in dark space
- Cards have a glass-morphism effect: semi-transparent background with backdrop blur
- Accent color used sparingly — active states, links, important badges
- Subtle gradient backgrounds on hero sections (dark navy → slightly lighter navy)
- Buttons have a glow effect on hover (box-shadow with accent color at low opacity)
- Thin, subtle borders `rgba(255,255,255,0.08)`
- Navigation uses a pill-style active indicator
**Dark mode:** The default. Light mode is a clean, gray-toned inversion.  
**Personality:** Midnight sophistication. The Apple Keynote of personal sites. Everything feels premium and considered. Less is more, and what's there glows.

---

### 9. `fieldnotes`
> _"Properly cited."_

**Best for:** Academic sites, research blogs, technical writing, documentation, digital gardens  
**Palette:** Ivory `#FFFFF8` (like actual paper) / dark gray `#333333` / muted blue accent `#4A6FA5`  
**Fonts:** `EB Garamond` (headings & body — the classic academic serif) + `Inconsolata` (code)  
**Layout:**  
- Narrow content column (`--content-width: 38rem`) for optimal reading
- Sidenotes/margin notes area on wider screens (content shifts slightly left, notes appear right)
- Small caps for section markers, author names, dates
- Numbered headings (optional CSS counter)
- Footnote styling built in (superscript numbers, bottom-of-section references)
- Horizontal rule is three centered asterisks: `* * *`
- Blockquotes are indented and set in a slightly smaller italic font
- Tables have proper academic styling: top and bottom rules heavy, internal rules light
- Table of contents component gets special left-column sticky treatment
**Dark mode:** Dark parchment `#1E1E1E` / cream text `#D4D0C8` / muted blue link  
**Personality:** "I have footnotes and I'm not afraid to use them." Edward Tufte meets the modern web. For people who care about typography as much as content.

---

### 10. `neon`
> _"Turn it up."_

**Best for:** Creative agencies, event sites, music, gaming, youth-oriented brands, portfolios that need to pop  
**Palette:**  
- Dark background `#0A0A0A` / white text / electric accents that rotate per section:
  - Cyan `#06B6D4` / Magenta `#EC4899` / Lime `#84CC16` / Amber `#F59E0B`  
**Fonts:** `Space Grotesk` (headings — bold, geometric, modern) + `Inter` (body) + `Fira Code` (code)  
**Layout:**  
- Dark-first (like Moonrise, but louder)
- Bold, chunky headings at larger sizes than other themes
- Accent color gradient on CTAs and important links
- Cards have a neon-glow border on hover (`box-shadow: 0 0 20px rgba(accent, 0.3)`)
- Sections can have different accent colors (CSS classes: `.accent-cyan`, `.accent-magenta`, etc.)
- Button hover has a slight scale transform (1.02)
- Hero uses large, bold type with a gradient text effect on the heading
- Animated gradient background option for hero (subtle, via CSS animation)
- Navigation has a neon underline on active/hover
**Light mode:** White background `#FAFAFA` with the electric accents toned to 80% saturation  
**Personality:** Loud, confident, impossible to ignore. The website equivalent of a neon sign. Not for everyone — but for its audience, it's perfect.

---

## Quick Comparison Matrix

| Theme | Mood | Primary Font Vibe | Accent | Dark Default? | Best Width |
|-------|------|-------------------|--------|---------------|------------|
| **manuscript** | Calm, literary | Serif + Sans | Terracotta | No | 42rem |
| **brutalist** | Raw, stark | Monospace | Black/Red | No | Full |
| **atelier** | Airy, gallery | Display Serif + Sans | Gold | No | 42rem |
| **terminal** | Hacker, technical | Monospace | Green | **Yes** | 48rem |
| **gazette** | Authoritative | News Serif + Sans | Red | No | 52rem |
| **alpine** | Clean, modern | Geometric Sans | Blue | No | 48rem |
| **campfire** | Warm, friendly | Warm Serif + Rounded Sans | Orange | No | 42rem |
| **moonrise** | Premium, dark | Modern Sans | Purple | **Yes** | 44rem |
| **fieldnotes** | Academic, precise | Classic Serif | Muted Blue | No | 38rem |
| **neon** | Bold, electric | Geometric Sans | Multi-color | **Yes** | 48rem |

---

## Implementation Plan

### Phase 1: Theme Infrastructure
1. Add `theme` field to `site.config.default.ts` (default: `"manuscript"`)
2. Update `Base.astro` to conditionally load the theme CSS file
3. Create `src/themes/` directory
4. Build `manuscript.css` as the reference implementation
5. Document the variable contract (which CSS vars every theme must define)

### Phase 2: Ship 3 Starter Themes
- `manuscript` (default — blog/personal)
- `alpine` (SaaS/docs — most requested after blog)
- `brutalist` (developer — to show range)

### Phase 3: Complete the Set
- Remaining 7 themes, one at a time
- Each theme gets a preview on loomwork.org

### Phase 4: Theme Preview
- Optional: a `/themes` page on loomwork.org that shows live previews
- CSS-only toggle: swap the stylesheet and the whole page changes

---

## Variable Contract

Every theme must define these CSS custom properties in `:root` and `@media (prefers-color-scheme: dark)`:

```css
/* ── Required Variables ── */
:root {
  /* Colors */
  --color-bg
  --color-bg-alt
  --color-surface
  --color-text
  --color-text-muted
  --color-accent
  --color-accent-hover
  --color-accent-light
  --color-border
  --color-code-bg

  /* Typography */
  --font-body
  --font-heading
  --font-mono
  --text-base
  --leading

  /* Spacing (optional overrides — defaults in global.css) */
  --content-width
  --radius

  /* Misc (optional) */
  --shadow-sm
  --shadow-md
}
```

Themes can also add their own namespaced variables (e.g., `--terminal-cursor-color`) for theme-specific features.

---

## What This Is NOT

- **Not a plugin system.** No hooks, no lifecycle, no API. It's CSS.
- **Not Tailwind.** No utility classes. The variable system IS the design system.
- **Not a marketplace.** All 10 themes ship with the repo. Free. MIT.
- **Not fragile.** If you delete the theme field, you get `global.css` defaults. If you set theme to a nonexistent name, `site.css` still works. Nothing breaks.

---

## Open Questions

1. **Font loading strategy:** Should each theme specify a `fonts_url` override in addition to CSS? Currently fonts are set in `site.config.ts`. We could either:
   - Have the theme CSS use `@import` for its Google Fonts (simpler, but slightly slower)
   - Have a `THEME_FONTS` map in the theme system that `Base.astro` reads (faster preconnect, more wiring)
   - Let the user set `fonts_url` manually to match the theme (most flexible, slightly more work)

2. **Theme-specific components:** Some themes imply structural differences (Gazette's multi-column, Fieldnotes' sidenotes). Should these be:
   - Pure CSS (classes that themes activate via `display: grid` etc.)
   - Optional Astro components that themes can use
   - Documented but left to the user to implement

3. **Naming:** Are these names good? They're meant to be evocative but short. Other candidates considered: `journal`, `wireframe`, `darkroom`, `editorial`, `gridline`, `daybreak`.

---

_This is a living document. Feedback welcome._
