#!/bin/bash

# Remove the dist directory
rm -rf dist

# then re-create it 
mkdir dist

# build typescript if we on local
tsc

# clear the console
echo "files successfully built"