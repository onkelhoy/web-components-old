#!/bin/bash

# Check if --force flag is provided
for arg in "$@"
do
  if [[ $arg == "--force" ]]; then
    export FORCE=true
  elif [[ $arg == "--child" ]]; then
    export CHILD=true
  elif [[ $arg == "--verbose" ]]; then 
    export VERBOSE=true
  fi
done

# get variables
source .env 
  
# create rootdir (now based on relative paths)
ROOTDIR=$(realpath $ROOTDIR_RELATIVE)

if [[ $FORCE ]] || [[ ! -d ./react ]]; then 
  # clean - (for force mode)
  rm -rf ./react

  # create folder 
  mkdir react  

  if [[ ! $CHILD ]]; then 
    # run the analysing
    npm run analyse
  fi 

  # running the global react script
  sh $ROOTDIR/scripts/react/run.sh $(pwd)

  npm run build

  echo "[REACT]: $NAME -- built ✅"
else
  echo "[REACT]: $NAME -- skipped ⏩"
fi
