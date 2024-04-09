#!/bin/bash

source .env 
  
# create rootdir (now based on relative paths)
ROOTDIR=$(realpath $ROOTDIR_RELATIVE)

source $ROOTDIR/scripts/utils/bash.sh
if [ -f "$ROOTDIR/versioning.env" ]; then 
  source "$ROOTDIR/versioning.env"
fi 

# we check if FORCE flag is set then we want to continue everything
if [ -n "$FORCE" ]; then 
  exit 0
fi

# Using node to execute a one-liner that prints both name and version, separated by a space
read -r name localversion <<< $(node -pe "let pkg=require('./package.json'); pkg.name + ' ' + pkg.version")

if [ -z "$INITIATOR" ]; then
  echo "INITIATOR=\"$name\"" >> "$ROOTDIR/versioning.env"
  INITIATOR="$name"

  npminfo=$(get_npm_version_data) 
  if [ "$npminfo" != "__timeout__" ]; then 
    echo "[NET] npm search success"
    echo "$npminfo" >> "$ROOTDIR/versioning.env"
    echo "NPMSEARCH=true" >> "$ROOTDIR/versioning.env"
    source "$ROOTDIR/versioning.env"
  fi 

  # else network failure? - we can try let npm view try anyway and detct network failure
fi 

function append_remote_version () {
  local remoteversion=$1

  if [ -n $REMOTEVERSION ]; then
    # Variable exists, replace its value
    safe_sed "s/^REMOTEVERSION=.*/REMOTEVERSION=${remoteversion}/" "./.env"
  else
    # Variable doesn't exist, append it to the file
    echo "REMOTEVERSION=${remoteversion}" >> "./.env"
  fi
}

# always set remote version if not exisiting 
if [ -z "$REMOTEVERSION" ]; then 
  echo "REMOTEVERSION=\"$localversion\"" >> .env
  REMOTEVERSION=$localversion
fi

if [ -z "$NETWORK_FAILURE" ]; then 
  env_var_name=$(echo "$name" | tr '@-/' '_')
  # Check if the variable is set and not empty
  if [ ! -z "${!env_var_name+x}" ]; then
    # Variable is set, access its value
    remoteversion="${!env_var_name}"
    append_remote_version $remoteversion
  else
    # could not find the package name in the search (could also be a new package..)
    remoteversion=$(get_network_data 10 "npm view $name version")
    if [ "$remoteversion" == "__timeout__" ]; then 
      if [ -n "$NPMSEARCH" ]; then 
        # we have been able to do the global search 
        # the likelyhood that this is just a new package is very high
        remoteversion=$localversion
      else 
        # we have not been able to do a npm search, we can conclude a network failure 
        remoteversion=$REMOTEVERSION

        # we want to source once again to check if another process didnt append the network failure already 
        source "$ROOTDIR/versioning.env"

        if [ -z "$NETWORK_FAILURE" ]; then 
          echo "NETWORK_FAILURE=\"true\"" >> "$ROOTDIR/versioning.env"
        fi 
      fi
    else 
      # we could fetch the view info 
      append_remote_version $remoteversion
    fi
  fi
else 
  remoteversion=$REMOTEVERSION
fi

if [ "$localversion" == "$remoteversion" ]; then
  exit 0
fi

exit 3
