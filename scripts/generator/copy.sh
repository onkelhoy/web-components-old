#!/bin/bash

# Read config.env file
source ./scripts/generator/config.env

ROOTDIR=$(pwd)

# source utils 
source $ROOTDIR/scripts/utils/bash.sh

GITNAME=$(git config --global user.name)
PROJECTLICENSE=$(node -pe "require('$ROOTDIR/package.json').license")
PROJECTSCOPE=$(node -pe "require('$ROOTDIR/package.json').name")
PROJECTSCOPE=$(echo "$PROJECTSCOPE" | cut -d'/' -f1 | awk -F'@' '{print $2}')

echo "Choose an atomic type:"
echo "1) atoms"
echo "2) molecules"
echo "3) organisms"
echo "4) pages"
echo "5) templates"

if [ "$PROJECTSCOPE" == "pap-it" ]; then 
  echo "6) tools"
  echo "7) system"
else 
  echo "6) global"
fi 

read -p "Enter the number corresponding to your choice: " choice
read -p "Enter the name: " name

# Set default value if GITNAME is empty
GITNAME=${GITNAME:-anonymous}

if [ "$PROJECTSCOPE" == "pap-it" ]; then 
  case $choice in
    1) atomic_type="atoms" ;;
    2) atomic_type="molecules" ;;
    3) atomic_type="organisms" ;;
    4) atomic_type="pages" ;;
    5) atomic_type="templates" ;;
    6) atomic_type="tools" ;;
    7) atomic_type="system" ;;
    *) echo "Invalid choice! Exiting..."; exit 1 ;;
  esac
else 
  case $choice in
    1) atomic_type="atoms" ;;
    2) atomic_type="molecules" ;;
    3) atomic_type="organisms" ;;
    4) atomic_type="pages" ;;
    5) atomic_type="templates" ;;
    6) atomic_type="global" ;;
    *) echo "Invalid choice! Exiting..."; exit 1 ;;
  esac
fi

# Create ClassName and prefix-name
classname=$(echo $name | awk -F"[_-]" '{$1=toupper(substr($1,1,1))substr($1,2); for (i=2;i<=NF;i++){$i=toupper(substr($i,1,1))substr($i,2)}; print}' OFS="")
prefixname="${prefix}-${name}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Copy template to destination and replace occurrences
destination="./packages/${atomic_type}/${name}"
package_name=""

if [[ "$atomic_type" == "global" || "$atomic_type" == "system" || "$atomic_type" == "pages" || "$atomic_type" == "templates" || "$atomic_type" == "tools" ]]; then
    # Remove the trailing 's' from the atomic type
    singular_atomic_type=$(echo "$atomic_type" | sed 's/s$//')

    # Convert the first character of the singular atomic type to uppercase
    uppercase_singular_atomic_type=$(echo "$singular_atomic_type" | awk '{print toupper(substr($0,1,1))substr($0,2)}')

    # Create the result variable using the classname and the uppercase_singular_atomic_type
    # classname="${classname}${uppercase_singular_atomic_type}" # actually we do not want our class name to use the extended naming.. 
    package_name="${atomic_type}-"
    prefixname="${prefix}-${name}-${singular_atomic_type}"
fi

output=$(node scripts/generator/check.js $ROOTDIR "@pap-it$package_name/$name" $destination)

if [ "$output" == "1" ]; then
  echo "Package exists in lockfile"
  exit 1
elif [ "$output" == "0" ]; then
  echo "Package does not exist in lockfile"
elif [ "$output" == "2" ]; then
  echo "An error occurred"
elif [ "$output" == "4" ]; then 
  echo ""
  read -p "This package already exists, are you sure you want to override?: (y/n) " override_ans
  override_ans=$(echo "$override_ans" | tr '[:upper:]' '[:lower:]')
  if [[ "$override_ans" != "y" && "$override_ans" != "yes" ]]; then
    echo "You chose \"no\""
    exit 1
  fi
else
  echo "No lockfile"
fi

mkdir -p "$destination"
rsync -a --exclude='*DS_Store' ./scripts/generator/template/ "$destination/"
# cp $SCRIPT_DIR/icons/$atomic_type.svg $destination/

# Replace occurrences in all files
find "$destination" -type f -not -name ".DS_Store" -not -name "*.svg" -not -name "*.ico" -exec sed -i '' "s/TEMPLATE_PACKAGENAME/${package_name}/g" {} \;
find "$destination" -type f -not -name ".DS_Store" -not -name "*.svg" -not -name "*.ico" -exec sed -i '' "s/ATOMIC_TYPE/${atomic_type}/g" {} \;
find "$destination" -type f -not -name ".DS_Store" -not -name "*.svg" -not -name "*.ico" -exec sed -i '' "s/TEMPLATE_NAME/${name}/g" {} \;
find "$destination" -type f -not -name ".DS_Store" -not -name "*.svg" -not -name "*.ico" -exec sed -i '' "s/TEMPLATE_CLASSNAME/${classname}/g" {} \;
find "$destination" -type f -not -name ".DS_Store" -not -name "*.svg" -not -name "*.ico" -exec sed -i '' "s/TEMPLATE_PREFIXNAME/${prefixname}/g" {} \;
find "$destination" -type f -not -name ".DS_Store" -not -name "*.svg" -not -name "*.ico" -exec sed -i '' "s/TEMPLATE_PROJECTSCOPE/${PROJECTSCOPE}/g" {} \;

sed -i '' "s/GITNAME/${GITNAME}/g" $destination/package.json

if [ -n $PROJECTLICENSE ]; then 
  sed -i '' "s/PROJECTLICENSE/${PROJECTLICENSE}/g" $destination/package.json
fi

# NO WINDOW SOLUTION (realpath)
combinedpath=$(realpath "$ROOTDIR/$destination")
ROOTDIR_RELATIVE=$(relative_path_to_ancestor "$combinedpath" "$ROOTDIR")

echo "\nROOTDIR_RELATIVE=$ROOTDIR_RELATIVE" >> $destination/.env

echo "Files copied to ${destination}."

# install the component 
npm install

# goto destination to run init
cd "$destination"
npm run init

# go back
cd "$ROOTDIR"

echo ""
read -p "Do you wish to init with git also?: (y/n) " git_ans
git_ans=$(echo "$git_ans" | tr '[:upper:]' '[:lower:]')
if [[ "$git_ans" == "y" || "$git_ans" == "yes" ]]; then
  git add $destination
  git commit -m "feat: new $atomic_type component : $name"
fi