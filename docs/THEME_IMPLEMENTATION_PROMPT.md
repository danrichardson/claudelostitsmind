# Loomwork Theme System — Implementation Prompt

> **Give this entire document to the Loomwork team/agent. It's self-contained.**

---

## What You're Building

A theme system for Loomwork. Users switch themes by changing one string in `site.config.ts`. Ten themes ship with the framework. Every theme includes light mode + automatic dark mode via `prefers-color-scheme`. No plugins, no npm packages, no build tooling — just CSS files.

The full design spec is in `docs/THEME_PROPOSAL.md` in the throughlinetech repo. This prompt tells you exactly how to implement it.

---

## Current Architecture (What You're Working With)

### CSS Load Order (today)
1. `src/styles/global.css` — framework file. Reset, base prose, utilities, default CSS variables in `:root`.
2. `src/styles/site.css` — site-specific file. Users override variables and add custom styles here.

Both are imported in `src/layouts/Base.astro`:
```astro
import "../styles/global.css";
import "../styles/site.css";
```

### CSS Variables (defined in global.css `:root`)
These are the variables every theme must set:
```css
--color-bg           --color-bg-alt        --color-surface
--color-text         --color-text-muted    --color-accent
--color-accent-hover --color-accent-light  --color-border
--color-code-bg

--font-body          --font-heading        --font-mono
--text-base          --text-sm             --text-lg
--text-xl            --text-2xl            --text-3xl
--leading

--space-xs  --space-sm  --space-md  --space-lg  --space-xl  --space-2xl

--content-width      --wide-width          --full-width
--radius             --shadow-sm           --shadow-md
--transition
```

### Config (today — `src/site.config.default.ts`)
```ts
export const SITE = {
  name: "Loomwork",
  tagline: "...",
  description: "...",
  url: "...",
  author: "...",
  email: "",
  nav: [...],
  fonts_url: "",   // Google Fonts URL — empty = system fonts
  social: { ... },
  footer: { ... },
} as const;
```

### Layout (`src/layouts/Base.astro`)
Loads fonts from `SITE.fonts_url` if set. Renders `<Header />`, `<main>`, `<Footer />`. Has scroll animation script.

---

## What to Build

### Step 1: Add `theme` to site config

In `src/site.config.default.ts`, add a `theme` field:

```ts
export const SITE = {
  // ── Theme ───────────────────────────────────────────────
  // Pick a built-in theme: "manuscript" (default), "brutalist", "atelier",
  // "terminal", "gazette", "alpine", "campfire", "moonrise", "fieldnotes", "neon"
  // Or leave empty / omit to use framework defaults + your site.css overrides.
  theme: "manuscript",

  // ... rest of config unchanged
```

### Step 2: Create theme files directory

Create `src/themes/` as a framework directory. Files:

```
src/themes/
  _index.ts          ← theme registry (maps name → CSS path + fonts URL)
  manuscript.css
  brutalist.css
  atelier.css
  terminal.css
  gazette.css
  alpine.css
  campfire.css
  moonrise.css
  fieldnotes.css
  neon.css
```

### Step 3: Theme registry (`src/themes/_index.ts`)

This solves the font loading problem. Each theme declares its Google Fonts URL alongside its CSS. No `@import` in CSS (slow), no manual `fonts_url` wrangling.

```ts
export interface ThemeMeta {
  /** Path to the theme CSS file (relative to src/themes/) */
  css: string;
  /** Google Fonts URL for this theme. Empty string = system fonts. */
  fonts_url: string;
}

export const THEMES: Record<string, ThemeMeta> = {
  manuscript: {
    css: "manuscript.css",
    fonts_url: "https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,700&family=JetBrains+Mono:wght@400;500&display=swap",
  },
  brutalist: {
    css: "brutalist.css",
    fonts_url: "https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap",
  },
  atelier: {
    css: "atelier.css",
    fonts_url: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Work+Sans:wght@400;500;600;700&display=swap",
  },
  terminal: {
    css: "terminal.css",
    fonts_url: "https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&display=swap",
  },
  gazette: {
    css: "gazette.css",
    fonts_url: "https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;500;600;700&family=Source+Code+Pro:wght@400;500&display=swap",
  },
  alpine: {
    css: "alpine.css",
    fonts_url: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap",
  },
  campfire: {
    css: "campfire.css",
    fonts_url: "https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400&family=Nunito:wght@400;600;700&display=swap",
  },
  moonrise: {
    css: "moonrise.css",
    fonts_url: "https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600;700&family=Fira+Code:wght@400;500&display=swap",
  },
  fieldnotes: {
    css: "fieldnotes.css",
    fonts_url: "https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,700;1,400&family=Inconsolata:wght@400;500;600&display=swap",
  },
  neon: {
    css: "neon.css",
    fonts_url: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=Fira+Code:wght@400;500&display=swap",
  },
};
```

### Step 4: Update `Base.astro` to load themes

Replace the font-loading logic. The new behavior:
1. If `SITE.theme` is set and matches a known theme, load that theme's CSS + its fonts.
2. If `SITE.fonts_url` is also set, it **overrides** the theme's fonts (user wants custom fonts with the theme's colors/layout).
3. If no theme is set, fall back to current behavior (just `global.css` + `site.css`).

Updated `Base.astro` head section:

```astro
---
import "../styles/global.css";
import "../styles/site.css";
import Header from "../components/Header.astro";
import Footer from "../components/Footer.astro";
import { SITE } from "../site.config";
import { THEMES } from "../themes/_index";

// ... existing Props interface and destructuring ...

const theme = (SITE as any).theme ? THEMES[(SITE as any).theme] : null;
const fontsUrl = SITE.fonts_url || theme?.fonts_url || "";
---
```

In the `<head>`, **after** the existing `<link>` tags and **before** the closing `</head>`:

```astro
    <!-- Theme CSS (loaded between global.css and site.css) -->
    {theme && (
      <style define:vars={{}} set:html={`@import url('/themes/${(SITE as any).theme}.css');`} />
    )}
```

**Wait — better approach.** Astro can import CSS directly. Since themes are known at build time, do this:

```astro
---
// At the top of the frontmatter, after other imports:
// Dynamically import the theme CSS
const themeName = (SITE as any).theme || "";
const themeEntry = themeName ? THEMES[themeName] : null;
const fontsUrl = SITE.fonts_url || themeEntry?.fonts_url || "";

// Theme CSS is imported via a <link> to the public directory
---
```

**Simplest approach — copy theme CSS to `public/themes/` at build time, load via `<link>`:**

Actually, the cleanest Astro-native approach: import the CSS conditionally in the frontmatter. But Astro doesn't support dynamic CSS imports. So:

**DECISION: Put theme CSS files in `public/themes/`.** This is the simplest, most reliable approach:

```
public/
  themes/
    manuscript.css
    brutalist.css
    atelier.css
    terminal.css
    gazette.css
    alpine.css
    campfire.css
    moonrise.css
    fieldnotes.css
    neon.css
```

Then in `Base.astro` `<head>`:

```astro
    <!-- Fonts: theme fonts (unless user overrides with fonts_url) -->
    {fontsUrl && (
      <>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href={fontsUrl} rel="stylesheet" />
      </>
    )}

    <!-- Theme (loaded after global.css, before site.css) -->
    {themeEntry && (
      <link rel="stylesheet" href={`/themes/${themeName}.css`} />
    )}
```

**CSS load order in the rendered HTML:**
1. `global.css` (Astro import — inlined or bundled)
2. Theme CSS (`<link>` tag in head)  
3. `site.css` (Astro import — inlined or bundled)

**IMPORTANT:** Astro inlines imported CSS. The `global.css` and `site.css` imports will be bundled into the page. The theme `<link>` tag loads separately. To ensure correct cascade order, the `<link>` for the theme must appear AFTER the global styles and BEFORE site styles in the rendered `<head>`. 

The cleanest way: keep `global.css` as an import (it gets inlined), load the theme via `<link>`, and move `site.css` to also be a `<link>` from `public/`. OR — simpler — just make theme variables use higher specificity or rely on cascade order.

**Actually, the simplest correct approach:**

Since all the theme does is redefine CSS custom properties on `:root` (and add `@media (prefers-color-scheme: dark)`), cascade order between `global.css` and the theme doesn't matter for variables — **the last definition wins**, and both define on `:root`. As long as the theme CSS loads, its `:root` block will override `global.css`'s `:root` block. And `site.css` imports last (as an Astro import), so user overrides still win.

**So the implementation is just: add a `<link>` tag. That's it.**

### Step 5: Build all 10 theme CSS files

Each theme CSS file goes in `public/themes/`. Each file must:

1. Define all required CSS variables in `:root { }` (light mode)
2. Define all required CSS variables in `@media (prefers-color-scheme: dark) { :root { } }` 
3. Optionally add theme-specific layout overrides (classes, structural CSS)
4. Be self-contained — no `@import`, no dependencies beyond what `global.css` provides

Below are the complete specs for each theme. Build the CSS files from these specs.

---

## Theme Specs

### 1. `manuscript.css` — Default

**Tagline:** _"The best article you've ever read."_

```css
/* ── Manuscript — The best article you've ever read ──────── */

:root {
  /* Colors */
  --color-bg:           #FAFAF8;
  --color-bg-alt:       #F3F1EC;
  --color-surface:      #FFFFFF;
  --color-text:         #1A1B1E;
  --color-text-muted:   #6B6B76;
  --color-accent:       #C2662D;
  --color-accent-hover: #A14E1C;
  --color-accent-light: #FDF0E8;
  --color-border:       #E2DFD9;
  --color-code-bg:      #1E1E2E;

  /* Typography */
  --font-body:    'Source Sans 3', system-ui, -apple-system, sans-serif;
  --font-heading: 'Source Serif 4', Georgia, serif;
  --font-mono:    'JetBrains Mono', ui-monospace, monospace;
  --leading:      1.75;

  /* Layout */
  --content-width: 42rem;
  --radius:        0.375rem;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg:           #1A1B1E;
    --color-bg-alt:       #2A2B36;
    --color-surface:      #242530;
    --color-text:         #E4E3DF;
    --color-text-muted:   #9B9A94;
    --color-accent:       #E07A3A;
    --color-accent-hover: #F09050;
    --color-accent-light: #2E2520;
    --color-border:       #3A3B45;
    --color-code-bg:      #16161E;
  }
}
```

No layout overrides needed — Manuscript matches the `global.css` structure exactly. That's the point.

---

### 2. `brutalist.css`

**Tagline:** _"No decoration. No apology."_

```css
/* ── Brutalist — No decoration. No apology. ──────────────── */

:root {
  --color-bg:           #FFFFFF;
  --color-bg-alt:       #F0F0F0;
  --color-surface:      #FFFFFF;
  --color-text:         #000000;
  --color-text-muted:   #444444;
  --color-accent:       #000000;
  --color-accent-hover: #FF0000;
  --color-accent-light: #F0F0F0;
  --color-border:       #000000;
  --color-code-bg:      #000000;

  --font-body:    'Space Mono', ui-monospace, monospace;
  --font-heading: 'Space Mono', ui-monospace, monospace;
  --font-mono:    'Space Mono', ui-monospace, monospace;
  --leading:      1.6;

  --content-width: 64rem;
  --radius:        0px;
  --shadow-sm:     none;
  --shadow-md:     none;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg:           #000000;
    --color-bg-alt:       #111111;
    --color-surface:      #111111;
    --color-text:         #FFFFFF;
    --color-text-muted:   #AAAAAA;
    --color-accent:       #FFFFFF;
    --color-accent-hover: #FF0000;
    --color-accent-light: #1A1A1A;
    --color-border:       #FFFFFF;
    --color-code-bg:      #111111;
  }
}

/* ── Brutalist layout overrides ──────────────────────────── */

/* Kill all rounded corners aggressively */
.btn, pre, code, .story-card, .project-card, .case-outcome,
.philosophy-block, .status-badge, .intake-success,
.form-group input, .form-group textarea {
  border-radius: 0 !important;
}

/* Thick borders instead of shadows */
.story-card, .project-card {
  border: 2px solid var(--color-border);
  box-shadow: none;
}
.story-card:hover, .project-card:hover {
  transform: none;
  box-shadow: none;
  border-color: #FF0000;
}
.story-card::before {
  display: none;
}

/* Links: just underline, monospace */
a {
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 0.2em;
}

/* Blockquotes: thick border */
blockquote {
  border-inline-start-width: 4px;
  border-inline-start-color: var(--color-text);
  font-style: normal;
  font-weight: 700;
}

/* HR: thick */
hr {
  border-block-start-width: 3px;
  border-block-start-color: var(--color-text);
}
```

---

### 3. `atelier.css`

**Tagline:** _"Space to breathe."_

```css
/* ── Atelier — Space to breathe ──────────────────────────── */

:root {
  --color-bg:           #F8F7F5;
  --color-bg-alt:       #EFEDE8;
  --color-surface:      #FFFFFF;
  --color-text:         #2C2C2C;
  --color-text-muted:   #7A7A72;
  --color-accent:       #B8860B;
  --color-accent-hover: #8B6508;
  --color-accent-light: #F8F0DC;
  --color-border:       #DDD9D0;
  --color-code-bg:      #2C2C2C;

  --font-body:    'Work Sans', system-ui, -apple-system, sans-serif;
  --font-heading: 'Playfair Display', Georgia, serif;
  --font-mono:    ui-monospace, 'Cascadia Code', monospace;
  --leading:      1.8;

  --content-width: 42rem;
  --radius:        0.25rem;

  /* Extra spacing for the gallery feel */
  --space-lg:  2rem;
  --space-xl:  3.5rem;
  --space-2xl: 5.5rem;

  --shadow-sm:  0 1px 3px rgba(0,0,0,0.04);
  --shadow-md:  0 6px 20px rgba(0,0,0,0.05);
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg:           #1C1C1C;
    --color-bg-alt:       #252523;
    --color-surface:      #2A2A28;
    --color-text:         #E8E6E0;
    --color-text-muted:   #9A9890;
    --color-accent:       #D4A017;
    --color-accent-hover: #EBB830;
    --color-accent-light: #2A2618;
    --color-border:       #3A3A36;
    --color-code-bg:      #161614;
  }
}

/* ── Atelier layout overrides ────────────────────────────── */

/* Generous image treatment */
main img {
  margin-block: var(--space-xl);
  border-radius: var(--radius);
}

/* Lighter card borders */
.story-card, .project-card {
  border-color: transparent;
  background: var(--color-surface);
}
.story-card:hover, .project-card:hover {
  border-color: var(--color-border);
}

/* Minimal footer */
.site-footer {
  opacity: 0.7;
  transition: opacity 0.3s;
}
.site-footer:hover {
  opacity: 1;
}
```

---

### 4. `terminal.css`

**Tagline:** _"ssh into my website."_

```css
/* ── Terminal — ssh into my website ──────────────────────── */

/* Light mode (the alternate mode for terminal) */
:root {
  --color-bg:           #FAFAFA;
  --color-bg-alt:       #F0F0F0;
  --color-surface:      #FFFFFF;
  --color-text:         #1E1E1E;
  --color-text-muted:   #6B6B6B;
  --color-accent:       #16A34A;
  --color-accent-hover: #15803D;
  --color-accent-light: #DCFCE7;
  --color-border:       #D4D4D4;
  --color-code-bg:      #1E1E1E;

  --font-body:    'Fira Code', ui-monospace, monospace;
  --font-heading: 'Fira Code', ui-monospace, monospace;
  --font-mono:    'Fira Code', ui-monospace, monospace;
  --text-base:    0.9375rem;
  --leading:      1.65;

  --content-width: 48rem;
  --radius:        0.25rem;
  --shadow-sm:     none;
  --shadow-md:     0 2px 8px rgba(0,0,0,0.08);
}

/* Dark mode (the PRIMARY mode for terminal) */
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg:           #0D1117;
    --color-bg-alt:       #161B22;
    --color-surface:      #161B22;
    --color-text:         #C9D1D9;
    --color-text-muted:   #8B949E;
    --color-accent:       #3FB950;
    --color-accent-hover: #56D364;
    --color-accent-light: #0D2818;
    --color-border:       #30363D;
    --color-code-bg:      #0D1117;
  }
}

/* ── Terminal layout overrides ───────────────────────────── */

/* Cards look like terminal panels */
.story-card, .project-card {
  border: 1px solid var(--color-border);
  box-shadow: none;
}
.story-card::before {
  background: var(--color-accent);
}

/* Code blocks are the star */
pre {
  border: 1px solid var(--color-border);
  font-size: 0.9rem;
}

/* Status badges look like terminal dots */
.status-badge {
  font-family: var(--font-mono);
  letter-spacing: 0.02em;
}

/* Blinking cursor after site name (add via CSS) */
.nav-mark::after {
  content: '_';
  animation: blink 1s step-end infinite;
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
```

---

### 5. `gazette.css`

**Tagline:** _"Above the fold."_

```css
/* ── Gazette — Above the fold ────────────────────────────── */

:root {
  --color-bg:           #FFFFFF;
  --color-bg-alt:       #F5F5F5;
  --color-surface:      #FFFFFF;
  --color-text:         #111111;
  --color-text-muted:   #555555;
  --color-accent:       #D32F2F;
  --color-accent-hover: #B71C1C;
  --color-accent-light: #FFEBEE;
  --color-border:       #CCCCCC;
  --color-code-bg:      #1A1A1A;

  --font-body:    'Inter', system-ui, -apple-system, sans-serif;
  --font-heading: 'Libre Baskerville', Georgia, serif;
  --font-mono:    'Source Code Pro', ui-monospace, monospace;
  --leading:      1.7;

  --content-width: 52rem;
  --radius:        0.25rem;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg:           #1A1A1A;
    --color-bg-alt:       #242424;
    --color-surface:      #242424;
    --color-text:         #E8E8E8;
    --color-text-muted:   #999999;
    --color-accent:       #EF5350;
    --color-accent-hover: #FF7043;
    --color-accent-light: #2A1A1A;
    --color-border:       #3A3A3A;
    --color-code-bg:      #121212;
  }
}

/* ── Gazette layout overrides ────────────────────────────── */

/* Stronger section dividers */
hr {
  border-block-start: 2px solid var(--color-text);
}

/* Tighter heading tracking */
h1, h2, h3 {
  letter-spacing: -0.03em;
}
h1 {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
}

/* Section labels in small caps */
.story-domain, .case-domain, .hero-label {
  text-transform: uppercase;
  font-variant: small-caps;
  letter-spacing: 0.12em;
  font-weight: 700;
}

/* Strong horizontal rules between card sections */
.stories-header, .timeline-section h2 {
  border-top: 3px solid var(--color-text);
}

/* Pull quote styling */
blockquote {
  font-family: var(--font-heading);
  font-size: 1.25em;
  font-style: italic;
  border-inline-start: none;
  padding-inline-start: 0;
  text-align: center;
  position: relative;
  padding-block: var(--space-lg);
}
blockquote::before {
  content: '\201C';
  font-size: 4em;
  color: var(--color-accent);
  position: absolute;
  top: -0.2em;
  left: 50%;
  transform: translateX(-50%);
  line-height: 1;
  opacity: 0.3;
}
```

---

### 6. `alpine.css`

**Tagline:** _"Ship it."_

```css
/* ── Alpine — Ship it ────────────────────────────────────── */

:root {
  --color-bg:           #FFFFFF;
  --color-bg-alt:       #F8FAFC;
  --color-surface:      #FFFFFF;
  --color-text:         #0F172A;
  --color-text-muted:   #64748B;
  --color-accent:       #3B82F6;
  --color-accent-hover: #2563EB;
  --color-accent-light: #EFF6FF;
  --color-border:       #E2E8F0;
  --color-code-bg:      #0F172A;

  --font-body:    'Inter', system-ui, -apple-system, sans-serif;
  --font-heading: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono:    'JetBrains Mono', ui-monospace, monospace;
  --leading:      1.7;

  --content-width: 48rem;
  --radius:        0.75rem;
  --shadow-sm:     0 1px 2px rgba(0,0,0,0.05);
  --shadow-md:     0 4px 16px rgba(0,0,0,0.06);
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg:           #0F172A;
    --color-bg-alt:       #1E293B;
    --color-surface:      #1E293B;
    --color-text:         #E2E8F0;
    --color-text-muted:   #94A3B8;
    --color-accent:       #60A5FA;
    --color-accent-hover: #93C5FD;
    --color-accent-light: #172040;
    --color-border:       #334155;
    --color-code-bg:      #0B1120;
  }
}

/* ── Alpine layout overrides ─────────────────────────────── */

/* Pill-shaped buttons */
.btn, .hero-cta, .nav-cta, .intake-submit {
  border-radius: 9999px;
}

/* Cards: no border, shadow only */
.story-card, .project-card {
  border: none;
  box-shadow: var(--shadow-sm);
  border-radius: 0.75rem;
}
.story-card:hover, .project-card:hover {
  box-shadow: var(--shadow-md);
}

/* Heading weight for Inter */
h1, h2, h3, h4, h5, h6 {
  font-weight: 800;
}

/* Callout boxes (tip/warning/info/danger via classes) */
.callout {
  border-radius: var(--radius);
  padding: var(--space-md) var(--space-lg);
  margin-block-end: var(--space-lg);
  border-left: 4px solid;
}
.callout-tip    { background: #F0FDF4; border-color: #22C55E; }
.callout-warn   { background: #FFFBEB; border-color: #F59E0B; }
.callout-info   { background: #EFF6FF; border-color: #3B82F6; }
.callout-danger { background: #FEF2F2; border-color: #EF4444; }

@media (prefers-color-scheme: dark) {
  .callout-tip    { background: #0A1F0D; border-color: #22C55E; }
  .callout-warn   { background: #1A1508; border-color: #F59E0B; }
  .callout-info   { background: #0C1525; border-color: #3B82F6; }
  .callout-danger { background: #1A0A0A; border-color: #EF4444; }
}
```

---

### 7. `campfire.css`

**Tagline:** _"Pull up a chair."_

```css
/* ── Campfire — Pull up a chair ──────────────────────────── */

:root {
  --color-bg:           #FEF7ED;
  --color-bg-alt:       #F8EFE0;
  --color-surface:      #FFFCF7;
  --color-text:         #3D2B1F;
  --color-text-muted:   #7A6B5D;
  --color-accent:       #D97706;
  --color-accent-hover: #B45309;
  --color-accent-light: #FEF3C7;
  --color-border:       #E5DDD0;
  --color-code-bg:      #2C1F14;

  --font-body:    'Nunito', system-ui, -apple-system, sans-serif;
  --font-heading: 'Lora', Georgia, serif;
  --font-mono:    ui-monospace, 'Cascadia Code', monospace;
  --leading:      1.75;

  --content-width: 42rem;
  --radius:        0.75rem;
  --shadow-sm:     0 1px 3px rgba(60,40,20,0.06);
  --shadow-md:     0 4px 16px rgba(60,40,20,0.08);
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg:           #1C1410;
    --color-bg-alt:       #261C14;
    --color-surface:      #2A1F16;
    --color-text:         #E8DFD4;
    --color-text-muted:   #A89882;
    --color-accent:       #F59E0B;
    --color-accent-hover: #FBBF24;
    --color-accent-light: #2A2010;
    --color-border:       #3D3028;
    --color-code-bg:      #120D08;
  }
}

/* ── Campfire layout overrides ───────────────────────────── */

/* Warm rounded everything */
.story-card, .project-card, .case-outcome, .philosophy-block,
.intake-success, .form-group input, .form-group textarea {
  border-radius: 0.75rem;
}

/* Warm amber blockquote border */
blockquote {
  border-inline-start-color: var(--color-accent);
}

/* Friendly button feel */
.btn, .hero-cta, .intake-submit {
  border-radius: 0.75rem;
}

/* Softer images */
main img {
  border-radius: 0.5rem;
  box-shadow: var(--shadow-sm);
}
```

---

### 8. `moonrise.css`

**Tagline:** _"After dark."_

```css
/* ── Moonrise — After dark ───────────────────────────────── */

/* Dark is the DEFAULT for Moonrise */
:root {
  --color-bg:           #0B0F1A;
  --color-bg-alt:       #131825;
  --color-surface:      rgba(255,255,255,0.04);
  --color-text:         #B8BCC8;
  --color-text-muted:   #6B7280;
  --color-accent:       #8B5CF6;
  --color-accent-hover: #A78BFA;
  --color-accent-light: #1A1530;
  --color-border:       rgba(255,255,255,0.08);
  --color-code-bg:      #080B14;

  --font-body:    'DM Sans', system-ui, -apple-system, sans-serif;
  --font-heading: 'Outfit', system-ui, -apple-system, sans-serif;
  --font-mono:    'Fira Code', ui-monospace, monospace;
  --leading:      1.7;

  --content-width: 44rem;
  --radius:        0.75rem;
  --shadow-sm:     0 1px 3px rgba(0,0,0,0.3);
  --shadow-md:     0 8px 30px rgba(0,0,0,0.3);
}

/* Light mode is the ALTERNATE for Moonrise */
@media (prefers-color-scheme: light) {
  :root {
    --color-bg:           #F5F5F7;
    --color-bg-alt:       #EAEAEE;
    --color-surface:      #FFFFFF;
    --color-text:         #1C1C1E;
    --color-text-muted:   #6B6B76;
    --color-accent:       #7C3AED;
    --color-accent-hover: #6D28D9;
    --color-accent-light: #EDE9FE;
    --color-border:       #D4D4D8;
    --color-code-bg:      #1E1E2E;
    --shadow-sm:          0 1px 2px rgba(0,0,0,0.05);
    --shadow-md:          0 4px 12px rgba(0,0,0,0.07);
  }
}

/* ── Moonrise layout overrides ───────────────────────────── */

/* Glass-morphism cards */
.story-card, .project-card {
  background: var(--color-surface);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--color-border);
}

/* Glow effect on hover */
.story-card:hover, .project-card:hover {
  box-shadow: 0 0 30px rgba(139, 92, 246, 0.12);
  border-color: rgba(139, 92, 246, 0.2);
}
.story-card::before {
  background: var(--color-accent);
}

/* Buttons glow on hover */
.btn--primary:hover, .hero-cta:hover {
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.25);
}

/* Pills for nav active state */
.nav-links a.active {
  background: var(--color-accent-light);
  border-radius: 9999px;
  padding: 0.25em 0.75em;
}

/* Heading weight */
h1, h2, h3 {
  font-weight: 800;
  color: #E4E4E8;
}
@media (prefers-color-scheme: light) {
  h1, h2, h3 { color: var(--color-text); }
}
```

---

### 9. `fieldnotes.css`

**Tagline:** _"Properly cited."_

```css
/* ── Field Notes — Properly cited ────────────────────────── */

:root {
  --color-bg:           #FFFFF8;
  --color-bg-alt:       #F5F5EC;
  --color-surface:      #FFFFFF;
  --color-text:         #333333;
  --color-text-muted:   #777777;
  --color-accent:       #4A6FA5;
  --color-accent-hover: #365180;
  --color-accent-light: #E8EEF5;
  --color-border:       #CCCCBB;
  --color-code-bg:      #2B2B2B;

  --font-body:    'EB Garamond', Georgia, serif;
  --font-heading: 'EB Garamond', Georgia, serif;
  --font-mono:    'Inconsolata', ui-monospace, monospace;
  --text-base:    1.125rem;
  --leading:      1.8;

  --content-width: 38rem;
  --radius:        0.125rem;
  --shadow-sm:     none;
  --shadow-md:     none;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg:           #1E1E1E;
    --color-bg-alt:       #282828;
    --color-surface:      #252525;
    --color-text:         #D4D0C8;
    --color-text-muted:   #999088;
    --color-accent:       #7BA4D4;
    --color-accent-hover: #A0C0E8;
    --color-accent-light: #1C2430;
    --color-border:       #3A3A32;
    --color-code-bg:      #161616;
  }
}

/* ── Field Notes layout overrides ────────────────────────── */

/* Small caps for labels */
.story-domain, .case-domain, .hero-label, .tl-era, .arc-label {
  font-variant: small-caps;
  text-transform: lowercase;
  letter-spacing: 0.08em;
  font-family: var(--font-body);
}

/* Horizontal rule as three asterisks */
hr {
  border: none;
  text-align: center;
}
hr::after {
  content: '* \2003 * \2003 *';
  color: var(--color-text-muted);
  font-size: var(--text-base);
  letter-spacing: 0.3em;
}

/* Academic blockquotes — indented, smaller */
blockquote {
  border-inline-start: none;
  padding-inline-start: 2em;
  padding-inline-end: 2em;
  font-size: 0.95em;
}

/* Tables: academic style (heavy top/bottom, light internal) */
table {
  border-top: 2px solid var(--color-text);
  border-bottom: 2px solid var(--color-text);
}
th {
  background: transparent;
  border-bottom: 1px solid var(--color-text);
}

/* Numbered headings via CSS counter */
body {
  counter-reset: h2-counter;
}
main h2 {
  counter-increment: h2-counter;
}
main h2::before {
  content: counter(h2-counter) '. ';
  color: var(--color-text-muted);
}

/* Sidenote-ready layout: shift content left on wide screens */
@media (min-width: 72rem) {
  .container {
    margin-inline-start: calc(50% - 24rem);
    margin-inline-end: auto;
  }
}
```

---

### 10. `neon.css`

**Tagline:** _"Turn it up."_

```css
/* ── Neon — Turn it up ───────────────────────────────────── */

/* Dark is DEFAULT for Neon */
:root {
  --color-bg:           #0A0A0A;
  --color-bg-alt:       #141414;
  --color-surface:      #1A1A1A;
  --color-text:         #F0F0F0;
  --color-text-muted:   #888888;
  --color-accent:       #06B6D4;
  --color-accent-hover: #22D3EE;
  --color-accent-light: #0A1E24;
  --color-border:       #2A2A2A;
  --color-code-bg:      #050505;

  --font-body:    'Inter', system-ui, -apple-system, sans-serif;
  --font-heading: 'Space Grotesk', system-ui, -apple-system, sans-serif;
  --font-mono:    'Fira Code', ui-monospace, monospace;
  --leading:      1.7;

  --content-width: 48rem;
  --radius:        0.5rem;
  --shadow-sm:     0 0 10px rgba(6,182,212,0.05);
  --shadow-md:     0 0 30px rgba(6,182,212,0.08);

  /* Neon-specific accent variants */
  --neon-cyan:    #06B6D4;
  --neon-magenta: #EC4899;
  --neon-lime:    #84CC16;
  --neon-amber:   #F59E0B;
}

/* Light mode (toned down) */
@media (prefers-color-scheme: light) {
  :root {
    --color-bg:           #FAFAFA;
    --color-bg-alt:       #F0F0F0;
    --color-surface:      #FFFFFF;
    --color-text:         #1A1A1A;
    --color-text-muted:   #666666;
    --color-accent:       #0891B2;
    --color-accent-hover: #0E7490;
    --color-accent-light: #ECFEFF;
    --color-border:       #E0E0E0;
    --color-code-bg:      #1A1A1A;
    --shadow-sm:          0 1px 2px rgba(0,0,0,0.05);
    --shadow-md:          0 4px 12px rgba(0,0,0,0.07);
  }
}

/* ── Neon layout overrides ───────────────────────────────── */

/* Bold chunky headings */
h1, h2, h3 {
  font-weight: 800;
  letter-spacing: -0.03em;
}
h1 {
  font-size: clamp(2.5rem, 6vw, 4rem);
}

/* Gradient text on hero heading */
.hero h1 {
  background: linear-gradient(135deg, var(--neon-cyan), var(--neon-magenta));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
@media (prefers-color-scheme: light) {
  .hero h1 {
    -webkit-text-fill-color: var(--color-text);
    background: none;
  }
}

/* Neon glow cards on hover */
.story-card:hover, .project-card:hover {
  border-color: rgba(6, 182, 212, 0.3);
  box-shadow: 0 0 20px rgba(6, 182, 212, 0.15), 0 0 60px rgba(6, 182, 212, 0.05);
}
.story-card::before {
  background: linear-gradient(90deg, var(--neon-cyan), var(--neon-magenta));
}

/* Button scale on hover */
.btn:hover, .hero-cta:hover {
  transform: scale(1.02);
}

/* Gradient CTA buttons */
.btn--primary, .hero-cta {
  background: linear-gradient(135deg, var(--neon-cyan), var(--neon-magenta));
  border: none;
}
.btn--primary:hover, .hero-cta:hover {
  background: linear-gradient(135deg, var(--neon-magenta), var(--neon-cyan));
}

/* Neon underline on nav hover */
.nav-links a:hover {
  text-decoration: underline;
  text-decoration-color: var(--neon-cyan);
  text-underline-offset: 0.3em;
  text-decoration-thickness: 2px;
}

/* Accent color section classes (optional) */
.accent-cyan    { --color-accent: var(--neon-cyan); }
.accent-magenta { --color-accent: var(--neon-magenta); }
.accent-lime    { --color-accent: var(--neon-lime); }
.accent-amber   { --color-accent: var(--neon-amber); }
```

---

## Step 6: Update `global.css` defaults to be theme-friendly

The current `global.css` `:root` block defines fallback values. **Keep it exactly as-is.** Theme CSS files override these variables. The cascade handles the rest. No changes needed to `global.css`.

## Step 7: Update the default `site.config.default.ts`

Add `theme` field (shown in Step 1). The default value should be `"manuscript"`.

Also update the `fonts_url` comment to mention that themes handle fonts automatically:

```ts
  // ── Fonts ───────────────────────────────────────────────
  // Google Fonts URL. Themes load their own fonts automatically.
  // Set this only if you want to override the theme's font choices.
  // Leave empty to use the theme's default fonts.
  fonts_url: "",
```

## Step 8: Add theme type to config

In `site.config.default.ts`, the type should include theme:

```ts
export const SITE = {
  theme: "manuscript" as string,
  // ... etc
} as const;
```

Or better, define the type:

```ts
export type ThemeName = "manuscript" | "brutalist" | "atelier" | "terminal" | "gazette" | "alpine" | "campfire" | "moonrise" | "fieldnotes" | "neon";
```

---

## Testing Checklist

For each theme, verify:
- [ ] Light mode renders correctly (all text readable, contrast passes WCAG AA)
- [ ] Dark mode renders correctly via `prefers-color-scheme: dark`
- [ ] Code blocks are readable in both modes
- [ ] Cards, buttons, links all use theme colors
- [ ] Fonts load correctly (check Network tab for Google Fonts request)
- [ ] Switching to a different theme in `site.config.ts` changes the entire look
- [ ] Removing `theme` from config falls back to `global.css` defaults
- [ ] `site.css` overrides still work on top of the theme
- [ ] Mobile responsive layout is intact
- [ ] No console errors

---

## What NOT to Do

- **Don't use Tailwind.** The whole point is CSS variables. No utility classes.
- **Don't use `@import` in theme CSS.** Fonts are loaded via `<link>` in the HTML head.
- **Don't modify `global.css`.** It's the framework foundation. Themes override it, they don't replace it.
- **Don't require any build step.** Theme files are static CSS in `public/themes/`.
- **Don't create a theme config format.** The CSS IS the config. No JSON, no YAML, no TOML.
- **Don't make this complicated.** If someone can't switch themes by changing one string, you've over-engineered it.

---

## Summary

| What | Where |
|------|-------|
| Theme selector | `SITE.theme` in `src/site.config.ts` |
| Theme CSS files | `public/themes/{name}.css` |
| Theme registry (fonts) | `src/themes/_index.ts` |
| Theme loading | `<link>` tag in `Base.astro` `<head>` |
| Framework styles | `src/styles/global.css` (unchanged) |
| User overrides | `src/styles/site.css` (unchanged, still wins) |

**Total new files:** 11 CSS files + 1 TypeScript registry  
**Modified files:** `Base.astro` (add theme `<link>` + font logic), `site.config.default.ts` (add `theme` field)  
**Deleted files:** None  
**npm packages:** None  

That's the whole system.
