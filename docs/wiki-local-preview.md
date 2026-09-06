# Wiki (mdBook) — how to see a new page on localhost

The `/wiki` section of the site is **not** rendered by Next.js. It is a static
[mdBook](https://rust-lang.github.io/mdBook/) built from `readme/src/` into `readme/book/`,
then copied into `public/wiki/` and served as plain static files.

```
readme/src/**.md   --(mdbook build)-->   readme/book/   --(copy script)-->   public/wiki/   -->   http://localhost:3000/wiki
```

Because of that pipeline, **editing or adding a markdown file under `readme/src/` does nothing on
its own** — the Next.js dev server never reads those files. You have to rebuild the book and
re-copy it.

## Quick answer — the 3 steps

```bash
# 1. Make sure the new page is listed in readme/src/SUMMARY.md (see below)

# 2. Rebuild the book and copy it into public/wiki
npm run mdbook:build-and-copy

# 3. Hard-refresh the browser (Cmd+Shift+R) at http://localhost:3000/wiki
```

**`yarn dev` / `npm run dev` does not build the book** — it is plain `next dev`. Only `npm run
build` runs the mdBook step. So step 2 is the one that actually matters; restarting the dev server
without it changes nothing.

Restarting the dev server is *not* normally required: Next.js serves `public/` from disk on each
request, so a hard refresh is enough. Restart only as a fallback if a brand-new page still 404s or
500s after the rebuild (see Troubleshooting).

## Step 1 — register the page in `SUMMARY.md` (most common mistake)

mdBook only builds files that appear in `readme/src/SUMMARY.md`. A markdown file that exists on
disk but is not listed there is silently ignored: no HTML is generated, no sidebar link, no search
entry.

So after creating `readme/src/ai/report.md`, add a matching line to `readme/src/SUMMARY.md`:

```markdown
# Artificial Intelligence
- [Books](ai/books.md)
- [Journals](ai/journals.md)
- [Reports](ai/report.md)        <-- new entry
```

The indentation matters: a two/four-space indent nests the page under the entry above it, no
indent makes it a top-level chapter in that section.

## Step 2 — rebuild

```bash
npm run mdbook:build-and-copy
```

That single script does three things:

1. runs `scripts/setup-mdbook.sh` (installs mdBook via cargo if it is missing),
2. runs `mdbook build` inside `readme/` → writes `readme/book/`,
3. runs `scripts/copy-mdbook-to-public.js` → **wipes and replaces** `public/wiki/`.

If you only want to preview the book by itself, without Next.js:

```bash
npm run mdbook:serve      # live-reload preview of just the wiki, default http://localhost:3000
```

Note that `mdbook serve` also defaults to port 3000, so stop the Next dev server first or pass
`--port`, e.g. `cd readme && mdbook serve --port 3001`.

## Step 3 — refresh (restart only if needed)

Next.js reads `public/` from disk per request, so the regenerated files are live immediately. Hard
-refresh the browser (**Cmd+Shift+R**) — `/wiki/*` assets are cached aggressively, and a normal
reload will often show the old page.

If a brand-new page still 404s or 500s after that, restart the dev server:

```bash
# Ctrl+C in the terminal running the dev server
npm run dev
```

There is no hot reload for `/wiki` either way — the book is static output, so every markdown edit
needs the step-2 rebuild. Normal Next.js/MDX blog changes still hot reload as usual.

## Verify

```bash
ls public/wiki/ai/report.html          # the generated page must exist
open http://localhost:3000/wiki/ai/report.html
```

If the file is not there, go back to Step 1 — it is almost always a missing `SUMMARY.md` entry or
a path typo in it.

## Troubleshooting

| Symptom | Cause / fix |
| --- | --- |
| Page missing entirely, no sidebar link | Not listed in `readme/src/SUMMARY.md`. |
| Old content still shown | You skipped `npm run mdbook:build-and-copy`, or browser cache — hard refresh (Cmd+Shift+R) or open in a private window. |
| New page 404s / 500s right after a rebuild | Restart the dev server (`Ctrl+C`, `npm run dev`); it can also just be the server still warming up — retry a few seconds later. |
| `mdbook: command not found` | Run `./scripts/setup-mdbook.sh`, or `cargo install mdbook --locked`. The npm script also falls back to `~/.cargo/bin/mdbook`. |
| Broken CSS/links under `/wiki` | `site-url` in `readme/book.toml` must stay `"/wiki/"`. |
| Works locally but not deployed | The root `npm run build` already runs `mdbook:build-and-copy`, so just commit both the `readme/src/` change **and** the regenerated `public/wiki/` files. |

## Related

- `docs/MDBook-deployment.md` — how the wiki is deployed (GitHub Pages / Vercel / `/wiki` subpath).
- `app/wiki/page.tsx` — the Next.js route that redirects `/wiki` to `/wiki/index.html`.
