#!/bin/bash

source .env
SUBFOLDER=${1:-demo} # default to "demo"
  
# create rootdir (now based on relative paths)
ROOTDIR=$(realpath $ROOTDIR_RELATIVE)

# build file once
npm run build

# Function to clean up background processes when the script is terminated
function cleanup() {
  clear
  echo "[start] clean-up"
  kill $watcher_pid 
  kill $watch_server_pid 

  echo "$SUBFOLDER terminated" 
  exit 0
}

# Trap to call cleanup function when the script receives a SIGINT (Ctrl+C)
trap cleanup SIGINT
trap cleanup EXIT

# build once
sh .scripts/build.sh

# Run the watch.sh script in the same shell
sh .scripts/watch.sh $SUBFOLDER &
watcher_pid=$!

# watch demo project
sh $ROOTDIR/scripts/server/run.sh $SUBFOLDER --live &
watch_server_pid=$!

# Wait for the script to receive a SIGINT, or EXIT (from parent process) (Ctrl+C)
wait
