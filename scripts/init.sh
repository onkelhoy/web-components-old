#!/bin/bash

# install fswatch
read -p "installing fswatch using brew, proceed?: (y/n) " brew_ans
brew_ans=$(echo "$brew_ans" | tr '[:upper:]' '[:lower:]')
if [[ "$brew_ans" != "y" && "$brew_ans" != "yes" ]]; then
  echo "You chose \"no\", so we skip installing fswatch - note that many things are requiring fswatch!"
else 
  brew install fswatch 
fi
echo ""

# # I think it is depricated that I use the fq - but lets see..
# # read -p "installing fq (JSON parser) using brew, proceed?: (y/n) " brew_ans
# # brew_ans=$(echo "$brew_ans" | tr '[:upper:]' '[:lower:]')
# # if [[ "$brew_ans" != "y" && "$brew_ans" != "yes" ]]; then
# #   echo "You chose \"no\", so we skip installing fq - note that many things are requiring fq!"
# # else 
# #   brew install fq 
# # fi
# # echo ""

echo "Install Dev-Sever dependencies"
cd scripts/server
npm install
echo "finished"

cd ../../

# init bash script executions 
chmod +x ./scripts/publish/individual.sh
chmod +x ./scripts/ecosystem/individual.sh

echo "### install node dependancies"
npm install
echo "finished"

# # TODO add back! until chatgtp documentation is ready we can not use it
# # echo "### init the python chatgtp documentation"
# # cd ./scripts/auto-doc/
# # sh init.sh
# # echo ""
# # # cd ../

echo "project initialized - Happy Coding!"