'use strict';

/**
 * CLI, I guess?
 */

import {getAllResults, save} from './badd-fs';
import {deepStrictEqual} from 'assert';
import {keyInYN} from 'readline-sync';

let allResults = getAllResults();

Object.keys(allResults)
.forEach(key => {

  let resultSet = allResults[key];
  console.log(`--- Checking ${key} ---`);
  let dirty = false;
  Object.keys(resultSet)
  .forEach(subKey => {
    let result = resultSet[subKey];

    try {
      deepStrictEqual(result.reference, result.current);

      console.log(`   ${subKey}: Match!`);
    } catch (e) {
      console.log(`   ${subKey}: AGH THEY DON'T MATCH DOOOOOOOM`);
      console.log('Stored result:', result.reference);
      console.log('Latest:', result.current);
      if (keyInYN('Should I replace this?')) {
        result.reference = result.current;
        dirty = true;
      }
    }
  });

  if (dirty) {
    save(key, resultSet);
  }
});
