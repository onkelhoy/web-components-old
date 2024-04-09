#!/bin/bash

# ask versioning
echo "Global semantic versioning?"
echo "answer:"
echo "[0] none"
echo "[1] patch"
echo "[2] minor"
echo "[3] major"

read -p "Enter the number corresponding to your choice: " choice

# Increase version 
if [[ $choice == 1 ]]; then 
  npm version patch
elif [[ $choice == 2 ]]; then 
  npm version minor
elif [[ $choice == 3 ]]; then 
  npm version major
fi

# Run build 
npm run build -- --prod

# NPM Publish 
npm publish
