#!/bin/bash

# init variables
PACKAGE=$1

# enter package + get environment variables
cd $PACKAGE 
source .env

if [ ! -f .scripts/combine.sh ]; then 
  exit 2
fi

# run combine script
# sh .scripts/combine.sh &> /dev/null 

# come back to root 
cd $ROOTDIR

mkdir -p web/packages/$ATOMICTYPE/$NAME &> /dev/null 

cp -r $PACKAGE/views/combined/* $ROOTDIR/web/packages/$ATOMICTYPE/$NAME &> /dev/null 

# add all folders inside subfolder to doc
for folder_path in $ROOTDIR/web/packages/$ATOMICTYPE/$NAME/*/ ; do
  folder_name=$(basename "$folder_path")

  if [[ $folder_name != "auto" && $folder_name != sources ]]; then 
    # copy contents into web 
    rsync -a "$folder_path" $ROOTDIR/web/public
    # remove the folders 
    rm -rf $folder_path
  fi
done

echo "$ATOMICTYPE#$PREFIXNAME#$CLASSNAME#$NAME"
