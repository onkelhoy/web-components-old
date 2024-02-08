#!/bin/bash

ROOTDIR=$1
SCRIPT_DIR=$2
PACKAGE_PATH=$3
PROJECTSCOPE=$4
GLOBAL_PREFIX=$5
COMPONENT_PATH=$6
FILEPATH="$COMPONENT_PATH/component.ts"

if [ ! -f $FILEPATH ]; then 
  FILEPATH="$COMPONENT_PATH/index.ts"
fi 

FILENAME=${7:-$(basename "$COMPONENT_PATH")}

# we cd into our package
cd $PACKAGE_PATH

IMPORT=$(node -pe "require('./package.json').name")

# extracting classname based on file content 
CLASSNAME=$(cat $FILEPATH | grep 'export class' | awk '{print $3}')

if [ -f "$PACKAGE_PATH/react/$FILENAME.component.tsx" ]; then 
  echo "component: [$FILENAME] -- skipped 🦖🌵"
  exit 0
fi 

PREFIXNAME="${GLOBAL_PREFIX}-${FILENAME}"

if [[ "$ATOMICTYPE" == "global" || "$ATOMICTYPE" == "system" || "$ATOMICTYPE" == "pages" || "$ATOMICTYPE" == "templates" || "$ATOMICTYPE" == "tools" ]]; then
  # Remove the trailing 's' from the atomic type
  singular_atomic_type=$(echo "$ATOMICTYPE" | sed 's/s$//')
  PREFIXNAME="${GLOBAL_PREFIX}-${FILENAME}-${singular_atomic_type}"
fi

cp $SCRIPT_DIR/template/component.tsx ./react/$FILENAME.component.tsx
cp $SCRIPT_DIR/template/declerations.d.ts ./react/$FILENAME.declerations.d.ts

# replace all TEMPLATE variables
sed -i '' "s/TEMPLATE_PREFIXNAME/${PREFIXNAME}/g" ./react/$FILENAME.component.tsx
sed -i '' "s/TEMPLATE_PREFIXNAME/${PREFIXNAME}/g" ./react/$FILENAME.declerations.d.ts
sed -i '' "s/TEMPLATE_CLASSNAME/${CLASSNAME}/g" ./react/$FILENAME.component.tsx
sed -i '' "s/TEMPLATE_CLASSNAME/${CLASSNAME}/g" ./react/$FILENAME.declerations.d.ts
sed -i '' "s|TEMPLATE_IMPORT|${IMPORT}|g" ./react/$FILENAME.component.tsx

# now we need to just include in our index.ts file
echo "export * from \"./$FILENAME.component\";" > ./react/index.ts

echo "component: [$FILENAME] -- built ✅"

