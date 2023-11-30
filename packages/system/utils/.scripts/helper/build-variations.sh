#!/bin/bash

# build everything
# npm run build

# get variables
source .env 

# extract the types 
sh $ROOTDIR/scripts/analyse/run.sh $(pwd)

# build variations
sh $ROOTDIR/scripts/variations/run.sh $(pwd)