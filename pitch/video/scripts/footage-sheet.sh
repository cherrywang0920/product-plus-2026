#!/usr/bin/env bash
# Contact sheet of a footage file: scripts/footage-sheet.sh <name-without-.mp4> <every-seconds> [cols=6]
set -euo pipefail
N=$1; EVERY=$2; COLS=${3:-6}; FPS=${FPS:-25}
DUR=$(npx remotion ffprobe -v error -show_entries format=duration -of csv=p=0 public/footage/$N.mp4 2>/dev/null | grep -E '^[0-9.]+$')
rm -rf public/_sheet && mkdir -p public/_sheet out/sheets
FR=()
for t in $(awk -v d="$DUR" -v e="$EVERY" 'BEGIN{for(t=0;t<d-0.05;t+=e) printf "%.2f\n", t}'); do
  fr=$(awk -v t="$t" -v f=$FPS 'BEGIN{printf "%d", t*f}')
  npx remotion ffmpeg -v error -y -ss "$t" -i public/footage/$N.mp4 -frames:v 1 -vf scale=480:-1 public/_sheet/$(printf 'f%05d.jpg' $fr) 2>/dev/null || true
  FR+=($fr)
done
LIST=$(IFS=,; echo "${FR[*]}")
npx remotion still src/index.ts Sheet out/sheets/$N.jpg --props="{\"frames\":[$LIST],\"cols\":$COLS,\"fps\":$FPS}" --log=error 2>&1 | grep -v macOS || true
echo "out/sheets/$N.jpg (${#FR[@]} frames, ${DUR}s)"
