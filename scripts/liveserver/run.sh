#!/bin/bash

function cleanup() {
    echo ""
    kill $server_pid

    # cleanup
    rm -rf $PACKAGE_DIR/views/$SUBFOLDER/.devserver-temp

    echo "devserver Stopped"
    exit 0
}

# Trap to call cleanup function when the script receives a SIGINT (Ctrl+C)
trap cleanup SIGINT
trap cleanup EXIT

# variables
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SUBFOLDER=$1
ROOT_DIR=$(cd $SCRIPT_DIR/../../ && pwd)
PACKAGE_DIR=$(pwd)

mkdir $PACKAGE_DIR/views/$SUBFOLDER/.devserver-temp

# find the .html file 
HTML_FILE=""
html_files=$(find "views/$SUBFOLDER" -maxdepth 1 -type f -name '*.html')
if [[ -n "$html_files" ]]; then
    HTML_FILE=$(echo "$html_files" | head -n 1)
else
    echo "could not find any html file"
    exit 1
fi

# node $SCRIPT_DIR/server.js $SCRIPT_DIR $PACKAGE_DIR $ROOT_DIR $SUBFOLDER

# run the server
node $SCRIPT_DIR/server.js $SCRIPT_DIR $PACKAGE_DIR $ROOT_DIR $SUBFOLDER $HTML_FILE & 
server_pid=$!

# wait for the exit
wait 
