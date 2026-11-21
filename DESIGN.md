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

- **Type**: Bricolage Grotesque (headings, tight tracking), Geist (body text), Geist Mono (labels, stack chips, metadata), and IBM Plex Sans Arabic (all Arabic text; see "Languages"). All self-hosted through `next/font`.
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

## Languages

The owner is in Jeddah, and some of the products are Arabic-first. So **Arabic is the default language**, and English is the second language.

- **URLs**: Arabic has the URLs with no prefix (`/projects/`), which are also the URLs of the old site. English has the same paths under `/en/`. The site is a static export, so there is no redirect by browser language: the reader selects the language with the switch in the header. The switch shows the name of the other language in that language ("English", "العربية"), goes to the same page, and keeps the project filter (`?stack=`).
- **Where the text is**: the interface text is in two typed dictionaries (`src/i18n/en.ts`, `src/i18n/ar.ts`). A post has one Markdown file for each language (`<name>.md`, `<name>.ar.md`). The facts of a post (date, tags, links, images) are only in the English file, so the two languages cannot disagree. The build stops if an Arabic text is missing.
- **What stays in English**: product names, technology names, tag names, domains, and code. The stack chips, the browser frame, and the code blocks are left-to-right in each language.
- **Arabic tone**: first person, direct, a little informal, as an engineer writes to a peer. Clear modern Arabic with a light conversational touch ("شغّال", "يقدر"), no heavy dialect. The English technical term stays where Arab developers use it (middleware, transaction, rate limit).
- **Right-to-left**: the Arabic pages have `<html lang="ar" dir="rtl">`. The styles use logical properties (inline-start, inline-end), so one stylesheet serves the two directions. The arrows that show a direction ("All projects", "Case study", newer and older, the lightbox arrows) are mirrored. The external-link arrow, the logos, the browser frame with its window dots, the screenshots, and the code are not mirrored.
- **Mixed direction**: a Latin name in an Arabic sentence can show in the wrong order (`C#` as `#C`, `.NET` as `NET.`, a list of names from left to right). At build time, `src/i18n/bidi.ts` puts each Latin name in a Unicode left-to-right isolate. The Markdown files and the dictionary stay plain text. The metadata, the feeds, and the structured data get the text with no isolate characters.
- **Arabic typeface: IBM Plex Sans Arabic.** It is the Arabic member of a grotesque family, so its low-contrast strokes and open shapes agree with Geist in running text, and at 700 it has enough weight next to the Bricolage Grotesque headings. It is common in Arabic technical products, so it reads as "engineering", not as a newspaper or a calligraphy face. Noto Sans Arabic is more neutral and has less character. Readex Pro is wider and rounder than the two Latin faces. The font has no variable file, so the site loads four weights (400, 500, 600, 700). The Latin fonts are first in each font list and have no Arabic letters, so each Latin letter still comes from Bricolage Grotesque, Geist, or Geist Mono.
- **Arabic type rules**: more line height (1.85 for text, 1.4 for headings), no letter spacing, and no uppercase. Letter spacing breaks the joins between Arabic letters. The small labels are mono, uppercase, and spaced in English; in Arabic they use the text font at 14 px and weight 600. Numbers are Western digits, and dates use the Gregorian calendar (2 سبتمبر 2026).
- **Font loading**: the Arabic pages preload the Arabic font files, and `font-display: swap` shows the text at once. The fallback face has the line metrics of IBM Plex Sans Arabic, so the baseline does not move when the font arrives. The widths are not adjusted (each system has a different Arabic font): in a test with the web fonts blocked, the desktop hero keeps its height, and the phone hero changes by one line of text. The English pages do not preload the Arabic font.
- **Share images**: English for the two languages. The renderer of `next/og` (Satori) has no right-to-left support and draws the words of an Arabic sentence in the wrong order. An English image is better than an Arabic image with wrong text.
- **Feeds**: `/feed.xml` (the feed URL of the old site) is the Arabic feed, because Arabic is the default language at the default URLs. `/en/feed.xml` is the English feed. Each page links to the feed of its language.
- **Search engines**: each page has a canonical URL for its language and `hreflang` links (`ar`, `en`, and `x-default` to Arabic). The sitemap has each page in the two languages. Open Graph has the locale (`ar_SA`, `en_US`), and the structured data has `inLanguage`.
- **Not found**: `/404.html` is Arabic. `/en/404.html` is English: Cloudflare Pages serves the nearest `404.html` of a path. The old Chirpy URLs (`/categories/...`, `/timeline/`) also exist under `/en/`.

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
| Resume page with a print style | "Print or save as PDF" gives a clean one-column resume in each language. No CV file with private data is in the repo. |
| Arabic (default) and English, with a language switch | The reader in the Gulf gets Arabic first, and each page has the same content in English at the same path under `/en/`. |
| Copy email button | Some readers use web mail. The address is put together only in the browser. |
| Share image for each page, JSON-LD (Person, WebSite, Article) | Good link previews in LinkedIn, Slack, and email, and good search results. |
| Light and dark mode (system, plus a toggle) | Reader comfort. The toggle shows only the other scheme, and returns to "system". |
| Static, little JavaScript, self-hosted fonts, no trackers | Fast on a phone, and nothing to block. |
| Keyboard and contrast checks | Skip link, visible focus, real buttons, WCAG AA contrast. |

## Chirpy features left out on purpose

Categories tree, Timeline (archives) page, sidebar profile, table of contents, "recently updated" and "trending tags" panels, reading-progress and post-sharing widgets, the PWA cache, and the CC BY license footer. They help a blog reader, not a recruiter. The old URLs still work: `/categories/...` and `/timeline/` send the reader to the matching project or to `/projects/`.
