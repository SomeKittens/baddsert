'use strict';

import {deepStrictEqual} from 'assert';

export interface IComparator {
  (a: any, b: any): boolean;
}

let maybeToString = item => {
  if (!item) { return item; }
  return item.toString ? item.toString() : item;
};

// Some init thing
// Gets a label, creates a file named that in the above folder
// returns baddsert
export let baddsertInject = getStoredResults => {
  return (fileName: string): Function => {
    let stored = getStoredResults(fileName);

    return (label: string, data: any, comparator?: IComparator): void => {
      // Mreh.  TODO: Better way to handle symbols
      if (typeof data === 'symbol') {
        data = data.toString();
        console.warn(`Symbol matching is only supported via .toString(): ${data}`);
      }

      if (stored[label] && stored[label].hasOwnProperty('reference')) {
        // We have a previous result
        if (comparator) {
          // Use the provided comparison tool
          let result;
          try {
            result = comparator(stored[label].reference, data);
          } catch (e) {
            result = false;
          }

          if (!result) {
            stored[label].current = data;
            throw new Error(`${label}: Expected '${maybeToString(data)}' to equal '${stored[label].reference}'.`);
          }
        } else {
          // Use default
          try {
            deepStrictEqual(stored[label].reference, data);
          } catch (e) {
            stored[label].current = data;
            throw new Error(`${label}: Expected '${maybeToString(data)}' to equal '${stored[label].reference}'.`);
          }
        }
      } else {
        // We don't have it, assume correct
        console.log(`Making new entry for ${label}, populated with ${data}`);
        stored[label] = {
          _meta: {
            type: typeof data
          },
          reference: data
        };
      }
    };
  };
};
