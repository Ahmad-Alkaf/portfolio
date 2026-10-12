# Ahmed Alkaf — Portfolio

The source of my portfolio site: projects, skills, and resume.

Live site: **<https://ahmed.kaflabs.com>**

## Stack

- [Jekyll](https://jekyllrb.com/) with the [Chirpy](https://github.com/cotes2020/jekyll-theme-chirpy) theme (installed as a gem).
- Each project is a post in `_posts/`. The post tags make the **Skills** tab.
- The resume is `_tabs/resume.md`.
- Hosting: Cloudflare Pages.

## Build and publish

`publish.ps1` builds the site in Docker (`ruby:3.4`) and deploys `_site` to Cloudflare Pages with Wrangler.
You need PowerShell, Docker, and Node.js.

```powershell
./publish.ps1              # build, check links (html-proofer), and deploy
./publish.ps1 -SkipTest    # build and deploy, no link check
./publish.ps1 -SkipDeploy  # build into _site only, no deploy
```

The first deploy needs a Cloudflare login: `npx --yes wrangler@latest login`.

## Local preview

`serve.ps1` starts the Jekyll dev server with live reload (`bundle exec jekyll s -l -o`). It needs Ruby and Bundler on the machine.

## License

`LICENSE` is the MIT License of the Chirpy starter (Cotes Chung).
