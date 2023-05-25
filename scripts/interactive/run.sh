#!/bin/bash

PACKAGE_DIR=$1
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# read variables
source $PACKAGE_DIR/.env

# copy over template files if none existing folder
if [ ! -f $PACKAGE_DIR/views/interactive/index.html ]; then 
  cp $SCRIPT_DIR/template/index.html $PACKAGE_DIR/views/interactive
fi
if [ ! -f $PACKAGE_DIR/views/interactive/style.css ]; then 
  cp $SCRIPT_DIR/template/style.css $PACKAGE_DIR/views/interactive
fi
if [ ! -f $PACKAGE_DIR/views/interactive/main.js ]; then 
  cp $SCRIPT_DIR/template/main.js $PACKAGE_DIR/views/interactive
  echo "\nimport \"@circular$PACKAGENAME/$NAME/wc\";" >> $PACKAGE_DIR/views/interactive/main.js
fi

# run the build
node $SCRIPT_DIR/build.js $PACKAGE_DIR $CLASSNAME $PREFIXNAME