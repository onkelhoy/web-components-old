#!/bin/bash

# Get the directory of the current script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Specify the relative path of the views directory
dir_path="views"

# init combined folder
rm -rf views/combined
mkdir -p views/combined/sources
mkdir -p views/combined/public/icons

# read variables
source .env 

cp $SCRIPT_DIR/template/index.html views/combined/.
cp $SCRIPT_DIR/template/main.js views/combined/.
cp $SCRIPT_DIR/template/style.css views/combined/.
cp $SCRIPT_DIR/template/public/icons/$ATOMICTYPE.svg views/combined/public/icons/.

# Iterate over all subfolders of 'views', excluding 'combined'
for subdir in $(find "$dir_path" -mindepth 1 -maxdepth 1 -type d ! -name combined | grep -Ev "\-tmp[0-9]*$"); do
    # Check if there are any .html files in the directory
    html_files=$(find "$subdir" -maxdepth 1 -type f -name '*.html')

    if [[ -n "$html_files" ]]; then
        # If there are .html files, print the path of the first one
        html_file=$(echo "$html_files" | head -n 1)

        # Extract the subfolder name
        subfolder_name=$(basename "$subdir")

        # Extract the filename without the path (if needed ?)
        # filename=$(basename "$html_file")

        # create subfolder
        mkdir views/combined/sources/$subfolder_name

        # add all folders inside subfolder to doc
        for d in views/$subfolder_name/*/ ; do
            rsync -a "$d" "views/combined/$(basename $d)" &> /dev/null
        done
        
        # call the combinor
        node $SCRIPT_DIR/combine.js $subfolder_name $html_file $NAME $ATOMICTYPE $1
    fi
done

node $SCRIPT_DIR/cleanup.js $SCRIPT_DIR $CLASSNAME
