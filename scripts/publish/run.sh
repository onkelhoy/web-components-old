#!/bin/bash

# start by exposing global flag 
export GLOBAL_PUBLISH=true
touch versioning.env
echo "GLOBAL_PUBLISH=\"true\"" >> versioning.env

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

export ROOTDIR=$(pwd)

# Check each argument
for arg in "$@"; do
  if [ "$arg" == "-ci" ]; then
    CI_FLAG=1
  elif [ "$arg" == "--force" ]; then
    export FORCE=true
    echo "FORCE=\"true\"" >> versioning.env
  elif [ "$arg" == "--verbose" ]; then
    export VERBOSE=true
    echo "VERBOSE=\"true\"" >> versioning.env
  elif [ "$arg" == "--prod" ]; then
    export PROD=true
  elif [ "$arg" == "--react" ]; then
    export REACT=true
    echo "REACT=\"true\"" >> versioning.env
  fi
done

# If the flag is set, run the command
if [ -z "$CI_FLAG" ]; then
  echo "Global semantic versioning?"
  echo "answer:"
  echo "[0] none"
  echo "[1] patch"
  echo "[2] minor"
  echo "[3] major"

  read -p "Enter the number corresponding to your choice: " choice
  export SEMANTIC_VERSION="$choice"

  npm search --searchlimit=100 @pap-it --json | node $SCRIPT_DIR/main.js
else
  # clean cache on pipeline
  npm cache clean --force 

  export SEMANTIC_VERSION=0
  export ROOTDIR=$(pwd)
  export CICD_NODE_TOKEN=$NODE_AUTH_TOKEN

  # echo "GLOBAL_PUBLISH=\"true\"" >> versioning.env

  npm search --searchlimit=100 @pap-it --json | node $SCRIPT_DIR/main.js
  
  # used for individual testing
  # bash $SCRIPT_DIR/individual.sh $SCRIPT_DIR/../../packages/atoms/button 1 -0.0.0 $NODE_AUTH_TOKEN
  # bash $SCRIPT_DIR/individual.sh $SCRIPT_DIR/../../packages/atoms/typography 1 -0.0.0 $NODE_AUTH_TOKEN
fi

# last we run the npm install (as we skipped in all postversion scripts)
npm install

unset NODE_AUTH_TOKEN

# cleanup
rm versioning.env
rm versioning.json

echo "packages built"
