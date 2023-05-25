#!/bin/bash


# Check if file dist/propinfo.json exists
if [ -f "dist/propinfo.json" ]; then
  mv dist/propinfo.json propinfo.json
fi

# Remove the dist directory
rm -rf dist

# then re-create it 
mkdir dist

# Check if file propinfo.json exists
if [ -f "propinfo.json" ]; then
  mv propinfo.json dist/propinfo.json
fi

# compile css
sh .scripts/helper/compile-css.sh

# output the typescript 
tsc

# clear the console
echo "files successfully built"