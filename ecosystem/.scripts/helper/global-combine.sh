#!/bin/bash

# extract variables
source .env 

ECODIR=$ROOTDIR/ecosystem

# extract the subfolders containing "combine.sh"
subfolders=$(find $ROOTDIR/packages -path "$ROOTDIR/packages/*/.scripts/combine.sh" -exec dirname {} \;)

for subfolder in $subfolders; do
  package_folder=$(dirname "$subfolder")

  cd $package_folder
  sh .scripts/combine.sh
  cd $ECODIR
done

# wait

# now each combine has finished
for subfolder in $subfolders; do
  package_folder=$(dirname "$subfolder")
  package_name=$(basename "$package_folder")

  # get variables
  source $package_folder/.env

  mkdir -p views/combined/$ATOMICTYPE-$package_name

  # add all folders inside subfolder to doc
  for folder_path in $package_folder/views/combined/*/ ; do
    folder_name=$(basename "$folder_path")

    if [[ $folder_name != "auto" && $folder_name != sources ]]; then 
      rsync -a "$folder_path" "views/combined/$folder_name"
    fi
  done

  # copy all essential files
  cp -r $package_folder/views/combined/sources views/combined/$ATOMICTYPE-$package_name
  cp -r $package_folder/views/combined/index.html views/combined/$ATOMICTYPE-$package_name
  cp -r $package_folder/views/combined/style.css views/combined/$ATOMICTYPE-$package_name
  cp -r $package_folder/views/combined/main.js views/combined/$ATOMICTYPE-$package_name

  # run the extractor on them 
  node .scripts/helper/global-combine.js $package_name $ATOMICTYPE $CLASSNAME
done