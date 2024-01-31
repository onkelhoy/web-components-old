#!/bin/bash

# variant (?)
VARIANT=${1:-basic} # default to "basic"

# Remove the dist directory
rm -rf dist

# then re-create it 
mkdir dist

# compile css
bash .scripts/helper/build-sass.sh

# create bundles 
# esbuild src/register.ts --bundle --minify --outfile=dist/register.bundle.mjs --format=esm --platform=browser &> /dev/null
esbuild src/register.ts --bundle --minify --outfile=dist/register.bundle.mjs --format=esm --platform=browser --external:"@pap-it/*" &> /dev/null

# build typescript if we on local
tsc

# clear the console
echo "files successfully built"