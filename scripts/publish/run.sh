#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Initialize the flag as not set
CI_FLAG=0

# Check each argument
for arg in "$@"; do
  if [ "$arg" == "-ci" ]; then
    CI_FLAG=1
  fi
done

 If the flag is set, run the command
if [ $CI_FLAG -eq 0 ]; then
  echo "Global semantic versioning?"
  echo "answer:"
  echo "[1] none"
  echo "[2] patch"
  echo "[3] minor"
  echo "[4] major"

  read -p "Enter the number corresponding to your choice: " choice

  npm search --searchlimit=100 @papit --json | node $SCRIPT_DIR/main.js $choice
else
  npm search --searchlimit=100 @papit --json | node $SCRIPT_DIR/main.js 1 $NODE_AUTH_TOKEN
  # used for testing
  # bash $SCRIPT_DIR/individual.sh $SCRIPT_DIR/../../packages/atoms/button 1 -0.0.0 $NODE_AUTH_TOKEN
  # bash $SCRIPT_DIR/individual.sh $SCRIPT_DIR/../../packages/atoms/typography 1 -0.0.0 $NODE_AUTH_TOKEN
fi

echo "packages built"
