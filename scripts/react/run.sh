#!/bin/bash

PACKAGE_PATH=$1
destination=$PACKAGE_PATH/react

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# get the package environment variables
source $PACKAGE_PATH/.env

# build ROOTDIR
ROOTDIR=$(cd $SCRIPT_DIR/../../ && pwd)

export PACKAGE_PATH
export SCRIPT_DIR
export PREFIXNAME

# Read config.env file (in generator)
source $ROOTDIR/scripts/generator/config.env

node $SCRIPT_DIR/main.js 

