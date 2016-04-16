'use strict';

/**
 * Filesystem abstraction for the rest of baddsert
 */

import * as fs from 'fs';
import {join} from 'path';

// When we're first called, ensure the badd dir exists
let dir;
let dirName = 'badd-baseline';
dir = join(__dirname, dirName);

try {
  fs.statSync(dir);
} catch (e) {
  fs.mkdirSync(dir);
}

if (!fs.statSync(dir).isDirectory()){
  fs.mkdirSync(dir);
}

export let getStoredResults = (fileName: string) => {
  let fullPath = join(dir, fileName);
  let asserts;
  try {
    fs.statSync(fullPath);
    asserts = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
  } catch (e) {
    /* doesn't exist, we'll make it later */
    asserts = {};
  }

  process.on('exit', () => {
    fs.writeFileSync(fullPath, JSON.stringify(asserts));
  });
  return asserts;
}

// Keeping for reasons
export class BaddFile {
  asserts;
  fullPath
  constructor (fileName) {
    this.fullPath = join(dir, fileName);
    try {
      fs.statSync(this.fullPath);
      this.asserts = JSON.parse(fs.readFileSync(this.fullPath, 'utf-8'));
    } catch (e) {
      /* doesn't exist, we'll make it later */
      this.asserts = {};
    }

    process.on('exit', () => {
      this.save();
    });
  }
  save () {
    fs.writeFileSync(this.fullPath, JSON.stringify(this.asserts));
  }
}