#!/bin/bash

PACKAGE_DIR=$1
SCRIPTDIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# read variables
source $PACKAGE_DIR/.env

# build ROOTDIR
ROOTDIR=$(cd $SCRIPTDIR/../../ && pwd)

# get project scope
PROJECTSCOPE=$(node -pe "require('$ROOTDIR/package.json').name")
PROJECTSCOPE=$(echo "$PROJECTSCOPE" | cut -d'/' -f1 | awk -F'@' '{print $2}')

# copy over template files if none existing folder
if [ ! -f $PACKAGE_DIR/views/interactive/index.html ]; then 
  cp $SCRIPTDIR/template/index.html $PACKAGE_DIR/views/interactive
fi
if [ ! -f $PACKAGE_DIR/views/interactive/style.css ]; then 
  cp $SCRIPTDIR/template/style.css $PACKAGE_DIR/views/interactive
fi
if [ ! -f $PACKAGE_DIR/views/interactive/main.js ]; then 
  cp $SCRIPTDIR/template/main.js $PACKAGE_DIR/views/interactive
  echo "\nimport \"@$PROJECTSCOPE/$PACKAGENAME$NAME/wc\";" >> $PACKAGE_DIR/views/interactive/main.js
fi

# run the build
node $SCRIPTDIR/build.js $PACKAGE_DIR $CLASSNAME $PREFIXNAME