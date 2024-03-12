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

# Check if --prod flag is provided
for arg in "$@"
do
  if [[ $arg == "--prod" ]]; then
    PROD=true
    break
  fi
done

# Remove the dist directory
rm -rf dist

# then re-create it 
mkdir dist

if [ "$PROD" != true ]; then
  tsc
else
  tsc -p tsconfig.prod.json

  # Find all .js files in the dist directory and its subdirectories
  find ./dist -name '*.js' -type f | while read file; do
    # Use esbuild to minify each .js file and overwrite the original file
    esbuild "$file" --minify --allow-overwrite --outfile="$file"
  done
fi

if [ -f "./react/declerations.d.ts" ] && [ -d "./dist/react/" ]; then 
  cp "./react/declerations.d.ts" "./dist/react/"
fi 

# clear the console
echo "files successfully built"