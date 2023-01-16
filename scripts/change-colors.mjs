#!/usr/bin/node

import * as fs from 'fs';

main();

function main() {
  let colors;

  fs.readFile('./build/data/colors.json', 'utf-8', (err, json) => {
    if (err) return console.log(err);

    colors = new Map(Object.entries(JSON.parse(json)));
  });

  fs.readFile('./build/docs/resources/css/retype.css', 'utf-8', (err, data) => {
    if (err) return console.log(err);

    let result = data;
    colors.forEach((value, key) => (result = result.replaceAll(key, value)));

    fs.writeFile(
      './build/docs/resources/css/retype.css',
      result,
      'utf8',
      (err) => {
        if (err) return console.log(err);
      }
    );
  });
}
