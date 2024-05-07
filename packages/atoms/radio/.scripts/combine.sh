#!/bin/bash

# read the variables
source .env 

# run the analyzing
npm run analyse

# run the necessary scripts 
sh .scripts/helper/build-doc.sh
sh .scripts/helper/build-variations.sh --child
sh .scripts/helper/build-interactive.sh --child

# run the combine script
sh $ROOTDIR/scripts/combine/run.sh $1