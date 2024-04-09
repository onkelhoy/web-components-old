#!/bin/bash

# read the variables
source .env 
  
# create rootdir (now based on relative paths)
ROOTDIR=$(realpath $ROOTDIR_RELATIVE)

sh $ROOTDIR/scripts/versioning/run.sh $(pwd)

exit 4