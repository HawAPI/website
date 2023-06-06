#!/usr/bin/env bash

red=$(tput setaf 1)
green=$(tput setaf 2)
blue=$(tput setaf 4)
cyan=$(tput setaf 6)

echo
echo "${blue}Script: ${green}$0"
echo

## Check if 'docs/build/' exists.
if [ ! -d "docs/build/" ]; then
    echo "${cyan}[$0] ${red}Couldn't find 'docs/build/' directory!"
    exit 1
fi

echo "${cyan}[$0] ${green}Moving docs 'build/' to website 'build/'..."
mv ./docs/build/ ./build/docs