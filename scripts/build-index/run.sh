#!/bin/bash

PACKAGEDIR=$1
SCRIPTDIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [ -f "$PACKAGEDIR/index.ts" ]; then 
  rm $PACKAGEDIR/index.ts 
fi 

touch $PACKAGEDIR/index.ts 
if [ -f "$PACKAGEDIR/custom-index.js" ]; then
  cp "$PACKAGEDIR/custom-index.js" $PACKAGEDIR/index.ts
  exit 0
fi 

if [ -f $PACKAGEDIR/src/register.ts ]; then 
  echo "import \"./src/register.js\";" >> $PACKAGEDIR/index.ts
fi

echo "export * from \"./src/index.js\";" >> $PACKAGEDIR/index.ts

if [ -d "$PACKAGEDIR/react" ] && [ -f "$PACKAGEDIR/react/index.ts" ]; then
  sed "s/export \* from '\(.*\/\)\(.*\)';/export { \2 as \2React } from \"\.\/react\/index.js\";/" $PACKAGEDIR/react/index.ts >> $PACKAGEDIR/index.ts
fi