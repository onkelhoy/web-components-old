#!/bin/bash

PACKAGE_PATH=$1

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# get the package environment variables
source $PACKAGE_PATH/.env

ROOTDIR=$(cd $SCRIPT_DIR/../../ && pwd)

source $ROOTDIR/versioning.env

TARGET_PACKAGE=@pap-it/$PACKAGENAME$NAME

if [ "$TARGET_PACKAGE" == "$INITIATOR" ]; then 
  echo "{\"initiator\": \"$INITIATOR\"}" > $ROOTDIR/versioning.json
fi 

# execute the runner that will extract dependencies and update their package.json
node $SCRIPT_DIR/main.js $ROOTDIR $TARGET_PACKAGE

if [ "$GLOBAL_PUBLISH" != "true" ] && [ "$TARGET_PACKAGE" == "$INITIATOR" ]; then 
  # let it cool down
  sleep 1

  # cleanup 
  rm $ROOTDIR/versioning.env
  rm $ROOTDIR/versioning.json
  
  # finally install it to affect lock file 
  npm install
  
  # rm -rf packages/*/*/node_modules

  echo "version-flud complete, initator: $INITIATOR"
fi