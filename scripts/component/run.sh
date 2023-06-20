#!/bin/bash

# read the current package env
source .env

# Read config.env file (in generator)
source $ROOTDIR/scripts/generator/config.env

# get the data
read -p "Enter the name of the component: " name

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
classname=$(echo $name | awk -F"_" '{$1=toupper(substr($1,1,1))substr($1,2); for (i=2;i<=NF;i++){$i=toupper(substr($i,1,1))substr($i,2)}; print}' OFS="")
prefixname="${prefix}-${name}"

# destinations 
src_destination="$1/src/components/$name"
view_destination="$1/views/$name"

# create the path so it exists
mkdir -p $src_destination &> /dev/null
mkdir -p $view_destination &> /dev/null

# copy all files 
cp -R $SCRIPT_DIR/src/* $src_destination
rsync -a --exclude='*DS_Store' $SCRIPT_DIR/view/ "$view_destination/"

TEMPFILE="$SCRIPT_DIR/temp"

# update register
echo "import { $classname } from './components/$name';" >> $TEMPFILE
cat $1/src/register.ts >> $TEMPFILE
echo "if (!cElements.get('$prefixname')) {" >> $TEMPFILE
echo "  cElements.define('$prefixname', $classname);" >> $TEMPFILE
echo "}" >> $TEMPFILE

# replace
mv $TEMPFILE $1/src/register.ts

# update all the variable names 

# src 
sed -i '' "s/COMPONENT_CLASSNAME/${classname}/g" $src_destination/index.ts &> /dev/null
# views
sed -i '' "s/COMPONENT_CLASSNAME/${classname}/g" $view_destination/.config &> /dev/null
sed -i '' "s/COMPONENT_CLASSNAME/${classname}/g" $view_destination/index.html &> /dev/null
sed -i '' "s/COMPONENT_PREFIXNAME/${prefixname}/g" $view_destination/index.html &> /dev/null
sed -i '' "s/TEMPLATE_PACKAGENAME/${TEMPLATENAME}/g" $view_destination/main.js &> /dev/null
sed -i '' "s/COMPONENT_NAME/${name}/g" $view_destination/main.js &> /dev/null
sed -i '' "s/TEMPLATE_NAME/${NAME}/g" $view_destination/main.js &> /dev/null
