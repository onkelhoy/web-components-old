#!/bin/bash

PACKAGE_DIR=$1
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

source $PACKAGE_DIR/.env 

node $SCRIPT_DIR/extract.js $ROOTDIR $CLASSNAME $PACKAGE_DIR