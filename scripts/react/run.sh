#!/bin/bash

echo "Running React Builder 📦"
PACKAGE_PATH=$1
destination=$PACKAGE_PATH/react

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# get the package environment variables
source $PACKAGE_PATH/.env

# Read config.env file (in generator)
source $ROOTDIR/scripts/generator/config.env

# Define PROJECTSCOPE variable
PROJECTSCOPE=$(node -pe "require('$ROOTDIR/package.json').name")
PROJECTSCOPE=$(echo "$PROJECTSCOPE" | cut -d'/' -f1 | awk -F'@' '{print $2}')

# TODO we need to figure out which components exists in the react folder

# copy over basic files 
if [ ! -f $PACKAGE_PATH/react/index.ts ]; then 
  touch $PACKAGE_PATH/react/index.ts 
fi 

# running manually on our component file 
lowercase_classname=$(echo "$CLASSNAME" | tr '[:upper:]' '[:lower:]')
sh $SCRIPT_DIR/individual.sh $ROOTDIR $SCRIPT_DIR $PACKAGE_PATH $PROJECTSCOPE $prefix ./src $lowercase_classname

# executing automatically on each sub-component 
COMPONENTS_DIR="./src/components"
if [ -d "$COMPONENTS_DIR" ]; then
  # Use find to list all subdirectories directly under the components directory
  find "$COMPONENTS_DIR" -mindepth 1 -maxdepth 1 -type d -exec sh $SCRIPT_DIR/individual.sh $ROOTDIR $SCRIPT_DIR $PACKAGE_PATH $PROJECTSCOPE $prefix "{}" \;
fi