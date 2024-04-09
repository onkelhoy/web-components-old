#!/bin/bash

# read the variables
source .env 
  
# create rootdir (now based on relative paths)
ROOTDIR=$(realpath $ROOTDIR_RELATIVE)

# run the analyzing
npm run analyze

# run the necessary scripts 
sh .scripts/helper/build-doc.sh
sh .scripts/helper/build-variations.sh --child
sh .scripts/helper/build-interactive.sh --child

# run the combine script
sh $ROOTDIR/scripts/combine/run.sh $1