#!/bin/bash

# prepare 
rm -rf views/combined
mkdir views/combined

# run local combine first
sh .scripts/helper/local-combine.sh

# run global combine later
sh .scripts/helper/global-combine.sh

sh .scripts/start.sh combined