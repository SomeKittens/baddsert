'use strict';

import {deepStrictEqual} from 'assert';
import {get, set} from 'object-path';
import {getKey} from './mochaInject';

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

// Some init thing
// Gets a label, creates a file named that in the above folder
// returns baddsert
export let baddsertInject = getStoredResults => {
  return (filename: string): Function => {
    let stored = getStoredResults(filename);

    return (label: string, data: any, comparator?: IComparator): void => {
      let keys = getKey();
      keys.push(label);

      // Mreh.  TODO: Better way to handle symbols
      if (typeof data === 'symbol') {
        data = data.toString();
        console.warn(`Symbol matching is only supported via .toString(): ${data}`);
      }

      let refObj = <IReference>get(stored, keys);

      if (refObj && refObj.hasOwnProperty('reference')) {
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
      } else {
        // We don't have it, assume correct
        // console.log(`Making new entry for ${label}, populated with ${data}`);
        set(stored, keys, {
          _meta: {
            type: typeof data
          },
          reference: data
        });
      }
    };
  };
};
