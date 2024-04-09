#!/bin/bash

# build everything
# npm run build

# get variables
source .env 

# create rootdir (now based on relative paths)
ROOTDIR=$(realpath $ROOTDIR_RELATIVE)

# extract the types 
sh $ROOTDIR/scripts/analyse/run.sh $(pwd)

# build variations
sh $ROOTDIR/scripts/variations/run.sh $(pwd)