#!/bin/bash

PACKAGE_DIR=$1
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

source $PACKAGE_DIR/.env 

# clear the file first
rm $PACKAGE_DIR/custom-elements*.json

# build a bundled script based on target 
esbuild $PACKAGE_DIR/src/register.ts --bundle --format=esm --outfile=dist/analyse.bundle.js --platform=browser

# run the extractor
node $SCRIPT_DIR/extractor.js $ROOTDIR $PACKAGE_DIR $SCRIPT_DIR $CLASSNAME

# cleanup
rm $SCRIPT_DIR/index.html

echo "analyse done"
