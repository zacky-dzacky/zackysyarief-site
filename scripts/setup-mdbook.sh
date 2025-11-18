#!/usr/bin/env bash
set -euo pipefail

echo "== mdBook local setup helper =="

if command -v mdbook >/dev/null 2>&1; then
  echo "mdBook already installed: $(mdbook --version)"
  exit 0
fi

if command -v cargo >/dev/null 2>&1; then
  echo "Found cargo. Installing mdBook via 'cargo install mdbook'..."
  cargo install mdbook --locked
  echo "mdBook installed: $(mdbook --version)"
  exit 0
fi

echo "Neither 'mdbook' nor 'cargo' were found on your PATH."
echo
echo "Options to install mdBook locally:"
echo "  1) Install Rust (which includes cargo) and run this script again:" 
echo "       curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh"
echo "       ./scripts/setup-mdbook.sh"
echo
echo "  2) Download a prebuilt mdBook release from:
      https://github.com/rust-lang/mdBook/releases"
echo
echo "After mdBook is installed, run from repo root:"
echo "  npm run mdbook:build   # builds the site in readme/book"
echo "  npm run mdbook:serve   # serves the site locally (live preview)"

exit 1
