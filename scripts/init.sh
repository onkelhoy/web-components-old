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

# check if we wish to build each packages
read -p "install dependencies (recommended for initial setup), proceed?: (y/n) " install
install=$(echo "$install" | tr '[:upper:]' '[:lower:]')
if [[ "$install" != "y" && "$install" != "yes" ]]; then
  echo "You chose \"no\", so we skip installing dependencies, if no dependencies available lots of dev dependencies wont work (like dev-server)"
else 
  echo "Install Dev-Sever dependencies"
  cd scripts/server
  npm install
  echo "finished"

  cd ../../

  echo "### install node dependancies"
  npm install
  echo "finished"
fi
echo ""

# init bash script executions (as they are normally called from JS)
chmod +x ./scripts/publish/individual.sh
chmod +x ./scripts/ecosystem/individual.sh
chmod +x ./scripts/package-showcase/individual.sh


# check if we wish to build each packages
read -p "Build packages (recommended for initial setup), proceed?: (y/n) " build_ans
build_ans=$(echo "$build_ans" | tr '[:upper:]' '[:lower:]')
if [[ "$build_ans" != "y" && "$build_ans" != "yes" ]]; then
  echo "You chose \"no\", so we skip installing building each package - note if no packages has been build running individual packages wont work"
else 
  npm run build 
fi
echo ""

echo "project initialized - Happy Coding!"


# # I think it is depricated that I use the fq - but lets see..
# # read -p "installing fq (JSON parser) using brew, proceed?: (y/n) " brew_ans
# # brew_ans=$(echo "$brew_ans" | tr '[:upper:]' '[:lower:]')
# # if [[ "$brew_ans" != "y" && "$brew_ans" != "yes" ]]; then
# #   echo "You chose \"no\", so we skip installing fq - note that many things are requiring fq!"
# # else 
# #   brew install fq 
# # fi
# # echo ""
# # TODO add back! until chatgtp documentation is ready we can not use it
# # echo "### init the python chatgtp documentation"
# # cd ./scripts/auto-doc/
# # sh init.sh
# # echo ""
# # # cd ../
