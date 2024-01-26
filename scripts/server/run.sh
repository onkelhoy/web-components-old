#!/bin/bash

function cleanup() {
    echo ""
    kill $server_pid

    if [[ ! -n $SUBFOLDER_ORG ]]; then 
      rm -rf $PACKAGE_DIR/.temp
    else 
      rm -rf $PACKAGE_DIR/views/$SUBFOLDER/.temp
    fi

    echo "devserver stopped"
    exit 0
}

# Trap to call cleanup function when the script receives a SIGINT (Ctrl+C)
trap cleanup SIGINT
trap cleanup EXIT

# variables
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SUBFOLDER_ORG=$1
SUBFOLDER=$1
ROOT_DIR=$(cd $SCRIPT_DIR/../../ && pwd)
PACKAGE_DIR=$(pwd)

LIVEMODE="static"
# Check for live argument
for arg in "$@"; do
  if [ "$arg" == "--live" ]; then
    LIVEMODE="live"
  fi
done

if [[ ! -n $SUBFOLDER ]]; then 
  rm -rf $PACKAGE_DIR/.temp
  mkdir $PACKAGE_DIR/.temp
  SUBFOLDER="no-view-folder"
  HTML_PATH="."
else 
  rm -rf $PACKAGE_DIR/views/$SUBFOLDER/.temp
  mkdir $PACKAGE_DIR/views/$SUBFOLDER/.temp
  HTML_PATH="views/$SUBFOLDER"
fi

# find the .html file 
HTML_FILE=""
html_files=$(find $HTML_PATH -maxdepth 1 -type f -name '*.html')
if [[ -n "$html_files" ]]; then
  HTML_FILE=$(echo "$html_files" | head -n 1)
else
  echo "could not find any html file"
  exit 1
fi

echo "starting server $LIVEMODE"

# run the nodejs server
node $SCRIPT_DIR/index.js $SCRIPT_DIR $PACKAGE_DIR $ROOT_DIR $SUBFOLDER $HTML_FILE $LIVEMODE & 
server_pid=$!

# wait for the exit
wait 