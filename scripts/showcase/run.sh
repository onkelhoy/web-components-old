#!/bin/bash

export SCRIPTDIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
export ROOTDIR="$(dirname "$(dirname "$SCRIPTDIR")")"
export NAME="showcase"
export RUN_COMBINE=true 
export GLOBAL_PROD=true
export SKIP_BUILD=true

# Define PROJECTSCOPE variable
export PROJECTSCOPE=$(node -pe "require('$ROOTDIR/package.json').name" | cut -d'/' -f1 | awk -F'@' '{print $2}')

# lets trap the interrupt signal 
interruptcb () {
  cleanup
  exit                          #   then exit script.
}

cleanup() {
  # running cleanup
  echo "cleanup complete"
}

trap "interruptcb" INT        # Set SIGINT trap to call function.

# Check argument
for arg in "$@"; do
  if [ "$arg" == "--github" ]; then
    # a flag to make sure to build into 
    NAME="docs"
  fi
  if [ "$arg" == "--nocombine" ]; then
    # a flag to make sure to build into 
    export RUN_COMBINE=false
  fi
  if [ "$arg" == "--ci" ]; then
    # a flag to make sure to build into 
    export CI=true
  fi
done

# setting this after the name to "docs" in case of github
export DESTINATION="$ROOTDIR/$NAME"

if [[ -d "$DESTINATION" && -z "$CI" ]]; then 
  echo ""
  echo "$NAME already exists, are you sure you want to continue?"
  read -p "OBS: this would remove it (y/n): " answer
  if [ "$answer" == "n" ]; then 
    exit 1
  else 
    echo "removed"
    echo ""
    rm -rf "$DESTINATION"
  fi
elif [ -n "$CI" ]; then 
  rm -rf "$DESTINATION"
fi 

# we create the folder 
mkdir "$DESTINATION"

# create node_module folder 
mkdir "$DESTINATION/node_modules"

# copy over template files 
cp "$SCRIPTDIR/template/style.css" "$DESTINATION/style.css"
cp "$SCRIPTDIR/template/main.js" "$DESTINATION/main.js"
cp "$SCRIPTDIR/template/index.html" "$DESTINATION/index.html"

node "$SCRIPTDIR/main.js" 

# cleanup 
cleanup
