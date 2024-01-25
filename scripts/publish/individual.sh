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

if [[ -z "$CICD_NODE_TOKEN" ]] && ([[ "$CURRENT_VERSION" == "$NPM_VERSION" ]] || [[ $FORCE == true ]]); then 
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
else 
  # this is for optimizing, why update version when the remote is not synched with local ?
  echo "[versioning]: skipped"
fi

# REMOVED: && [[ -n $CICD_NODE_TOKEN ]];
# as we want that pipeline can skip to run publish when version is same !! 
if [[ "$CURRENT_VERSION" == "$NPM_VERSION" ]]; then
  # skipped 
  echo "[individual]: skipped"
else 
  if [[ -n "$CICD_NODE_TOKEN" ]]; then 
    # install 
    npm ci &>/dev/null

    # run build 
    npm run build &>/dev/null

    # publish 
    # npm publish --access public --registry https://registry.npmjs.org/ --//registry.npmjs.org/:_authToken=${CICD_NODE_TOKEN} --verbose --dry-run
    npm publish --access public --registry https://registry.npmjs.org/ --//registry.npmjs.org/:_authToken=${CICD_NODE_TOKEN}
  else 
    # run build 
    npm run build &>/dev/null
  fi
fi

# we add this in to make sure to receive the npm version but for sake of build we still build it (but only when not pipeline)
if [[ "$CURRENT_VERSION" == "$NPM_VERSION" ]] && [[ -z $CICD_NODE_TOKEN ]] && [[ $SEMANTIC_VERSION != 0 ]]; then
  # skipped 
  echo "[individual]: skipped"
fi

echo "[individual]: complete"
