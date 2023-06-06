#!/bin/bash

PACKAGE_DIR=$1
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

source $PACKAGE_DIR/.env 

# clear the file first
if [[ -z $2 ]]: then 
  rm $PACKAGE_DIR/custom-elements.json
else 
  rm $PACKAGE_DIR/custom-elements.$2.json
fi 

# build a bundled script based on target 
esbuild $PACKAGE_DIR/src/register.ts --bundle --format=esm --outfile=dist/analyse.bundle.js --platform=browser

# run the extractor
node $SCRIPT_DIR/extractor.js $ROOTDIR $PACKAGE_DIR $SCRIPT_DIR $CLASSNAME $2

# cleanup
rm $SCRIPT_DIR/index.html

echo "analyse done"
