#!/bin/bash

# get variables
source .env 

if [ "$1" != "--child" ]; then
  # build everything
  npm run build

  # extract the types 
  sh $ROOTDIR/scripts/extract_types/run.sh $(pwd)
fi

# build interactive
sh $ROOTDIR/scripts/interactive/run.sh $(pwd)

if [ "$1" != "--child" ]; then
  sh .scripts/start.sh interactive
fi 