// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// THEME REGISTRY
//
// This file is part of the Loomwork framework.
// Maps theme names to their CSS file path and Google Fonts URL.
//
// Theme CSS files live in public/themes/{name}.css and are loaded
// via <link> in Base.astro. The registry lets Base.astro know
// which fonts each theme needs without any @import in CSS.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type ThemeName =
  | "manuscript"
  | "brutalist"
  | "atelier"
  | "terminal"
  | "gazette"
  | "alpine"
  | "campfire"
  | "moonrise"
  | "fieldnotes"
  | "neon";

export interface ThemeMeta {
  /** Path to the theme CSS file relative to public/themes/ */
  css: string;
  /** Google Fonts URL for this theme. Empty string = system fonts. */
  fonts_url: string;
  /** Short tagline for humans */
  tagline: string;
}

export const THEMES: Record<ThemeName, ThemeMeta> = {
  manuscript: {
    css: "manuscript.css",
    fonts_url:
      "https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,700&family=JetBrains+Mono:wght@400;500&display=swap",
    tagline: "The best article you've ever read.",
  },
  brutalist: {
    css: "brutalist.css",
    fonts_url:
      "https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap",
    tagline: "No decoration. No apology.",
  },
  atelier: {
    css: "atelier.css",
    fonts_url:
      "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Work+Sans:wght@400;500;600;700&display=swap",
    tagline: "Space to breathe.",
  },
  terminal: {
    css: "terminal.css",
    fonts_url:
      "https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&display=swap",
    tagline: "ssh into my website.",
  },
  gazette: {
    css: "gazette.css",
    fonts_url:
      "https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;500;600;700&family=Source+Code+Pro:wght@400;500&display=swap",
    tagline: "Above the fold.",
  },
  alpine: {
    css: "alpine.css",
    fonts_url:
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap",
    tagline: "Ship it.",
  },
  campfire: {
    css: "campfire.css",
    fonts_url:
      "https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400&family=Nunito:wght@400;600;700&display=swap",
    tagline: "Pull up a chair.",
  },
  moonrise: {
    css: "moonrise.css",
    fonts_url:
      "https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600;700&family=Fira+Code:wght@400;500&display=swap",
    tagline: "After dark.",
  },
  fieldnotes: {
    css: "fieldnotes.css",
    fonts_url:
      "https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,700;1,400&family=Inconsolata:wght@400;500;600&display=swap",
    tagline: "Properly cited.",
  },
  neon: {
    css: "neon.css",
    fonts_url:
      "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=Fira+Code:wght@400;500&display=swap",
    tagline: "Turn it up.",
  },
};
