# Ahmed Alkaf — Portfolio

The source of my portfolio site: projects, skills, and resume.

Live site: **<https://ahmed.kaflabs.com>**

## Stack

- [Next.js](https://nextjs.org/) 16 (App Router, TypeScript) with static export (`output: 'export'`).
  `next build` writes the complete site into `out/`. No server runs.
- The content is Markdown, read at build time (`unified`, `remark`, `rehype`, `yaml`).
- Hosting: Cloudflare Pages.

## Where things are

| Path | What it is |
|---|---|
| `_posts/YYYY-MM-DD-<slug>.md` | One project. The URL is `/posts/<slug>/`. |
| `_tabs/resume.md` | The Resume page (`/resume/`). `<!-- skills -->` shows the list of skills. |
| `_tabs/*.md` | The menu tabs and their order (`order:`). A tab with `layout: categories`, `tags`, or `archives` is a generated page. A tab without `layout` is a Markdown page at `/<file name>/`. |
| `public/` | Files that are copied as they are: images (`public/assets/img/`), favicons, `CNAME`, `_headers`. |
| `src/site.config.ts` | The site title, description, URL, avatar, and social links. |
| `src/lib/content.ts` | Reads the posts and tabs, and makes the tag and category lists. |
| `src/lib/markdown.ts` | Markdown to HTML. |
| `src/app/` | The pages, the sitemap, `robots.txt`, and the Atom feed (`/feed.xml`). |
| `scripts/check-urls.mjs` | Checks that each URL of the old Jekyll site exists in `out/`. |

### Write a post

Add `_posts/YYYY-MM-DD-<slug>.md`:

```markdown
---
title: My Project
date: 2026-10-20
categories: [Projects, My Project]
tags: [next.js, typescript]   # each tag is a "skill" at /tags/<tag>/
media_subpath: /assets/img/Projects/My Project
image:
  path: /my-project-logo.png   # in public/assets/img/Projects/My Project/
  alt: My Project logo
---

> A note box.
{: .prompt-tip}

![Screenshot](/screenshot.webp)
_The image caption_
```

The Markdown supports these extras (from the old Jekyll site):

- `{: .prompt-tip}`, `.prompt-info`, `.prompt-warning`, `.prompt-danger` on the line after a blockquote: a colored note box.
- `_caption_` on the line after an image: the image caption.
- `{: w="200"}` after an image: the image width.
- `media_subpath`: the folder for the image paths of the post.
- `{% include embed/youtube.html id='VIDEO_ID' %}`: a YouTube video.
- External links open in a new tab.

## Commands

You need Node.js 20.9 or newer.

```bash
npm install          # once
npm run dev          # local dev server with live reload (http://localhost:3000)
npm run build        # build the static site into out/
npm start            # serve out/ locally (after a build)
npm run check        # type check and lint
npm run check:urls   # check the old Jekyll URLs against out/ (after a build)
```

## Publish

`publish.ps1` installs the packages, checks, builds, checks the URLs, and deploys `out/` to Cloudflare Pages with Wrangler.
You need PowerShell and Node.js.

```powershell
./publish.ps1              # check, build, and deploy
./publish.ps1 -SkipChecks  # build and deploy, no checks
./publish.ps1 -SkipDeploy  # build into out/ only, no deploy
```

The first deploy needs a Cloudflare login: `npx --yes wrangler@latest login`.

## License

`LICENSE` is the MIT License of the original Chirpy starter (Cotes Chung). The code of this site is new.
The posts are licensed under CC BY 4.0.
