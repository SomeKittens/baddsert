'use strict';

/**
 * Filesystem abstraction for the rest of baddsert
 */

import * as fs from 'fs';
import {join} from 'path';
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

let loadFile = (filename: string) => {
  return eval(fs.readFileSync(join(dir, filename), 'utf-8'));
};

export let getStoredResults = (filename: string) => {
  let fullPath = join(dir, filename);
  let asserts;
  try {
    fs.statSync(fullPath);
    asserts = loadFile(filename);
  } catch (e) {
    /* doesn't exist, we'll make it later */
    asserts = {};
  }

  process.on('exit', () => {
    fs.writeFileSync(fullPath, stringify(asserts));
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

export let save = (filename, info) => {
  fs.writeFileSync(join(dir, filename), stringify(info));
};

// Keeping for reasons
export class BaddFile {
  asserts: any;
  fullPath: any;
  constructor (filename) {
    this.fullPath = join(dir, filename);
    try {
      fs.statSync(this.fullPath);
      this.asserts = eval(fs.readFileSync(this.fullPath, 'utf-8'));
    } catch (e) {
      /* doesn't exist, we'll make it later */
      this.asserts = {};
    }

    process.on('exit', () => {
      this.save();
    });
  }
  save (): void {
    fs.writeFileSync(this.fullPath, stringify(this.asserts));
  }
}
