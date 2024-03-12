#!/bin/bash

cleanup() {
  echo "[watch] clean-up"
  
  kill $tsc_pid

  # we build everything one last time (with tsc - so devs can except what they developed it the final version)
  sh .scripts/build.sh

  exit 0
}

trap cleanup SIGINT
trap cleanup EXIT

tsc -w --preserveWatchOutput &
tsc_pid=$!
