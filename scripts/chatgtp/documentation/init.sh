#!/bin/bash

# start by activating the virtual env
source bin/activate 

# making sure pip exists
python -m ensurepip --default-pip

# install the necessary libraries
pip install -r ./requirements.txt

# deactivate the project
deactivate

echo "chatgtp documentation is installed"