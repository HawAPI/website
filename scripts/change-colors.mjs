#!/usr/bin/node

import * as fs from 'fs';

main();

function main() {
  fs.readFile('./build/docs/resources/css/retype.css', 'utf-8', (err, data) => {
    if (err) return console.log(err);

    // Replace default 'retype' colors.
    var result = data.replaceAll('30 30 30', '15 15 15');
    result = result.replaceAll('34 34 34', '15 15 15');
    result = result.replaceAll('95 160 255', '179 0 0');
    result = result.replaceAll('66 132 251', '179 0 0');
    result = result.replaceAll('44 44 44', '40 0 0');
    result = result.replaceAll('50 50 50', '40 0 0');
    result = result.replaceAll('97 97 97', '255 255 255');
    result = result.replaceAll('39 39 39', '25 25 25');
    result = result.replaceAll('179 210 255', '255 255 255');
    result = result.replaceAll('189 189 189', '255 255 255');

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
