'use strict';

/**
 * Mocha injection requires that we check the result that's written to disk
 * Since this happens on process exit, we need to spin up a separate process to trigger this.
 *
 * Not sure if this is even needed, don't remember why I wrote it.
 */

import {spawn} from 'child_process';
import {readFileSync} from 'fs';
import {join} from 'path';
import {deepStrictEqual} from 'assert';

import {getStoredResults} from './badd-fs';

let baselines = getStoredResults('injected');

let mochaRun = spawn('mocha', ['--harmony', join(__dirname, 'test', 'inject')]);

mochaRun.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

mochaRun.stderr.on('data', (data) => {
  console.log(`stdout: ${data}`);
});


mochaRun.on('close', (code) => {
  console.log(`Mocha tests exited with code ${code}`);
  let newBaselines = eval(readFileSync(join('./', '.baselines', 'injected.js'), 'utf-8'));
  deepStrictEqual(baselines, newBaselines);
});
