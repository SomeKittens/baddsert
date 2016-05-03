'use strict';

/**
 * CLI, I guess?
 */

import {getAllResults, save} from './badd-fs';
import {deepStrictEqual} from 'assert';
import {keyInYNStrict} from 'readline-sync';
import * as colors from 'colors';
import {spawn} from 'child_process';

// Can I use left-pad here?  Absolutely!
// Would that be a smarter idea in general?  Yes!
// Will I, because I'm stubborn?  Also yes!
let leftLog = (spaces: number, ...str: string[]): void => {
  let spacing = new Array((spaces * 2)).join(' ');
  console.log(spacing, ...str);
};

let allResults = getAllResults();
let depth = 0;
let greenCheckmark = colors.green('✓');

let check = (resultSet, subKey) => {
  depth++;
  // If there's no _meta, we need to recurse further
  if (!resultSet._meta) {
    leftLog(depth, '-', colors.underline.white(`${subKey}`));
    Object.keys(resultSet).forEach(key => check(resultSet[key], key));
    depth--;
    return;
  }
  // If there's no reference property, this was the first time we saw this key
  // So we need to check with the user to ensure that this is the right value
  if (!resultSet.hasOwnProperty('reference')) {
    leftLog(depth, colors.red(`X ${subKey}: No reference value found`));
    // Not using template functions here so we're not calling .toString on objects
    leftLog(depth + 1, 'Latest result:', resultSet.current);
    if (keyInYNStrict('Use this value?')) {
      resultSet.reference = resultSet.current;
    }
  }

  // If there is a reference property (checked above) and no current, then the test passed
  // Move along, nothing to see here
  if (!resultSet.hasOwnProperty('current')) {
    leftLog(depth, `${greenCheckmark} ${subKey}`);
    depth--;
    return;
  }


  // If there are both current & reference properties, we need to ensure they match
  // If not, a test failed and the user probably wants to update the value there
  try {
    deepStrictEqual(resultSet.reference, resultSet.current);

    leftLog(depth, `${greenCheckmark} ${subKey}`);
  } catch (e) {
    leftLog(depth, colors.red(`X ${subKey}: AGH THEY DON'T MATCH ${colors.zalgo('DOOOOOOOM')}`));
    // Not using template functions here so we're not calling .toString on objects
    leftLog(depth + 1, 'Reference value:', resultSet.reference);
    leftLog(depth + 1, 'Latest result:', resultSet.current);
    if (keyInYNStrict('Should I replace this?')) {
      resultSet.reference = resultSet.current;
      delete resultSet.current;
    }
  }
  depth--;
};

let tests = spawn('npm', ['test', '-s'], {stdio: 'inherit'});

tests.on('close', (code) => {
  console.log('--- BADD baselines ---');
  Object.keys(allResults)
  .forEach(key => {

    let resultSet = allResults[key];
    check(resultSet, key);

    // Always save
    // Can figure out dirty check if it's worth it.
    save(key, resultSet);
  });
});
