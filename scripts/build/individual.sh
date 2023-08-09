#!/bin/bash

# init variables
PACKAGE=$1
VERSION=$2

# execute logic
cd $PACKAGE 

# install 
npm ci 

# run build 
npm run build 

# increase version 
if [[ $VERSION == 2 ]]; then 
  npm version patch
elif [[ $VERSION == 3 ]]; then 
  npm version minor
elif [[ $VERSION == 4 ]]; then 
  npm version major
fi

npm publish 