#!/usr/bin/env bash
set -euo pipefail

echo "== mdBook setup helper =="

# If mdbook already available, report and exit
if command -v mdbook >/dev/null 2>&1; then
  echo "mdBook already installed: $(mdbook --version)"
  exit 0
fi

# If cargo available, install via cargo
if command -v cargo >/dev/null 2>&1; then
  echo "Found cargo. Installing mdBook via 'cargo install mdbook'..."
  cargo install mdbook --locked
  echo "mdBook installed: $(mdbook --version)"
  exit 0
fi

# CI environments (like Vercel) don't ship cargo. If running on Vercel or in CI,
# attempt to install rustup (non-interactive) then cargo, then mdbook.
if [ -n "${VERCEL:-}" ] || [ -n "${CI:-}" ]; then
  echo "CI detected and cargo/mdbook not found. Installing Rust toolchain (rustup) and mdBook..."
  # Install rustup non-interactively
  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
  # Load cargo environment for this shell
  export PATH="$HOME/.cargo/bin:$PATH"
  if command -v cargo >/dev/null 2>&1; then
    echo "Running 'cargo install mdbook --locked'..."
    cargo install mdbook --locked || {
      echo "cargo install failed. You may need to adjust the environment or install a prebuilt mdBook binary.";
      exit 1
    }
    echo "mdBook installed: $(mdbook --version)"
    exit 0
  else
    echo "cargo still missing after rustup install. Aborting.";
    exit 1
  fi
fi

echo "Neither 'mdbook' nor 'cargo' were found on your PATH and no CI installer was attempted."
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
