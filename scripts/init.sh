#!/bin/bash

# install fswatch
# brew update 
read -p "installing fswatch using brew, proceed?: (y/n) " brew_ans
brew_ans=$(echo "$brew_ans" | tr '[:upper:]' '[:lower:]')
if [[ "$brew_ans" != "y" && "$brew_ans" != "yes" ]]; then
  echo "You chose \"no\", so we skip installing fswatch - note that many things are requiring fswatch!"
else 
  brew install fswatch 
fi
echo ""
echo ""

echo "### install node dependancies"
npm install
echo ""

echo "### init the python chatgtp documentation"
cd ./scripts/chatgtp/documentation/
sh init.sh
echo ""

cd ../../../

echo "project initialized"