#!/bin/bash

# Remove the dist directory
rm -rf dist

# then re-create it 
mkdir dist

# compile css
sh .scripts/helper/compile-css.sh

# output the typescript 
tsc

# clear the console
echo "files successfully built"