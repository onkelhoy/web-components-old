#!/bin/bash

read -p "Are you sure you wish to clean (it will remove all variations, interactive + doc generated files)?: (y/n) " git_ans
git_ans=$(echo "$git_ans" | tr '[:upper:]' '[:lower:]')
if [[ "$git_ans" != "y" && "$git_ans" != "yes" ]]; then
  echo "you choose no, smart choice!"
  exit 0
fi

find packages -type f -path "*/views/variations/index.html" -delete
find packages -type f -path "*/views/variations/main.js" -delete
find packages -type f -path "*/views/variations/style.css" -delete

find packages -type f -path "*/views/interactive/index.html" -delete
find packages -type f -path "*/views/interactive/main.js" -delete
find packages -type f -path "*/views/interactive/style.css" -delete

find packages -type d -path "*/views/doc/auto" -exec rm -rf {} +
find packages -type f -path "*/views/doc/public/markdown/*.md" -delete
