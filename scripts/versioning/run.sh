#!/bin/bash

PACKAGE_PATH=$1

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# get the package environment variables
source $PACKAGE_PATH/.env

TARGET_PACKAGE=@pap-it/$PACKAGENAME$NAME

# execute the runner that will extract dependencies and update their package.json
node $SCRIPT_DIR/main.js $ROOTDIR $TARGET_PACKAGE

if [ -z $GLOBAL_PUBLISH ]; then 
  # finally install it to affect lock file 
  npm install
fi