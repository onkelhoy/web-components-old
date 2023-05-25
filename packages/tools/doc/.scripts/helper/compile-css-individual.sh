#!/bin/bash

echo "running style on $1"

# Set the input and output file paths
input_file="src/components/$1/style.scss"
output_css="src/components/$1/style.css"
output_file="src/components/$1/style.ts"

# Compile the SCSS file to CSS
node-sass "$input_file" "$output_css"

# Wait for the CSS file to be created
while [ ! -f "$output_css" ]; do
  sleep 1
done

# Convert the CSS code to a JavaScript string
CSS=$(cat "$output_css") # | sed 's/"/\\"/g' | sed ':a;N;$!ba;s/\n/\\n/g')

# Write the JavaScript code to a file
echo "export const style = \`$CSS\`;" > "$output_file"

# Remove the intermediate CSS file
rm "$output_css"
