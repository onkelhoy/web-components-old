#!/bin/bash

# Script to create a new project by copying an existing template

echo "Create new project!\n"

destination=${1:-$(pwd)/projects}
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(pwd)"

# Prompt for user input
read -p "Project name: " project_scope
read -p "Prefix: " prefix

# Validate input
if [ -z "$project_scope" ] || [ -z "$destination" ] || [ -z "$prefix" ]; then
  echo "Error: Missing input. Please provide all the required information."
  exit 1
fi

destination="$destination/$project_scope"

if [ -d "$destination" ]; then 
  echo "Error: Project destination already exists - $destination"
  exit 1
fi

# Create the destination directory if it doesn't exist
mkdir -p "$destination"

# Exclusions list
exclusions=(
    ".git"
    ".github"
    "node_modules"
    "web"
    "projects"
    "react"
    "packages"
    "$ROOT_DIR/package.json"
    "package-lock.json"
    "README.md"
    "LICENSE"
    "scripts/generator/template/package.json"
    "scripts/generator/config.env"
    "scripts/project" # Add more exclusions as needed
)

# Build rsync command with exclusions
rsync_cmd="rsync -av"
for exclusion in "${exclusions[@]}"; do
    rsync_cmd+=" --exclude='$exclusion'"
done
rsync_cmd+=" $ROOT_DIR/ $destination"

# Execute rsync command
eval "$rsync_cmd"

# now copy the template stuff as well 
rsync -av $SCRIPT_DIR/template/ $destination

# replace names 
sed -i '' "s/PROJECTSCOPE/${project_scope}/g" $destination/package.json
sed -i '' "s/PROJECTSCOPE/${project_scope}/g" $destination/README.md

# Apply adjustments/fixes

# scripts - generator
echo "prefix=$prefix" > $destination/scripts/generator/config.env

# Setup Git & Project install 
cd $destination
git init 
npm run init 
git add .
git commit -m "first-commit: $project_scope initialized"

# Completion message
echo "Project $project_scope created successfully at $destination"
