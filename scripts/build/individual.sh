#!/bin/bash

# init variables
PACKAGE=$1
VERSION=$2
CICD_NODE_TOKEN=$3

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

npm publish --access public --registry https://registry.npmjs.org/ --//registry.npmjs.org/:_authToken=${CICD_NODE_TOKEN}
