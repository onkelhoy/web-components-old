#!/bin/bash

# Check if --child flag is provided
for arg in "$@"
do
  if [[ $arg == "--child" ]]; then
    CHILD=true
    break
  fi
done

# get variables
source .env 

if [ ! $CHILD ]; then 
  # build everything
  npm run build
fi

# extract the types 
sh $ROOTDIR/scripts/analyse/run.sh $(pwd)