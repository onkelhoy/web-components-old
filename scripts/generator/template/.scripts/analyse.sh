#!/bin/bash

# Check if --child flag is provided
for arg in "$@"
do
  if [[ $arg == "--child" ]]; then
    CHILD=true
    break
  fi
  if [ "$arg" == "--force" ]; then
    FORCE="--force"
  fi
  if [ "$arg" == "--verbose" ]; then
    VERBOSE="--verbose"
  fi
done

# get variables
source .env 
  
# create rootdir (now based on relative paths)
ROOTDIR=$(realpath $ROOTDIR_RELATIVE)

if [ ! $CHILD ]; then 
  # build everything
  npm run build
fi

# extract the types 
sh $ROOTDIR/scripts/analyse/run.sh $(pwd) $VERBOSE $FORCE