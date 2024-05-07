#!/bin/bash

PACKAGE_DIR=$1
PACKAGE_NAME=$2

cd $PACKAGE_DIR
source ".env"

if [ $RUN_COMBINE == false ]; then 
  npm run combine &>/dev/null
elif [ $RUN_BUILD == false ]; then 
  npm run build 
fi

# if [[ package_set[packagename] != 1 ]]; then 
#   echo "\"$packagename/wc\": \”$package/dist/src/register.js\"" >> "$SCRIPTDIR/importmap.tmp"
#   echo "\"$packagename\": \”$package/dist/src/index.js\"" >> "$SCRIPTDIR/importmap.tmp"
# fi 

# package_set[packagename] = 1

# check if file could be generated
if [ ! -d "views/combine" ]; then 
  exit 2
fi 