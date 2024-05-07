#!/bin/bash

# get variables
source .env 

if [ "$1" != "--child" ]; then
  read -p "Do you wish cleanup?: (y/n) " cleanup_ans
  cleanup_ans=$(echo "$cleanup_ans" | tr '[:upper:]' '[:lower:]')
  if [[ "$cleanup_ans" == "y" || "$cleanup_ans" == "yes" ]]; then
    rm views/interactive/index.html
    rm views/interactive/main.js
    rm views/interactive/style.css
  fi

  # run the analyzing
  npm run analyse
fi

# build interactive
sh $ROOTDIR/scripts/interactive/run.sh $(pwd)

if [ "$1" != "--child" ]; then
  sh .scripts/start.sh interactive
fi 