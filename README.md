# Ahmed Alkaf — Portfolio

The source of **<https://ahmed.kaflabs.com>**: my projects, case studies, skills, and resume.

I am a full-stack software engineer. I build web products with TypeScript, React, Next.js, Node.js, and PostgreSQL.

## What the site has

The site has two languages. **Arabic is the default language** and has the URLs with no prefix (`/`, `/projects/`, `/posts/<slug>/`). **English** has the same paths under `/en/` (`/en/`, `/en/projects/`, `/en/posts/<slug>/`). The slugs are the same in the two languages. A switch in the header goes to the same page in the other language.

- **Home**: who I am in one screen, my live products with a short case study each (problem, what I built, result), more projects, my skills, and a contact section.
- **Projects** (`/projects/`): every project, live products first, with a filter by stack. The filter is kept in the URL (`/projects/?stack=react`).
- **Case studies** (`/posts/<slug>/`): one page for each project, with the live site and source links, the stack, and screenshots that open larger.
- **Skills** (`/tags/`): skills by area, and one page for each technology with the projects that use it.
- **Resume** (`/resume/`): a one-column resume with a print style. "Print or save as PDF" makes a clean PDF.
- Light and dark mode (follows the system, with a toggle), share images for each page, structured data, a sitemap with the two languages, and an Atom feed for each language (`/feed.xml` in Arabic, `/en/feed.xml` in English).
- A "not found" page for each language (`/404.html` in Arabic, `/en/404.html` in English).

The design decisions are in [`DESIGN.md`](DESIGN.md).

## Stack

- [Next.js](https://nextjs.org/) 16 (App Router, TypeScript) with static export (`output: 'export'`). `next build` writes the complete site into `out/`. No server runs.
- The content is Markdown, read at build time (`unified`, `remark`, `rehype`, `yaml`).
- Fonts: Bricolage Grotesque, Geist, and Geist Mono for Latin text, and IBM Plex Sans Arabic for Arabic text, through `next/font` (downloaded at build time and served from this site).
- Two languages with no i18n framework: a typed dictionary for the interface text, and one Markdown file for each language of a post.
- No analytics, no trackers, no third-party scripts.
- Hosting: Cloudflare Pages.

## Where things are

| Path | What it is |
|---|---|
| `_posts/YYYY-MM-DD-<slug>.md` | One project: the English text, and the facts (date, tags, links, images, order). The URLs are `/posts/<slug>/` (Arabic) and `/en/posts/<slug>/` (English). |
| `_posts/YYYY-MM-DD-<slug>.ar.md` | The Arabic text of the same project. |
| `_tabs/resume.md`, `_tabs/resume.ar.md` | The text of the Resume page in English and in Arabic. `<!-- skills -->` and `<!-- projects -->` show the skills and the project list. |
| `public/` | Files that are copied as they are: images, favicons, `CNAME`, `_headers`, `_redirects`. |
| `src/site.config.ts` | The settings that are the same in each language: the URL, contact links, the skills list, and the tag names. |
| `src/i18n/en.ts`, `src/i18n/ar.ts` | The dictionaries: all the interface text (name, role, navigation, headings, buttons, labels) in English and in Arabic. `en.ts` gives the shape, and the type check fails if `ar.ts` does not have a key. |
| `src/i18n/config.ts`, `src/i18n/bidi.ts` | The language list and the URL helpers, and the helper for Latin names in Arabic text. |
| `src/lib/content.ts` | Reads the posts and the resume, and makes the tag lists. |
| `src/lib/markdown.ts` | Markdown to HTML. |
| `src/lib/og.tsx` | The share images (1200 × 630), drawn at build time. |
| `src/lib/fonts.ts` | The fonts. |
| `src/components/` | The page parts (header, language switch, project cards, filter, lightbox, theme toggle, ...). |
| `src/views/` | The pages. Each page is written one time and gets the language as `lang`. |
| `src/app/(ar)/`, `src/app/en/` | The routes of the two languages. Each file is a few lines: it gives a page from `src/views/` its language. Each folder has its own root layout, which sets `<html lang dir>`. |
| `src/app/` | Also the sitemap, `robots.txt`, the feeds, the share images, and the Arabic "not found" page (`global-not-found.tsx`). |
| `scripts/postbuild.mjs` | Runs after `next build`: moves the English "not found" page to `out/en/404.html`. |
| `scripts/check-urls.mjs` | Checks that each URL of the old site still exists in `out/`. |

### Add a project

A project has two files with the same name: the English file, and the Arabic file with `.ar` before `.md`. The build stops if the Arabic file or one of its fields is missing, so a page is never half translated.

**1. The English file**, `_posts/YYYY-MM-DD-<slug>.md`. It has the English text and all the facts:

```markdown
---
title: My Project
# name: My Project                        # optional: a short name for the cards and lists (default: the title)
date: 2026-10-20
categories: [Projects, My Project]
tags: [next.js, typescript, postgresql]   # each tag has a page at /tags/<tag>/
media_subpath: /assets/img/Projects/My Project
image:
  path: /my-project-logo.png              # the logo (in public/assets/img/Projects/My Project/)
  alt: My Project logo
summary: One sentence that says what the project is.
kind: Personal product                    # for example Team product, Course project
status: live                              # live (a product) | live demo (a course project online) | public repo | open source | not deployed
featured: true                            # optional: also show it in "Products in production" on the home page (needs order)
order: 6                                  # optional: the order on /projects/, the resume, and the home page (live products first)
# more: true                              # optional, for a post with no featured: a card in "More projects" on the home page
links:
  live: https://example.com
  source: https://github.com/Ahmad-Alkaf/my-project
screenshot:                               # optional: shown in a browser frame
  path: /my-project-home.webp
  small: /my-project-home-640.webp        # optional: a 640 px copy for phones
  alt: The My Project home page
  domain: example.com
case:                                     # optional: the case study in short
  problem: ...
  built: ...
  result: ...
---

The post text in Markdown.
```

**2. The Arabic file**, `_posts/YYYY-MM-DD-<slug>.ar.md`. It has only the text fields and the post body. The date, tags, links, image paths, status, and order come from the English file.

```markdown
---
# title: ...                              # optional: an Arabic title (default: the English title; a product name stays in English)
# name: ...                               # optional
summary: جملة واحدة تقول ما هو المشروع.
kind: منتج شخصي                           # necessary if the English file has kind
image:
  alt: شعار My Project                    # necessary if the English file has image.alt
screenshot:
  alt: الصفحة الرئيسية لـ My Project        # necessary if the English file has screenshot.alt
case:                                     # necessary if the English file has case
  problem: ...
  built: ...
  result: ...
---

نص المشروع بصيغة Markdown.
```

Rules for the Arabic text:

- Say the same facts as the English text. Keep product names, technology names, domains, and code in English.
- Write plain text. Do not add direction marks: the build puts each Latin name in a left-to-right isolate (`src/i18n/bidi.ts`), so `C#`, `.NET`, and a list such as `React، Next.js` show in the correct order.
- Write a ratio or a value with a unit in words (`4.12 من 5`), or in an element with `dir="ltr"` (`<span dir="ltr">8.0 CE</span>`).
- A link to a page of the site has no language prefix (`[ACTS](/posts/ACTS)`). The build adds `/en` on the English pages.

A new interface text goes into `src/i18n/en.ts` and `src/i18n/ar.ts`. A new status (`status:`) needs a label in `project.status` of the two dictionaries.

The Markdown also supports the extras of the old Jekyll site: `{: .prompt-tip}` (and `.prompt-info`, `.prompt-warning`, `.prompt-danger`) after a blockquote, `_caption_` on the line after an image, `{: w="200"}` after an image, `media_subpath`, and `{% include embed/youtube.html id='VIDEO_ID' %}`.

## Commands

You need Node.js 20.9 or newer.

```bash
npm install          # once
npm run dev          # local dev server (http://localhost:3000)
npm run build        # build the static site into out/
npm start            # serve out/ locally (after a build)
npm run check        # type check and lint
npm run check:urls   # check the old URLs against out/ (after a build)
```

## Publish

`publish.ps1` installs the packages, checks, builds, checks the URLs, and deploys `out/` to Cloudflare Pages with Wrangler.

```powershell
./publish.ps1              # check, build, and deploy
./publish.ps1 -SkipChecks  # build and deploy, no checks
./publish.ps1 -SkipDeploy  # build into out/ only, no deploy
```

The first deploy needs a Cloudflare login: `npx --yes wrangler@latest login`.

## Copyright

© Ahmed Alkaf. All rights reserved.
