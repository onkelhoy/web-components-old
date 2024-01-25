#!/bin/bash

# init variables
PACKAGE=$1
SEMANTIC_VERSION=$2
NPM_VERSION=$3
CICD_NODE_TOKEN=$4

# execute logic
cd $PACKAGE 

# Extract name and version from package.json
CURRENT_VERSION=$(node -p "require('./package.json').version")

if [[ $CURRENT_VERSION == $NPM_VERSION ]] || [[ "$FORCE" == true ]]; then 
  # increase version 
  if [[ $SEMANTIC_VERSION == 1 ]]; then 
    npm version patch
  elif [[ $SEMANTIC_VERSION == 2 ]]; then 
    npm version minor
  elif [[ $SEMANTIC_VERSION == 3 ]]; then 
    npm version major
  fi

  CURRENT_VERSION=$(node -p "require('./package.json').version")
else 
  # skipped 
  echo "[individual]: skipped"
  exit 1
fi


if [[ -n "$CICD_NODE_TOKEN" ]]; then 
  # install 
  npm ci &>/dev/null

  # run build 
  npm run build &>/dev/null

  # publish 
  npm publish --access public --registry https://registry.npmjs.org/ --//registry.npmjs.org/:_authToken=${CICD_NODE_TOKEN} --verbose --dry-run
else 
  # run build 
  npm run build &>/dev/null
fi

echo "version: $CURRENT_VERSION $NPM_VERSION"
echo "[individual]: complete"
