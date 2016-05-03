'use strict';

import {deepStrictEqual} from 'assert';
import {get, set} from 'object-path';
import {getKey} from './mochaInject';
import * as debug from 'debug';
import {get as stackGet} from 'stack-trace';
import {sep as pathSeparator} from 'path';

let sillyLog = debug('baddsert:silly');
let infoLog = debug('baddsert:info');

export interface IComparator {
  (a: any, b: any): boolean;
}

export interface IReference {
  reference?: any;
  _meta: any;
  current: any;
}

let maybeToString = item => {
  if (!item) { return item; }
  return item.toString ? item.toString() : item;
};

// DI lets us inject mock stored results in tests
export let baddsertInject = getStoredResults => {
  let baselines = {};

  return (label: string, data: any, comparator?: IComparator): void => {
    sillyLog(`Label: ${label}, data: ${data}`);
    let filename = stackGet()[1]
      .getFileName()
      .split(pathSeparator)
      .pop()
      .slice(0, -3);

    if (!baselines[filename]) {
      baselines[filename] = getStoredResults(filename);
    }

    let stored = baselines[filename];
    let keys = getKey();
    keys.push(label);

    // Mreh.  TODO: Better way to handle symbols
    if (typeof data === 'symbol') {
      data = data.toString();
      console.warn(`Symbol matching is only supported via .toString(): ${data}`);
    }

    let refObj = <IReference>get(stored, keys);

    sillyLog('Got refObj:', refObj);
    if (refObj && refObj.hasOwnProperty('reference')) {
      sillyLog(`Asserting ${refObj.reference} is equal to ${data}`);
      // We have a previous result
      if (comparator) {
        // Use the provided comparison tool
        let result;
        try {
          result = comparator(refObj.reference, data);
        } catch (e) {
          result = false;
        }

        if (!result) {
          set(stored, [...keys, 'current'], data);
          throw new Error(`${label}: Expected '${maybeToString(data)}' to equal '${refObj.reference}'.`);
        }
      } else {
        // Use default
        try {
          deepStrictEqual(refObj.reference, data);
        } catch (e) {
          refObj.current = data;
          throw new Error(`${label}: Expected '${maybeToString(data)}' to equal '${refObj.reference}'.`);
        }
      }
    } else if (refObj && refObj.hasOwnProperty('current')) {
      // User has not given us a reference value but is trying to assert against the current value
      // TODO: have two modes, strict and lax

      console.warn('Attempting to assert value without setting reference, using previous value:', refObj.current);
      try {
        deepStrictEqual(refObj.current, data);
      } catch (e) {
        let prevCurrent = refObj.current;
        refObj.current = data;
        throw new Error(`${label}: Expected '${maybeToString(data)}' to equal '${prevCurrent}'.`);
      }
    } else {
      // We don't have it, assume correct
      infoLog(`Making new entry for ${label}, populated with ${data}`);
      set(stored, keys, {
        _meta: {
          type: typeof data
        },
        current: data
      });
    }
  };
};
