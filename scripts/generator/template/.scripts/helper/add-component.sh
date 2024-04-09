#!/bin/bash

# get variables
source .env 
  
# create rootdir (now based on relative paths)
ROOTDIR=$(realpath $ROOTDIR_RELATIVE)

sh $ROOTDIR/scripts/component/run.sh $(pwd)