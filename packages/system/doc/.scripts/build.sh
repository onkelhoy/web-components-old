#!/bin/bash

# Remove the dist directory
rm -rf dist

# then re-create it 
mkdir dist

# compile css
bash .scripts/helper/build-sass.sh

# output the typescript 
tsc

# clear the console
echo "files successfully built"