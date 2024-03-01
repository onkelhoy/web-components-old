#!/bin/bash

# in a local mode we want to load the environment, (but in CI/CD pipeline we dont)
if [ -z "$ROOTDIR" ]; then 
  # get environment variables
  source .env
fi

# Define PROJECTSCOPE variable
PROJECTSCOPE=$(node -pe "require('$ROOTDIR/package.json').name")
PROJECTSCOPE=$(echo "$PROJECTSCOPE" | cut -d'/' -f1 | awk -F'@' '{print $2}')

# Conditionally set the external flag
if [ -n "$PROJECTSCOPE" ] && [ "$PROJECTSCOPE" != "@pap-it" ]; then
  conditional_flag="--external:\"$PROJECTSCOPE/*\""
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

if [ -f "src/register.ts" ]; then 
  # Create bundles with conditional source-maps
  if [ "$DEV" = true ]; then
    esbuild src/register.ts --bundle --minify --outfile=dist/register.bundle.mjs --format=esm --platform=browser --external:"@pap-it/*" $conditional_flag --sourcemap &> /dev/null
  else
    esbuild src/register.ts --tsconfig=tsconfig.prod.json --bundle --minify --outfile=dist/register.bundle.mjs --format=esm --platform=browser --external:"@pap-it/*" $conditional_flag &> /dev/null
  fi
fi

if [ "$DEV" = true ]; then
  tsc
else
  tsc -p tsconfig.prod.json
fi

# clear the console
echo "files successfully built"