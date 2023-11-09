#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# init folder
rm -rf "$SCRIPT_DIR/../../web" &> /dev/null 

# copy template 
cp -r "$SCRIPT_DIR/template/*" "$SCRIPT_DIR/../../web"

# run builder
node $SCRIPT_DIR/build.js

# run combine
node $SCRIPT_DIR/combine.js

echo "ecosystem built"