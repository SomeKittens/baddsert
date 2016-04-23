'use strict';

/**
 * Filesystem abstraction for the rest of baddsert
 */

import * as fs from 'fs';
import {join} from 'path';
import {js_beautify as jsBeautify} from 'js-beautify';

// import stringify from 'node-stringify';
let stringify = require('node-stringify');

// When we're first called, ensure the badd dir exists
let dir;
let dirName = 'badd-baseline';
dir = join('./', dirName);

try {
  fs.statSync(dir);
} catch (e) {
  fs.mkdirSync(dir);
}

if (!fs.statSync(dir).isDirectory()) {
  fs.mkdirSync(dir);
}

let addJSSuffix = (filename: string): string => {
  return filename.indexOf('.js') === (filename.length - 3) ? filename : filename + '.js';
};

let loadFile = (filename: string) => {
  return eval(fs.readFileSync(join(dir, addJSSuffix(filename)), 'utf-8'));
};

export let save = (filename, info) => {
  fs.writeFileSync(join(dir, addJSSuffix(filename)), jsBeautify(stringify(info)));
};

export let getStoredResults = (filename: string) => {
  let asserts;
  try {
    asserts = loadFile(filename);
  } catch (e) {
    /* doesn't exist, we'll make it later */
    console.warn('Could not find file:', filename);
    asserts = {};
  }

  process.on('exit', () => {
    save(filename, asserts);
  });
  return asserts;
};

export let getAllResults = () => {
  return fs.readdirSync(dir)
  .reduce((prev, filename) => {
    prev[filename] = loadFile(filename);
    return prev;
  }, {});
};
