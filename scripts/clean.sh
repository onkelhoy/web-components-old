#!/bin/bash

read -p "Delete generated files?: (y/n) " gen
gen=$(echo "$gen" | tr '[:upper:]' '[:lower:]')
if [[ "$gen" != "n" && "$gen" != "no" ]]; then
  find packages -type d -path "*/views/combined" -exec rm -rf {} +
  find packages -type d -path "*/views/variations" -exec rm -rf {} +
  find packages -type d -path "*/views/interactive" -exec rm -rf {} +
  find packages -type d -path "*/views/doc" -exec rm -rf {} +
fi

read -p "Delete showcase?: (y/n) " showcase
showcase=$(echo "$showcase" | tr '[:upper:]' '[:lower:]')
if [[ "$showcase" != "n" && "$showcase" != "no" ]]; then
  rm -rf showcase
fi

read -p "Delete analysis?: (y/n) " analysis
analysis=$(echo "$analysis" | tr '[:upper:]' '[:lower:]')
if [[ "$analysis" != "n" && "$analysis" != "no" ]]; then
  find packages -type f -path "*/custom-elements.json" -delete
fi