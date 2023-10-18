#!/bin/bash

# init variables
PACKAGE=$1
SEMANTIC_VERSION=$2
NPM_VERSION=$3
CICD_NODE_TOKEN=$4

# execute logic
cd $PACKAGE 

# increase version 
if [[ $SEMANTIC_VERSION == 1 ]]; then 
  npm version patch
elif [[ $SEMANTIC_VERSION == 2 ]]; then 
  npm version minor
elif [[ $SEMANTIC_VERSION == 3 ]]; then 
  npm version major
fi

# Extract name and version from package.json
CURRENT_VERSION=$(node -p "require('./package.json').version")

if [[ $CURRENT_VERSION == $NPM_VERSION ]] && [[ -n "$CICD_NODE_TOKEN" ]]; then
  # skipped 
  exit 2
else 
  if [[ -n "$CICD_NODE_TOKEN" ]]; then 
    # install 
    npm ci 

    # run build 
    npm run build

    # publish 
    npm publish --access public --registry https://registry.npmjs.org/ --//registry.npmjs.org/:_authToken=${CICD_NODE_TOKEN}
  else 
    # run build 
    npm run build
  fi
fi

exit 0