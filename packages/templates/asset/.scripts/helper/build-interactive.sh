#!/bin/bash

# get variables
source .env 

if [ "$1" != "--child" ]; then
  # run the analyzing
  npm run analyze
fi

# build interactive
sh $ROOTDIR/scripts/interactive/run.sh $(pwd)

if [ "$1" != "--child" ]; then
  sh .scripts/start.sh interactive
fi 