#!/bin/bash

SCRIPTDIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOTDIR="$(dirname "$(dirname "$SCRIPTDIR")")"
NAME="package-showcase"
RUN_COMBINE=true 
RUN_BUILD=true

# Define PROJECTSCOPE variable
PROJECTSCOPE=$(node -pe "require('$ROOTDIR/package.json').name")
PROJECTSCOPE=$(echo "$PROJECTSCOPE" | cut -d'/' -f1 | awk -F'@' '{print $2}')

# Check argument
for arg in "$@"; do
  if [ "$arg" == "--github" ]; then
    # a flag to make sure to build into 
    NAME="docs"
  fi
  if [ "$arg" == "--nocombine" ]; then
    # a flag to make sure to build into 
    RUN_COMBINE=false
  fi
  if [ "$arg" == "--nobuild" ]; then
    # a flag to make sure to build into 
    RUN_BUILD=false
    RUN_COMBINE=false
  fi
done

if [ -d "$ROOTDIR/$NAME" ]; then 
  echo ""
  echo "$NAME already exists, are you sure you want to continue?"
  read -p "OBS: this would remove it (y/n):" answer
  if [ $answer == "y" ]; then 
    rm -rf "$ROOTDIR/$NAME"
  else 
    exit 1
  fi
fi 

# we create the folder 
mkdir "$ROOTDIR/$NAME"

# for each package we need to create a importmap reference 
touch "$SCRIPTDIR/importmap.tmp"
for package in $(find "$ROOTDIR/packages" -mindepth 2 -maxdepth 2 -type d); do
  cd $package
  source ".env"
  echo "processing $CLASSNAME"

  if [ $RUN_COMBINE == false ]; then 
    npm run combine &>/dev/null
  elif [ $RUN_BUILD == false ]; then 
    npm run build 
  fi

  echo "\"@\"" >> "$SCRIPTDIR/importmap.tmp"

  # check if file could be generated
  if [ -d "views/combine" ]; then 
    echo "\tsuccess ✅"
  else 
    echo "\tskipped ⏩"
  fi 
done

# then again we need to generate each index for them so we can mimic refresh 
# but each page should be equipped to load other with the SPA 

# cleanup 
rm "$SCRIPTDIR/importmap.tmp"