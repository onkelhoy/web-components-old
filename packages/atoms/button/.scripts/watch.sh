#!/bin/bash

cleanup() {
  echo "[watch] clean-up"
  
  kill $watch_css_pid $watch_esm_pid $tsc_pid

  # we build everything one last time (with tsc - so devs can except what they developed it the final version)
  sh .scripts/build.sh

  exit 0
}

trap cleanup SIGINT
trap cleanup EXIT

# then we watch css
fswatch src/style.scss | while read; do sh ./.scripts/helper/compile-css.sh; done &
watch_css_pid=$!

tsc -w &
tsc_pid=$!

esbuild src/register.ts --bundle --outfile=dist/register.bundle.mjs --format=esm --platform=browser --watch=forever &
watch_esm_pid=$!

# wait for all background processes to complete
wait
