#!/bin/bash

source .env
source bin/activate

python3 main.py $OPENAI_API_KEY $1 $2

deactivate