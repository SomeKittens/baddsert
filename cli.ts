'use strict';

/**
 * CLI, I guess?
 */

import {getAllResults, save} from './badd-fs';
import {deepStrictEqual} from 'assert';
import {keyInYN} from 'readline-sync';

// Can I use left-pad here?  Absolutely!
// Would that be a smarter idea in general?  Yes!
// Will I, because I'm stubborn?  Also yes!
let leftLog = (spaces: number, ...str: string[]): void => {
  let spacing = new Array((spaces*2)+1).join(' ');
  console.log(spacing, ...str);
};

let allResults = getAllResults();
let depth = 0;

let check = (resultSet, subKey) => {
  depth++;
  if (!resultSet._meta) {
    leftLog(depth, `--- Checking ${subKey} ---`);
    Object.keys(resultSet).forEach(key => check(resultSet[key], key));
    depth--;
    return;
  }
  if (!resultSet.current) {
    leftLog(depth, `✓ ${subKey}`);
    depth--;
    return;
  }

  try {
    deepStrictEqual(resultSet.reference, resultSet.current);

    leftLog(depth, `✓ ${subKey}`);
  } catch (e) {
    leftLog(depth, `${subKey}: AGH THEY DON'T MATCH DOOOOOOOM`);
    leftLog(depth, 'Stored resultSet:', resultSet.reference);
    leftLog(depth, 'Latest:', resultSet.current);
    if (keyInYN('Should I replace this?')) {
      resultSet.reference = resultSet.current;
    }
  }
  depth--;
}


Object.keys(allResults)
.forEach(key => {

  let resultSet = allResults[key];
  check(resultSet, key);

  // Always save
  // Can figure out dirty check if it's worth it.
  save(key, resultSet);
});
