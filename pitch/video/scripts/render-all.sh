#!/usr/bin/env bash
# Renders every shot to out/clips/<id>.mp4 (1920×1080, 25 fps, H.264). Pass ids to render only some.
set -uo pipefail
rm -rf out/bundle && npx remotion bundle src/index.ts --out-dir out/bundle --log=error 2>&1 | grep -v -E "macOS|^$"
IDS=${@:-$(grep -oE "\['s[0-9a-z-]+'" src/Root.tsx | tr -d "['")}
mkdir -p out/clips
for id in $IDS; do
  start=$(date +%s)
  npx remotion render out/bundle "$id" "out/clips/$id.mp4" --codec=h264 --crf=18 --log=error 2>&1 | grep -v -E "macOS|^$" | tail -3
  echo "$id done in $(( $(date +%s) - start ))s"
done
