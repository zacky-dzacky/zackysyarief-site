#!/usr/bin/env node
"use strict";

/* eslint-disable @typescript-eslint/no-require-imports */
// The copy script runs under Node and uses CommonJS `require()` imports.
// The repository's ESLint rule blocks `require()` style imports in TS files;
// disable that rule for this utility script.
const fs = require("fs");
const path = require("path");

function rimrafSync(p) {
  if (!fs.existsSync(p)) return;
  const stat = fs.lstatSync(p);
  if (stat.isDirectory()) {
    for (const name of fs.readdirSync(p)) {
      rimrafSync(path.join(p, name));
    }
    fs.rmdirSync(p);
  } else {
    fs.unlinkSync(p);
  }
}

function copySync(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    for (const name of fs.readdirSync(src)) {
      copySync(path.join(src, name), path.join(dest, name));
    }
  } else {
    // ensure dest dir exists
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

function main() {
  const repoRoot = path.resolve(__dirname, "..");
  const mdbookOut = path.join(repoRoot, "readme", "book");
  const publicTarget = path.join(repoRoot, "public", "wiki");

  if (!fs.existsSync(mdbookOut)) {
    console.error("mdBook output not found. Run `mdbook build` first. Expected:", mdbookOut);
    process.exit(1);
  }

  console.log(`Removing existing ${publicTarget} (if any)`);
  rimrafSync(publicTarget);

  console.log(`Copying mdBook output from ${mdbookOut} -> ${publicTarget}`);
  copySync(mdbookOut, publicTarget);

  console.log("Copy complete. mdBook will be available under /wiki when Next.js deploys the public folder.");
}

main();
