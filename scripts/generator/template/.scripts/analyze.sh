#!/bin/bash

# get variables
source .env 

# build everything
npm run build

# extract the types 
sh $ROOTDIR/scripts/analyse/run.sh $(pwd)