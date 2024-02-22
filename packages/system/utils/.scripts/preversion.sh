#!/bin/bash

source .env 
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
fi 

function onnetworkfailure() {
  echo "[ERROR] network-failure"

  remoteversion=$REMOTEVERSION

  # we want to source once again to check if another process didnt append the network failure already 
  source "$ROOTDIR/versioning.env"

  if [ -z "$NETWORK_FAILURE" ]; then 
    echo "NETWORK_FAILURE=\"true\"" >> "$ROOTDIR/versioning.env"
  fi 
}

function onnetworksuccess() {
  echo "success $name $remoteversion"
  if [ -n $REMOTEVERSION ]; then
    # Variable exists, replace its value
    # Check for OS and apply appropriate sed command
    if [[ "$OSTYPE" == "darwin"* ]]; then
      # macOS requires an empty string argument after -i
      sed -i '' "s/^REMOTEVERSION=.*/REMOTEVERSION=${remoteversion}/" "./.env"
    else
      # Linux
      sed -i "s/^REMOTEVERSION=.*/REMOTEVERSION=${remoteversion}/" "./.env"
    fi
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
  tmpfile=$(mktemp) # Create a temporary file

  # Start npm view in the background and redirect output to the temp file
  npm view $name version > "$tmpfile" 2>&1 &
  pid=$!

  # Allow npm view to run for up to 3 seconds
  sleep 3

  # Check if the npm view process is still running
  if kill -0 $pid 2>/dev/null; then
    # Process is still running after 3 seconds, assume timeout and kill it
    kill $pid 2>/dev/null
    onnetworkfailure
  else
    # Process is not running, read the output from the temp file
    remoteversion=$(awk '/[0-9]+\.[0-9]+\.[0-9]+/{print $0; exit}' "$tmpfile")

    if [ -z "$remoteversion" ]; then
      onnetworkfailure
    else
      onnetworksuccess
    fi
  fi

  # Cleanup: Remove the temporary file
  rm "$tmpfile"
else 
  remoteversion=$REMOTEVERSION
fi

if [ "$localversion" == "$remoteversion" ]; then
  exit 0
fi

if [ "$INITIATOR" == "$name" ]; then
  rm "$ROOTDIR/versioning.env"
  echo "version bump - skipped"
fi

exit 1
