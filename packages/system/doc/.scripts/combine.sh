#!/bin/bash

# build first
npm run build

# read the variables
source .env 

# create rootdir (now based on relative paths)
ROOTDIR=$(realpath $ROOTDIR_RELATIVE)

# run the necessary scripts 
# sh .scripts/helper/build-variations.sh
# sh .scripts/helper/build-doc.sh
# .scripts/helper/build-interactive.sh
# .scripts/helper/build-test.sh 

# run the combine script
sh $ROOTDIR/scripts/combine/run.sh $1