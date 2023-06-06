#!/bin/bash

# TODO make this automized based on config.components ? (for now it only points to ts file)

# Add all potential folders here that has a "style.scss" file
sh .scripts/helper/compile-css-individual.sh src
