#!/bin/bash

source .env
SUBFOLDER=${1:-global} # default to "global"

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

# Run the watch.sh script in the same shell
sh .scripts/watch.sh $SUBFOLDER &
watcher_pid=$!

# sh .scripts/build.sh

# watch demo project
sh $ROOTDIR/scripts/server/run.sh $SUBFOLDER --live &
watch_server_pid=$!

# Wait for the script to receive a SIGINT, or EXIT (from parent process) (Ctrl+C)
wait
