#!/bin/bash

# get variables
source .env 

# create rootdir (now based on relative paths)
ROOTDIR=$(realpath $ROOTDIR_RELATIVE)

if [ "$1" != "--child" ]; then
  # run the analyzing
  npm run analyse
fi

# build interactive
sh $ROOTDIR/scripts/interactive/run.sh $(pwd)

if [ "$1" != "--child" ]; then
  sh .scripts/start.sh interactive
fi 