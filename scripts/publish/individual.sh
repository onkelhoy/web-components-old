#!/bin/bash

# init variables
PACKAGE=$1
REMOTE_VERSION=$2

# execute logic
cd $PACKAGE 

# Extract name and version from package.json
CURRENT_VERSION=$(node -p "require('./package.json').version")

if [[ -z "$CICD_NODE_TOKEN" ]] && [[ $SEMANTIC_VERSION != 0 ]] && ([[ "$CURRENT_VERSION" == "$REMOTE_VERSION" ]] || [[ $FORCE == true ]]); then 
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
  echo "[versioning]: ⚠️ skipped"
fi

echo "[version]: ⭐️ $CURRENT_VERSION"

# REMOVED: && [[ -n $CICD_NODE_TOKEN ]];
# as we want that pipeline can skip to run publish when version is same !! 
if [[ "$CURRENT_VERSION" == "$REMOTE_VERSION" ]] && [[ $FORCE != true ]]; then
  # need to make sure we always build atleast 
  if [[ -n "$CICD_NODE_TOKEN" ]]; then 
    # install 
    npm ci

    # run build 
    npm run build
  fi
  # skipped 
  echo "[individual]: skipped"
else 
  if [[ -n "$CICD_NODE_TOKEN" ]]; then 
    # install 
    npm ci

    # run build 
    npm run build -- --prod

    # publish 
    npm publish --access public --registry https://registry.npmjs.org/ --//registry.npmjs.org/:_authToken=${CICD_NODE_TOKEN}
    
    # TEST: npm publish --access public --registry https://registry.npmjs.org/ --//registry.npmjs.org/:_authToken=${CICD_NODE_TOKEN} --verbose --dry-run
  else 
    # run build 
    if [ -z "$VERBOSE" ]; then 

      if [ -z "$PROD" ]; then 
        npm run build &>/dev/null
      else 
        npm run build -- --prod &>/dev/null
      fi

      # npm run analyze --child &>/dev/null

      # npm run react --child &>/dev/null

      if [ -n "$REACT" ]; then
        npm run react &>/dev/null
      fi 
    else 
      if [ -z "$PROD" ]; then 
        npm run build
      else 
        npm run build -- --prod
      fi

      # npm run analyze --child

      if [ -n "$REACT" ]; then
        npm run react
      fi 
    fi 
  fi
fi


# we add this in to make sure to receive the npm version but for sake of build we still build it (but only when not pipeline)
if [[ "$CURRENT_VERSION" == "$REMOTE_VERSION" ]] && [[ -z $CICD_NODE_TOKEN ]] && [[ $SEMANTIC_VERSION != 0 ]]; then
  # skipped 
  echo "[individual]: skipped"
fi

echo "[individual]: complete"
