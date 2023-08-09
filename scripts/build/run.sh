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

# If the flag is set, run the command
if [ $CI_FLAG -eq 0 ]; then
  echo "Global semantic versioning?"
  echo "answer:"
  echo "[1] none"
  echo "[2] patch"
  echo "[3] minor"
  echo "[4] major"

  read -p "Enter the number corresponding to your choice: " choice

  node $SCRIPT_DIR/main.js $choice
else
  node $SCRIPT_DIR/main.js 1 $NODE_TOKEN
fi

echo "packages built"