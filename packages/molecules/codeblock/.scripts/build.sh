#!/bin/bash

# get environment variables
source .env

# Define PROJECTSCOPE variable
PROJECTSCOPE=$(node -pe "require('$ROOTDIR/package.json').name")
PROJECTSCOPE=$(echo "$PROJECTSCOPE" | cut -d'/' -f1 | awk -F'@' '{print $2}')

# Conditionally set the external flag
if [ "$PROJECTSCOPE" != "@pap-it" ]; then
  conditional_flag="--external:$PROJECTSCOPE/*"
else
  conditional_flag=""
fi

# Check if --dev flag is provided
for arg in "$@"
do
  if [[ $arg == "--dev" ]]; then
    DEV=true
    break
  fi
done

# Remove the dist directory
rm -rf dist

# then re-create it 
mkdir dist

# compile css
# TODO extend style build to allow --dev flag
# # Compile and minify css
# if [ "$DEV" = true ]; then
#   bash .scripts/helper/build-sass.sh --dev
# else
#   bash .scripts/helper/build-sass.sh
# fi

bash .scripts/helper/build-sass.sh

# Create bundles with conditional source-maps
if [ "$DEV" = true ]; then
  esbuild src/register.ts --bundle --minify --outfile=dist/register.bundle.mjs --format=esm --platform=browser --external:"@pap-it/*" $conditional_flag --sourcemap &> /dev/null
else
  esbuild src/register.ts --tsconfig=tsconfig.prod.json --bundle --minify --outfile=dist/register.bundle.mjs --format=esm --platform=browser --external:"@pap-it/*" $conditional_flag &> /dev/null
fi

if [ "$DEV" = true ]; then
  tsc
else
  tsc -p tsconfig.prod.json
fi

# clear the console
echo "files successfully built"