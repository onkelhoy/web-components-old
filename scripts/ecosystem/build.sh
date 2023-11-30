#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$(dirname "$SCRIPT_DIR")")"

# init folder
rm -rf "$ROOT_DIR/web" &> /dev/null 

# create web folder 
mkdir "$ROOT_DIR/web"

# copy template 
cp -r "$SCRIPT_DIR/template/"* "$ROOT_DIR/web"

# run npm install once to make sure lockfile is up to date 
# npm install

# run builder
node $SCRIPT_DIR/build.js $ROOT_DIR

echo "ecosystem built"