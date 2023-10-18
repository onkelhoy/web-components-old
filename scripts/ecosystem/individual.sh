#!/bin/bash

# init variables
PACKAGE=$1

# execute logic
cd $PACKAGE 

npm run combine

# cp views/combined
echo "ok"
