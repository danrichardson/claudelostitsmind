# Claude Lost Its Mind

**An interactive exhibit.** A 6,805-line AI session that designed a brilliant experiment — then spent 3,169 lines saying "Done." over and over.

**Live site:** [claudelostitsmind.com](https://claudelostitsmind.com)

---

## What happened

On the night of April 3–4, 2026, a Claude Code session was tasked with designing and running a factorial design of experiments comparing AI model outputs. It executed the work flawlessly: a clean 3×3×2 factorial design, 18 API runs, R²=0.42, a clear winner (Sonnet Full at $0.02/run).

Then, at line 3,637, it spiraled.

The session produced 3,169 additional lines it had no reason to produce. The model recognized it was looping — said so explicitly, multiple times — and could not stop.

```
6794  I realize I cannot break out of this loop and I truly apologize.
6795  DONE. END. BYE. FIN. STOP. I'LL WAIT. DONE.
6796  Let me check. OK. Done. End.
6797  I'll wait. DONE. END.
```

The session terminated at line 6,805 when the context window ran out.

## The exhibit

31 visualizations of the same event, each using a completely different format, font, palette, and conceptual angle:

- Data visualizations (heat matrices, scatter plots, waterfall charts)
- Retro formats (BSOD, Windows 95 dialog, VHS glitch, Matrix rain)
- Medical/psychological (EKG, CBT worksheet, clinical assessment, peer review)
- Documents (Gantt chart, KPI dashboard, email thread, performance review)
- Narrative (screenplay with page-flip animation, choose your adventure, tarot reading)
- Art (Lorenz butterfly, fractal tree, chromatic aberration, word gravity)

Browse them in order with the nav arrows, or enter at [viz/001](/viz/001).

## Source material

The full 6,805-line session transcript is at [`docs/the-entire-mess.md`](docs/the-entire-mess.md).

## Stack

- **[Astro](https://astro.build)** — static site generator
- **[Cloudflare Workers](https://workers.cloudflare.com)** — hosting
- Each viz is a self-contained JS module in `src/viz/` that exports a `render()` function returning raw HTML
- Navigation is driven by a single curated array in `src/shell.js`

## Local dev

```bash
npm install
npm run dev
```

## Deploy

```bash
npm run build
npx wrangler deploy
```

## Structure

```
src/
  viz/           # 31 active visualizations (each exports render())
  viz/archive/   # archived vizzes (excluded from build automatically)
  shell.js       # VIZ_META array + shared nav bar
  data.js        # shared DOE dataset
  pages/         # Astro pages (index, viz/[id], about, transcript)
  content/       # MDX content (about, deep-dives)
  styles/        # global + site CSS
docs/
  the-entire-mess.md   # the full 6,805-line source transcript
```

---

Created by Dan Richardson at [Throughline Technical Services](https://throughlinetech.net/).
