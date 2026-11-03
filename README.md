# Retro Suplex

Source for [retrosuplex.com](https://retrosuplex.com): a static blog about retro wrestling game
translation patches and the tools and techniques behind them (hex editing, text extraction,
compression, fonts, pointer tables, patch tooling).

Built with [Hugo](https://gohugo.io/) (extended edition). Deployed to GitHub Pages by
`.github/workflows/pages.yml` on every push to `main`.

## Development

```sh
hugo server -D          # live preview, including drafts, at http://localhost:1313
hugo --minify           # production build into public/
hugo new posts/my-slug/index.md   # new post from archetypes/default.md
```

## Layout

- `content/posts/<slug>/index.md` – one page bundle per post; images live beside it
- `content/patches/<slug>/index.md` – one page per released patch
- `layouts/` – templates; `layouts/shortcodes/` – `shot`, `compare`, `patch`, `hex`, `demo`
- `assets/css/main.css` – the only stylesheet
- `static/` – files served as-is (CNAME, robots.txt)

## Notes

- Posts start as `draft: true`.
- Screenshots go through the `shot` / `compare` shortcodes so pixel art stays crisp.
- No ROMs, ISOs or original game data are ever committed. Patches are IPS/BPS/xdelta only.
