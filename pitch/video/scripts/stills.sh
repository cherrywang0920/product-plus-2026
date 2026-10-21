#!/usr/bin/env bash
# Key-moment stills of shots, tiled: scripts/stills.sh out.jpg id@frame id@frame …
set -uo pipefail
OUT=$1; shift
rm -rf public/_sheet out/bundle && mkdir -p public/_sheet out/stills && npx remotion bundle src/index.ts --out-dir out/bundle --log=error 2>&1 | grep -v -E "macOS|^$"
i=0; FR=()
for spec in "$@"; do
  id=${spec%@*}; fr=${spec#*@}
  npx remotion still out/bundle "$id" "out/stills/$id@$fr.jpg" --frame=$fr --scale=0.5 --log=error 2>&1 | grep -v -E "macOS|^$" | head -5
  cp "out/stills/$id@$fr.jpg" "public/_sheet/$(printf 'f%05d.jpg' $i)"; FR+=($i); i=$((i+1))
done
LIST=$(IFS=,; echo "${FR[*]}")
npx remotion still src/index.ts Sheet "$OUT" --props="{\"frames\":[$LIST],\"cols\":3,\"fps\":1}" --log=error 2>&1 | grep -v macOS || true
echo "$OUT: $*"
