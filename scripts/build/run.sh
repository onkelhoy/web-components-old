#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "Global semantic versioning?"
echo "answer:"
echo "[1] none"
echo "[2] patch"
echo "[3] minor"
echo "[4] major"

read -p "Enter the number corresponding to your choice: " choice

node $SCRIPT_DIR/main.js $choice $1

echo "packages built"