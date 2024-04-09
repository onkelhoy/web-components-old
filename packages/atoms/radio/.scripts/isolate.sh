#!/bin/bash

# Remove the dist directory
rm -rf isolated

# then re-create it 
mkdir isolated

# run build 
npm run build 

# create bundles 
esbuild src/register.ts --tsconfig=tsconfig.prod.json --bundle --minify --outfile=isolated/index.bundle.mjs --format=esm --platform=browser &> /dev/null

# clear the console
echo "isolated version successfully built"