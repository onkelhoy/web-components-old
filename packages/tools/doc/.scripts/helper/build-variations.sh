#!/bin/bash

# get variables
source .env 

if [ "$1" != "--child" ]; then
  # build everything
  npm run build

  # extract the types 
  sh $ROOTDIR/scripts/extract_types/run.sh $(pwd)
fi

# build variations
sh $ROOTDIR/scripts/variations/run.sh $(pwd)

if [ "$1" != "--child" ]; then
  sh .scripts/start.sh variations
fi 