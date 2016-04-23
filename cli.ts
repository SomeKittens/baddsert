'use strict';

/**
 * CLI, I guess?
 */

import {getAllResults, save} from './badd-fs';
import {deepStrictEqual} from 'assert';
import {keyInYNStrict} from 'readline-sync';
import * as colors from 'colors';

// Can I use left-pad here?  Absolutely!
// Would that be a smarter idea in general?  Yes!
// Will I, because I'm stubborn?  Also yes!
let leftLog = (spaces: number, ...str: string[]): void => {
  let spacing = new Array((spaces * 2) + 1).join(' ');
  console.log(spacing, ...str);
};

let allResults = getAllResults();
let depth = 0;
let greenCheck = colors.green('✓');

let fixBadResult = (subKey, resultSet) => {
  leftLog(depth, colors.red(`X ${subKey}: AGH THEY DON'T MATCH ${colors.trap('DOOOOOOOM')}`));
  // Not using template functions here so we're not calling .toString on objects
  leftLog(depth + 1, 'Reference value:', resultSet.reference);
  leftLog(depth + 1, 'Latest result:', resultSet.current);
  if (keyInYNStrict('Should I replace this?')) {
    resultSet.reference = resultSet.current;
  }
};

let check = (resultSet, subKey) => {
  depth++;
  if (!resultSet._meta) {
    leftLog(depth, '-', colors.underline.white(`${subKey}`));
    Object.keys(resultSet).forEach(key => check(resultSet[key], key));
    depth--;
    return;
  }
  if (!resultSet.current) {
    leftLog(depth, `${greenCheck} ${subKey}`);
    depth--;
    return;
  }

  try {
    deepStrictEqual(resultSet.reference, resultSet.current);

    leftLog(depth, `${greenCheck} ${subKey}`);
  } catch (e) {
    fixBadResult(subKey, resultSet);
  }
  depth--;
};


Object.keys(allResults)
.forEach(key => {

  let resultSet = allResults[key];
  check(resultSet, key);

  // Always save
  // Can figure out dirty check if it's worth it.
  save(key, resultSet);
});
