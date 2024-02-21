#!/bin/bash

# todo use later
exit 0

# Check if --force flag is provided
for arg in "$@"
do
  if [[ $arg == "--force" ]]; then
    FORCE=true
  elif [[ $arg == "--child" ]]; then
    CHILD=true
  fi
done

# get variables
source .env 

if [[ $FORCE ]] || [[ ! -d ./react ]]; then 
  # clean - (for force mode)
  rm -rf ./react

  # create folder 
  mkdir react  
fi

if [[ ! $CHILD ]]; then 
  # run the analyzing
  npm run analyze
fi 

# running the global react script
# this script will look into our react folder and figure out if it should add new components or not 
sh $ROOTDIR/scripts/react/run.sh $(pwd)