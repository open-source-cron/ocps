#!/usr/bin/env bash
# Generates the pages of the documentation site in docs/src from the repository's markdown, so the
# specifications have a single source. Run from anywhere: docs/prepare.sh && ombryt -C docs serve
set -euo pipefail

root=$(cd "$(dirname "$0")/.." && pwd)
src="$root/docs/src"

rm -rf "$src/specifications" "$src/drafts" "$src/data" "$src/index.md" "$src/conformance.md"
mkdir -p "$src/specifications" "$src/drafts" "$src/data"

# page <source.md> <target.md> <front matter lines...>
# Takes the first "# " heading as the title, drops it from the body and rewrites repository links to site URLs.
page() {
  local from=$1 to=$2
  shift 2
  local title
  title=$(grep -m1 '^# ' "$from" | sed 's/^# //')
  {
    echo "---"
    echo "title: \"${title//\"/\\\"}\""
    printf '%s\n' "$@"
    echo "---"
    sed '0,/^# /{/^# /d}' "$from" | sed -E \
      -e 's#\]\((\./|\.\./)*specifications/OCPS-([0-9.]+)\.md#](/specifications/ocps-\2/#g' \
      -e 's#\]\((\./|\.\./)*increments/OCPS-increment-([0-9.]+)\.md#](/drafts/ocps-\2/#g' \
      -e 's#\]\(\./CONFORMANCE\.md#](/conformance/#g' \
      -e 's#\]\(\./data/#](/data/#g'
  } > "$to"
}

# Links between files in the same directory: ./OCPS-1.0.md and ./OCPS-increment-1.2.md
local_links() {
  sed -E -i \
    -e "s#\]\(\./OCPS-increment-([0-9.]+)\.md#](/drafts/ocps-\1/#g" \
    -e "s#\]\(\./OCPS-([0-9.]+)\.md#](/specifications/ocps-\1/#g" "$1"
}

page "$root/README.md" "$src/index.md" 'nav_title: "Introduction"' "nav_order: 1"

cat > "$src/specifications/index.md" <<'MD'
---
title: Specifications
parent: ""
nav_order: 2
description: The finalized, full OCPS specifications. Each version is a strict superset of the previous one.
---

The finalized, full specifications. These are the canonical reference for implementers. Each version is a strict
superset of the previous one, and every pattern valid in a version behaves identically in all later versions.

MD
cat > "$src/drafts/index.md" <<'MD'
---
title: Drafts
parent: ""
nav_order: 3
description: Draft increments describing only the new features proposed for upcoming OCPS versions.
---

Draft increments describe only the *new features* proposed for each upcoming version. Once a version is
finalized, its increment is replaced by a full specification.

MD
echo "parent: Specifications" > "$src/specifications/_data.yaml"
echo "parent: Drafts" > "$src/drafts/_data.yaml"

for f in $(ls "$root"/specifications/OCPS-*.md | sort -rV); do
  v=$(basename "$f" .md | sed 's/^OCPS-//')
  order=$((1000 - $(echo "$v" | awk -F. '{print $1*100 + $2}')))
  page "$f" "$src/specifications/ocps-$v.md" "nav_title: \"OCPS $v\"" "nav_order: $order" "url: /specifications/ocps-$v/"
  local_links "$src/specifications/ocps-$v.md"
  echo "- [$(grep -m1 '^# ' "$f" | sed 's/^# //')](/specifications/ocps-$v/)" >> "$src/specifications/index.md"
done

for f in $(ls "$root"/increments/OCPS-increment-*.md | sort -V); do
  v=$(basename "$f" .md | sed 's/^OCPS-increment-//')
  order=$(echo "$v" | awk -F. '{print $1*100 + $2}')
  page "$f" "$src/drafts/ocps-$v.md" "nav_title: \"OCPS $v (draft)\"" "nav_order: $order" "url: /drafts/ocps-$v/"
  local_links "$src/drafts/ocps-$v.md"
  echo "- [$(grep -m1 '^# ' "$f" | sed 's/^# //')](/drafts/ocps-$v/)" >> "$src/drafts/index.md"
done

page "$root/CONFORMANCE.md" "$src/conformance.md" 'parent: ""' 'nav_title: "Conformance"' "nav_order: 4"

cp "$root"/data/*.json "$src/data/"
