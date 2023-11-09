#!/bin/bash

# theme name 
NAME=${1:-base}

LIGHTROOT=1
DARKROOT=1

# Specify the output file
outputFile="themes/$NAME/tokens.css"

# Clear or create the output file
> "$outputFile"

# Inject the imports if exsits
if [ -f "themes/$NAME/imports.css" ]; then 
  cat "themes/$NAME/imports.css" >> "$outputFile"
  echo "" >> "$outputFile"
fi

# extract the 2 types 
LIGHT_THEME=$(sed -n '/:root {/,/}/p' "themes/$NAME/light.css" | sed 's/:root {//g' | sed 's/}//g')
DARK_THEME=$(sed -n '/:root {/,/}/p' "themes/$NAME/dark.css" | sed 's/:root {//g' | sed 's/}//g')

# loop through light and dark themes
for mode in "light" "dark"; do
  FILE_PATH="themes/$NAME/$mode.css"
  if [ -f $FILE_PATH ]; then 

    # Define opposite mode
    if [ "$mode" == "light" ]; then 
      TARGET=$LIGHT_THEME
      OPPOSITE=$DARK_THEME
    else
      TARGET=$DARK_THEME
      OPPOSITE=$LIGHT_THEME
    fi

    # generate new content
    CLASS_CONTENT="\n.theme-$mode {\n$TARGET\n}\n"
      
    MEDIA_QUERY_CONTENT="@media (prefers-color-scheme: $mode) {\n .theme-opposite {\n$OPPOSITE\n }\n \t:root {\n$TARGET\n  }\n}"
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
  if [ "$file" = "$outputFile" ] || [ "$file" = "themes/$NAME/light.css" ] || [ "$file" = "themes/$NAME/dark.css" ] || [ "$file" = "themes/$NAME/imports.css" ]; then
    continue
  fi

  # Concatenate each file to the output file
  cat "$file" >> "$outputFile"
  echo "" >> "$outputFile"
done

echo "All CSS files have been combined into $outputFile"
