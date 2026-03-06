#!/usr/bin/env bash
# ^ Shebang: tells your OS to run this script with bash.
#   Using /usr/bin/env makes it portable across systems where bash may live in different places.

set -euo pipefail
# ^ Safety flags (highly recommended for deploy scripts):
#   -e  : exit immediately if any command fails (prevents "half-deploys")
#   -u  : treat unset variables as an error (prevents empty bucket/distribution mistakes)
#   -o pipefail : if any command in a pipeline fails, the whole pipeline fails
#               (helps catch hidden failures)

: "${AWS_PROFILE:?AWS_PROFILE required}"
: "${AWS_REGION:?AWS_REGION required}"
: "${SITE_BUCKET:?SITE_BUCKET required}"
: "${CF_DIST_ID:?CF_DIST_ID required}"
# ^ "Required env var" checks:
#   ":" is a no-op command. The parameter expansion syntax:
#     ${VAR:?message}
#   means: if VAR is unset or empty, print message and exit non-zero.
#
#   Why this matters:
#   - Deploy scripts are dangerous when variables are blank.
#   - This prevents accidentally syncing to "s3://" (or invalidating the wrong distribution).
#
#   Note: AWS_REGION isn't used in the commands below directly.
#   It's still useful to require it so your environment stays consistent,
#   and because other commands (or future script extensions) may rely on it.

echo "==> Building..."
npm run build
# ^ Build step:
#   - Vite/React compiles your app into static assets in ./dist
#   - dist/ is your deploy artifact (similar concept to a Lambda zip or Docker image)
#
#   If this fails, the script exits immediately (thanks to -e).

echo "==> Sync non-HTML assets (long cache)..."
aws s3 sync dist/ "s3://${SITE_BUCKET}" --delete \
  --exclude "*.html" \
  --cache-control "public, max-age=31536000, immutable" \
  --profile "${AWS_PROFILE}"
# ^ Upload step #1 (non-HTML assets):
#   aws s3 sync:
#   - compares local dist/ to s3://bucket and uploads only differences
#   - --delete removes files from S3 that no longer exist in dist/
#     (prevents old hashed JS/CSS from accumulating forever)
#
#   Why exclude *.html here?
#   - Because we want different caching behavior for HTML vs assets.
#
#   Cache-Control for assets:
#   - public: cacheable by browsers and CDNs
#   - max-age=31536000: 1 year (in seconds)
#   - immutable: tells browsers "if you have it cached, it's safe to keep using it"
#
#   Why is long caching safe here?
#   - Vite outputs hashed filenames for JS/CSS (e.g., app.8f3a1c.js).
#   - When content changes, the filename changes → caches won't serve stale assets.

echo "==> Sync HTML (no-cache)..."
aws s3 sync dist/ "s3://${SITE_BUCKET}" --delete \
  --exclude "*" --include "*.html" \
  --cache-control "no-cache, no-store, must-revalidate" \
  --profile "${AWS_PROFILE}"
# ^ Upload step #2 (HTML files only):
#   This second pass uploads ONLY *.html files with different caching headers.
#
#   The include/exclude trick:
#   - --exclude "*" excludes everything by default
#   - --include "*.html" re-includes HTML files
#
#   Cache-Control for HTML:
#   - no-cache: can be stored, but must revalidate before using
#   - no-store: don't store it (strongest "don't keep old copies" signal)
#   - must-revalidate: caches must obey freshness rules
#
#   Why treat HTML differently?
#   - index.html is the "entry point" that references hashed JS/CSS filenames.
#   - If index.html is cached too long, users may load old HTML that points to
#     new assets (or vice versa), causing weird broken deploy symptoms.

echo "==> CloudFront invalidation..."
aws cloudfront create-invalidation \
  --distribution-id "${CF_DIST_ID}" \
  --paths "/*" \
  --profile "${AWS_PROFILE}" > /dev/null
# ^ Invalidation step:
#   CloudFront caches content at edge locations.
#   Invalidation tells CloudFront: "purge cached objects for these paths."
#
#   Why invalidate "/*"?
#   - Simple and reliable for small sites.
#   - Guarantees index.html and anything else updates immediately.
#
#   Optimization note (optional later):
#   - You could invalidate only "/index.html" to reduce invalidation scope/cost.
#   - Because assets are hashed+immutable, the main thing that ever needs purging is HTML.
#
#   > /dev/null:
#   - silences the JSON output so your deploy logs are cleaner.

echo "✅ Deploy complete"
# ^ Final success message.
#   If you see this, all prior steps succeeded (due to set -e).