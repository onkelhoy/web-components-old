#!/bin/bash

# read the current package env
source .env

# Read config.env file (in generator)
source $ROOTDIR/scripts/generator/config.env

# get the data
read -p "Enter the name of the component: " name

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECTSCOPE=$(node -pe "require('$ROOTDIR/package.json').name")
PROJECTSCOPE=$(echo "$PROJECTSCOPE" | cut -d'/' -f1 | awk -F'@' '{print $2}')

classname=$(echo $name | awk -F"[_-]" '{$1=toupper(substr($1,1,1))substr($1,2); for (i=2;i<=NF;i++){$i=toupper(substr($i,1,1))substr($i,2)}; print}' OFS="")
prefixname="${prefix}-${name}"


if [[ "$ATOMICTYPE" == "global" || "$ATOMICTYPE" == "system" || "$ATOMICTYPE" == "pages" || "$ATOMICTYPE" == "templates" || "$ATOMICTYPE" == "tools" ]]; then
  # Remove the trailing 's' from the atomic type
  singular_atomic_type=$(echo "$ATOMICTYPE" | sed 's/s$//')

  # Convert the first character of the singular atomic type to uppercase
  uppercase_singular_atomic_type=$(echo "$singular_atomic_type" | awk '{print toupper(substr($0,1,1))substr($0,2)}')

  # Create the result variable using the classname and the uppercase_singular_atomic_type
  # classname="${classname}${uppercase_singular_atomic_type}"
  prefixname="${prefixname}-${singular_atomic_type}"
fi


# destinations 
src_destination="$1/src/components/$name"
view_destination="$1/views/$name"

# create the path so it exists
mkdir -p $src_destination &> /dev/null
mkdir -p $view_destination &> /dev/null

# copy all files 
cp -R $SCRIPT_DIR/src/* $src_destination
rsync -a --exclude='*DS_Store' $SCRIPT_DIR/view/ "$view_destination/"

REG_TEMP="$SCRIPT_DIR/regtemp"
INDEX_TEMP="$SCRIPT_DIR/indextemp"

# update register
echo "import { $classname } from './components/$name';" >> $REG_TEMP
cat $1/src/register.ts >> $REG_TEMP
echo "if (!cElements.get('$prefixname')) {" >> $REG_TEMP
echo "  cElements.define('$prefixname', $classname);" >> $REG_TEMP
echo "}" >> $REG_TEMP

# update index
echo "export * from './components/$name';" >> $INDEX_TEMP
cat $1/src/index.ts >> $INDEX_TEMP

# replace
mv $REG_TEMP $1/src/register.ts
mv $INDEX_TEMP $1/src/index.ts

# update all the variable names 

# src 
sed -i '' "s/COMPONENT_CLASSNAME/${classname}/g" $src_destination/index.ts &> /dev/null
sed -i '' "s/COMPONENT_PREFIXNAME/${prefixname}/g" $src_destination/index.ts &> /dev/null
# views
sed -i '' "s/COMPONENT_CLASSNAME/${classname}/g" $view_destination/.config &> /dev/null
sed -i '' "s/COMPONENT_CLASSNAME/${classname}/g" $view_destination/index.html &> /dev/null
sed -i '' "s/COMPONENT_PREFIXNAME/${prefixname}/g" $view_destination/index.html &> /dev/null
sed -i '' "s/TEMPLATE_PACKAGENAME/${PACKAGENAME}/g" $view_destination/main.js &> /dev/null
sed -i '' "s/COMPONENT_NAME/${name}/g" $view_destination/main.js &> /dev/null
sed -i '' "s/TEMPLATE_NAME/${NAME}/g" $view_destination/main.js &> /dev/null
sed -i '' "s/PROJECTSCOPE/${PROJECTSCOPE}/g" $view_destination/main.js &> /dev/null
