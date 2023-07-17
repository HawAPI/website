#!/usr/bin/env bash

# Website and Docs adaptation

echo "${cyan}[$0] ${green}Starting website/docs adaptation..."
echo

echo "${cyan}[$0] ${green}Removing '.nojekyll' file"
rm -rf ./build/docs/.nojekyll

## Try to unzip and modify the 'sitemap.xml.gz' file.
if ! type gunzip; then
    ## If command 'gunzip' don't exist. Just remove the file.
    echo "${cyan}[$0] ${green}<gunzip> command not found! Removing 'sitemap.xml.gz' file"
    rm -rf ./build/docs/sitemap.xml.gz
else
    echo "${cyan}[$0] ${green}Unzipping 'sitemap.xml.gz' file"
    gunzip ./build/docs/sitemap.xml.gz
    echo "${cyan}[$0] ${green}Replacing '.id/' with '.id/docs/'"
    echo "${cyan}[$0] ${green}Moving 'sitemap.xml.gz' file to './build/sitemap-1.xml'"
    sed 's#.id/#.id/docs/#' ./build/docs/sitemap.xml > ./build/sitemap-1.xml

    echo "${cyan}[$0] ${green}Adding 'https://hawapi.theproject.id/sitemap-1.xml' to './build/docs/robots.txt'"
    echo 'Sitemap: https://hawapi.theproject.id/sitemap-1.xml' >> ./build/docs/robots.txt
fi

echo "${cyan}[$0] ${green}Moving 'robots.txt' to './build/robots.txt'"
sed 's/sitemap.xml.gz/sitemap-0.xml/' ./build/docs/robots.txt > ./build/robots.txt
rm -rf ./build/docs/robots.txt
rm -rf ./build/sitemap-index.xml