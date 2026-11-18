# Ahmed Alkaf — Portfolio

The source of **<https://ahmed.kaflabs.com>**: my projects, case studies, skills, and resume.

I am a full-stack software engineer. I build web products with TypeScript, React, Next.js, Node.js, and PostgreSQL.

## What the site has

- **Home**: who I am in one screen, my live products with a short case study each (problem, what I built, result), more projects, my skills, and a contact section.
- **Projects** (`/projects/`): every project, with a filter by stack. The filter is kept in the URL (`/projects/?stack=react`).
- **Case studies** (`/posts/<slug>/`): one page for each project, with the live site and source links, the stack, and screenshots that open larger.
- **Skills** (`/tags/`): skills by area, and one page for each technology with the projects that use it.
- **Resume** (`/resume/`): a one-column resume with a print style. "Print or save as PDF" makes a clean PDF.
- Light and dark mode (follows the system, with a toggle), share images for each page, structured data, a sitemap, and an Atom feed (`/feed.xml`).

The design decisions are in [`DESIGN.md`](DESIGN.md).

## Stack

- [Next.js](https://nextjs.org/) 16 (App Router, TypeScript) with static export (`output: 'export'`). `next build` writes the complete site into `out/`. No server runs.
- The content is Markdown, read at build time (`unified`, `remark`, `rehype`, `yaml`).
- Fonts: Bricolage Grotesque, Geist, and Geist Mono through `next/font` (downloaded at build time and served from this site).
- No analytics, no trackers, no third-party scripts.
- Hosting: Cloudflare Pages.

## Where things are

| Path | What it is |
|---|---|
| `_posts/YYYY-MM-DD-<slug>.md` | One project. The URL is `/posts/<slug>/`. |
| `_tabs/resume.md` | The text of the Resume page. `<!-- skills -->` and `<!-- projects -->` show the skills and the project list. |
| `public/` | Files that are copied as they are: images, favicons, `CNAME`, `_headers`, `_redirects`. |
| `src/site.config.ts` | Name, role, links, navigation, the skills list, and the tag names. |
| `src/lib/content.ts` | Reads the posts and the resume, and makes the tag lists. |
| `src/lib/markdown.ts` | Markdown to HTML. |
| `src/lib/og.tsx` | The share images (1200 × 630), drawn at build time. |
| `src/components/` | The page parts (header, project cards, filter, lightbox, theme toggle, ...). |
| `src/app/` | The pages, the sitemap, `robots.txt`, and the feed. |
| `scripts/check-urls.mjs` | Checks that each URL of the old site still exists in `out/`. |

### Add a project

Add `_posts/YYYY-MM-DD-<slug>.md`:

```markdown
---
title: My Project
date: 2026-10-20
categories: [Projects, My Project]
tags: [next.js, typescript, postgresql]   # each tag has a page at /tags/<tag>/
media_subpath: /assets/img/Projects/My Project
image:
  path: /my-project-logo.png              # the logo (in public/assets/img/Projects/My Project/)
  alt: My Project logo
summary: One sentence that says what the project is.
kind: Personal product                    # for example Team product, Course project
status: live                              # live | public repo | open source
featured: 5                               # optional: the order on the home page
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
