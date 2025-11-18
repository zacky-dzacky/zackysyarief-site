# mdBook deployment & subdomain setup

This document explains how the repository is configured to build and publish the mdBook content (the `readme/` mdBook source) and how to map it to a subdomain.

What I added

- A GitHub Actions workflow: `.github/workflows/mdbook-gh-pages.yml` — builds the mdBook in `readme/` and publishes the generated site (`readme/book`) to the `gh-pages` branch.
- npm convenience scripts in `package.json`: `mdbook:build` and `mdbook:serve` for local testing (require `mdbook` installed locally).

How the CI works

- On push to `main` (or manual dispatch), the workflow:
  1. checks out the repo
  2. sets up Rust and installs `mdbook` (via `cargo install`)
  3. runs `mdbook build` inside `readme/`, which outputs the static site to `readme/book`
  4. optionally writes a `CNAME` file if the repository secret `MDBOOK_CUSTOM_DOMAIN` is set
  5. publishes the `readme/book` folder to the `gh-pages` branch using `peaceiris/actions-gh-pages`

After the workflow publishes to `gh-pages`, you need to configure GitHub Pages and DNS.

Option A — Use GitHub Pages + a subdomain (recommended, minimal DNS work)

1. In your repository Settings → Pages, set the source to the `gh-pages` branch and the root folder (/).
2. If you want a custom subdomain (for example, `docs.example.com`):
   - Add a repository secret named `MDBOOK_CUSTOM_DOMAIN` with the value `docs.example.com` so the workflow writes a `CNAME` into the published site automatically.
   - In your DNS provider, add a CNAME record for `docs` that points to `<your-github-username>.github.io` (or follow GitHub Pages custom domain instructions for apex domains).
   - Wait for DNS to propagate and verify via the Pages settings.

Notes about GitHub Pages & HTTPS

- GitHub Pages will automatically provision HTTPS for the custom domain when DNS is correctly configured.
- If you prefer to manage the CNAME file yourself, skip the secret and add a `CNAME` file under `readme/book` in repo (or manage via Pages settings).

Option B — Host the mdBook output on Vercel and map a subdomain

If you prefer to serve the mdBook from Vercel (so everything stays under Vercel):

1. Create a new Vercel project pointing at the same repository, but set the build output to the `readme/book` folder. One way:
   - In Vercel, create a project from Git and set the Root Directory to `/readme` and the Build Command to `mdbook build` (or `cargo install mdbook && mdbook build`).
   - Set the Output Directory to `book`.
2. Add a domain mapping in Vercel and create a DNS CNAME to the Vercel alias for `docs.example.com`.

Option C — Serve mdBook under a subpath of the main site (example.com/wiki)

This repository now includes a helper that will build mdBook and copy the generated static files into `public/wiki`. When you run the normal Next.js build on Vercel, anything in `public/` is published at the root of your site — so files in `public/wiki` will be available at `https://<your-site>/wiki`.

How it works (what I added):

- A script at `scripts/copy-mdbook-to-public.js` that copies `readme/book` -> `public/wiki`.
- A new npm script `mdbook:build-and-copy` that runs `mdbook build` in `readme/` and then runs the copy script.
- The `build` script now runs `npm run mdbook:build-and-copy` before the Next.js build, so CI or Vercel standard builds will include the mdBook output under `/wiki`.

Local steps to test subpath setup:

1. Build mdBook and copy into `public`:

```bash
npm run mdbook:build-and-copy
```

2. Start the Next dev server (or run a production build):

```bash
# dev (makes hot reload easier for Next; mdBook files are served from public/)
npm run dev

# or create a production build
npm run build
npm run serve
```

3. Visit `http://localhost:3000/wiki` to see the mdBook pages served from the Next.js public folder.

Notes and caveats:

- The copy-step uses a simple recursive copy script. If you prefer robust sync behavior (skip unchanged files, etc.) you can replace it with `rsync` or `fs-extra`.
- If you deploy to Vercel, ensure build caching is OK; the `mdbook build` step runs during the build and the copy places files into the `public/` folder which Vercel will publish.
- Serving under a subpath (vs subdomain) means assets and links must be relative or use absolute paths under `/wiki`. mdBook's `book.toml` has an `output.html.site-url` — you may need to set it to "/wiki/" or adjust templates so generated links and search index use the right base path.


Pros/cons

- GitHub Pages: simple, free, integrates with the workflow above, and easy to map a subdomain.
- Vercel: can integrate into your Vercel dashboard and use Vercel features, but requires an extra project and build config.

Local testing

- Install mdBook locally (see https://github.com/rust-lang/mdBook):

  cargo install mdbook --locked

- Then run:

  npm run mdbook:build
  npm run mdbook:serve

The `mdbook:serve` command launches a local server (default port 3000) to preview the site.

Local development helper script

I added a convenience script at `scripts/setup-mdbook.sh` that will:

- check if `mdbook` is already on your PATH
- if not, attempt to install it via `cargo install mdbook` when `cargo` is available
- otherwise print platform-agnostic instructions for installing mdBook

Usage (from the repository root):

```bash
# make script executable (only needed once)
chmod +x ./scripts/setup-mdbook.sh

# run the helper (it will install via cargo if cargo is present)
./scripts/setup-mdbook.sh

# build and serve locally
npm run mdbook:build
npm run mdbook:serve
```

If you prefer a prebuilt binary or need a specific mdBook version, download it from the releases page:
https://github.com/rust-lang/mdBook/releases


Next steps I can do for you

- Add a `CNAME` file to the repo if you provide the subdomain you want, and optionally set it directly in the workflow instead of using a secret.
- Create a Vercel project configuration example if you prefer Option B.
- Help configure the repository Pages settings or prepare the DNS record text for your DNS provider.
