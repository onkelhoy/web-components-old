#!/bin/bash

PACKAGE_DIR=$1
PACKAGE_NAME=$2

cd $PACKAGE_DIR
source ".env"

# always run the build
npm run build

# init destination 
DESTNAME="$DESTINATION/$ATOMICTYPE/$NAME"
mkdir -p $DESTNAME
cp -R ./dist $DESTNAME

# check if package has combine script 
if [[ ! -f ".scripts/combine.sh" || "$(node -pe "require('./package.json').scripts.combine")" == "undefined" ]]; then 
  # it did not 
  exit 2
fi 

if [ $RUN_COMBINE = "true" ]; then 
  # we cannot call npm run combine as its a concatinated script with start
  sh .scripts/combine.sh 
fi

if [ -d ./views/combined ]; then 
  cp -R ./views/combined/* $DESTNAME 
  if [ -f "$DESTNAME/index.html" ]; then 
    mv "$DESTNAME/index.html" "$DESTNAME/source.html"
  fi
fi 

# echo out back to "main.js"
echo "DESTNAME::$DESTNAME"
echo "CLASSNAME::$CLASSNAME"
