#!/bin/bash

# Specify the directory containing the CSS files
directory="./design-tokens"

# Specify the output file
outputFile="./design-tokens/tokens.css"

# Clear or create the output file
> "$outputFile"

# Loop through the CSS files in the directory
for file in "$directory"/*.css
do
  # Skip if current file is the output file
  if [ "$file" = "$outputFile" ]; then
    continue
  fi

  # Concatenate each file to the output file
  cat "$file" >> "$outputFile"
  echo "" >> "$outputFile"
done

echo "All CSS files have been combined into $outputFile"
