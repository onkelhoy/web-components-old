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

# create bundles 
esbuild src/register.ts --bundle --minify --outfile=dist/register.bundle.mjs --format=esm --platform=browser

# create esm 
esbuild src/register.ts --outfile=dist/register.mjs --format=esm --platform=browser
esbuild src/component.ts --outfile=dist/component.js --format=esm --platform=browser
esbuild src/index.ts --outfile=dist/index.js --format=esm --platform=browser
esbuild src/types.ts --outfile=dist/types.js --format=esm --platform=browser
esbuild src/style.ts --outfile=dist/style.js --format=esm --platform=browser

# finally we also use typescript to build the complete package
tsc

# clear the console
echo "files successfully built"