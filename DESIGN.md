# Design brief

## Reader and job

The site is the portfolio link on each CV. The reader is a recruiter or an engineering manager. The reader gives it 30 to 90 seconds and has two questions:

1. Is this person a match for a React / TypeScript / Next.js / full-stack role? (recruiter, first 10 seconds)
2. Is the work real, and how deep is it? (engineering manager, the next minute)

Each page decision serves one of these two questions, or the next step: contact.

## Information order (home page)

1. **First screen**: name, role, location, one sentence of value with the core stack, and the contact actions (Email, Resume, GitHub, LinkedIn). An "at a glance" panel gives the facts that a recruiter scans for: experience, core stack, public products, other work, education.
2. **Products in production**: the public live products first (Etamyd, CornerTill, PDF Anvil, SetupForge, QR Anvil). The site gives no count of products, and it gives no name or detail of internal work in private repositories. Each has a real screenshot in a browser frame (the address bar shows the live domain), the case study in short (problem, what I built, result), the stack, and the links (case study, live site, source).
3. **More projects**: compact cards for the strongest earlier work: the ACTS capstone, then Schedule Builder (a course project, online as a live demo and open source), with a link to the full list. The other projects are only on `/projects/`, after the live products. Only the public live products have the green "Live" badge; a course project that is online has a "Live demo" label.
4. **Skills**: grouped by area. A skill that a project uses links to the projects that use it.
5. **Contact**: one band with email, copy email, resume, GitHub, LinkedIn.

## Visual direction

A warm "workshop" look that fits the Anvil / Forge product names and the KafLabs orange. It is not a theme copy.

- **Type**: Bricolage Grotesque (headings, tight tracking), Geist (body text), Geist Mono (labels, stack chips, metadata). All self-hosted through `next/font`.
- **Color tokens** (`src/app/globals.css`, `light-dark()` with a `prefers-color-scheme` fallback):

  | Token | Light | Dark | Use |
  |---|---|---|---|
  | `--paper` | `#f7f5f0` | `#141210` | page background |
  | `--surface` | `#ffffff` | `#1c1916` | cards, panels |
  | `--ink` | `#1a1714` | `#f3efe8` | text |
  | `--muted` | `#5a534b` | `#b3aa9f` | secondary text (≥ 6.8:1) |
  | `--accent` | `#c2410c` | `#fb923c` | links, primary buttons, labels (≥ 4.6:1) |
  | `--live` | `#166534` | `#4ade80` | the "Live" status |
  | `--line-strong` | `#8c8277` | `#6f665c` | control borders (≥ 3:1) |

- **Spacing**: a 16 px side gutter on phones, a 1120 px content width, 72 to 120 px between sections, 12 px radius on panels.
- **Motion**: small hover lifts only. All motion is off with `prefers-reduced-motion`.

## Features (and why)

| Feature | Why |
|---|---|
| First screen with role, stack, and contact actions | The recruiter sees the match and the next step without a scroll. |
| "At a glance" facts panel | The facts that a recruiter checks first, in one place. |
| Live products first, with real screenshots and the live domain | Proof that the work is real and in production. |
| Case study in short (problem / built / result) | The manager sees the depth in 15 seconds, before the full post. |
| Stack chips that link to skill pages | The reader can check one technology across all projects. |
| Project filter by stack (`?stack=` in the URL) | A recruiter can look at "React" projects only, and share that link. |
| Image lightbox (native `<dialog>`) | Screenshots are readable at full size. Esc, arrow keys, focus return. |
| Resume page with a print style | "Print or save as PDF" gives a clean one-column resume. No CV file with private data is in the repo. |
| Copy email button | Some readers use web mail. The address is put together only in the browser. |
| Share image for each page, JSON-LD (Person, WebSite, Article) | Good link previews in LinkedIn, Slack, and email, and good search results. |
| Light and dark mode (system, plus a toggle) | Reader comfort. The toggle shows only the other scheme, and returns to "system". |
| Static, little JavaScript, self-hosted fonts, no trackers | Fast on a phone, and nothing to block. |
| Keyboard and contrast checks | Skip link, visible focus, real buttons, WCAG AA contrast. |

## Chirpy features left out on purpose

Categories tree, Timeline (archives) page, sidebar profile, table of contents, "recently updated" and "trending tags" panels, reading-progress and post-sharing widgets, the PWA cache, and the CC BY license footer. They help a blog reader, not a recruiter. The old URLs still work: `/categories/...` and `/timeline/` send the reader to the matching project or to `/projects/`.
