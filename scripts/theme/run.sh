#!/bin/bash

# theme name 
NAME=${1:-base}

LIGHTROOT=1
DARKROOT=1

# Specify the output file
outputFile="themes/$NAME/tokens.css"

# Clear or create the output file
> "$outputFile"

# loop through light and dark themes
for mode in "light" "dark"; do
  FILE_PATH="themes/$NAME/$mode.css"
  if [ -f $FILE_PATH ]; then 

    # get content inside :root block
    ROOT_CONTENT=$(sed -n '/:root {/,/}/p' $FILE_PATH | sed 's/:root {//g' | sed 's/}//g')

    # generate new content
    if [ $mode == "light" ]; then 
      CLASS_CONTENT=":root,\n.theme-$mode {\n$ROOT_CONTENT\n}"
    else 
      CLASS_CONTENT=".theme-$mode {\n$ROOT_CONTENT\n}"
    fi
      
    MEDIA_QUERY_CONTENT="@media (prefers-color-scheme: $mode) {\n  :root {\n$ROOT_CONTENT\n  }\n}"
    NEW_CONTENT="$MEDIA_QUERY_CONTENT"
    NEW_CONTENT=$(echo "$NEW_CONTENT" | sed 's/%/%%/g')

    if [ $mode == "light" ]; then 
      LIGHTROOT="$CLASS_CONTENT"
    else 
      DARKROOT="$CLASS_CONTENT"
    fi 

    # remove :root block from original file and append new content
    sed '/:root {/,/}/d' $FILE_PATH >> $outputFile
    printf "\n$NEW_CONTENT" >> $outputFile
  fi
done

# insert light and dark before (to keep order!)
echo "\n$LIGHTROOT" >> $outputFile
echo "\n$DARKROOT\n" >> $outputFile

# Loop through the CSS files in the directory
for file in "themes/$NAME"/*.css
do
  # Skip if current file is any of the files
  if [ "$file" = "$outputFile" ] || [ "$file" = "themes/$NAME/light.css" ] || [ "$file" = "themes/$NAME/dark.css" ]; then
    continue
  fi

  # Concatenate each file to the output file
  cat "$file" >> "$outputFile"
  echo "" >> "$outputFile"
done

echo "All CSS files have been combined into $outputFile"
