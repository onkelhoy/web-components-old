#!/bin/bash

for component in $(find src/components -name style.scss -type f -exec dirname {} \; | xargs -n 1 basename); do
  sh .scripts/helper/compile-css-individual.sh $component
done
