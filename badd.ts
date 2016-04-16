'use strict';

import {getStoredResults} from './badd-fs';
import {deepStrictEqual} from 'assert';

// Some init thing
// Gets a label, creates a file named that in the above folder
// returns baddsert
export let baddsertInject = getStoredResults => {
  return fileName => {
    let stored = getStoredResults(fileName);

    return (label: string, data) => {
      // Mreh.  TODO: Better way to handle symbols
      if (typeof data === 'symbol') {
        data = data.toString();
        console.warn(`Symbol matching is only supported via .toString(): ${data}`);
      }

      if (stored[label] && stored[label].reference) {
        try {
          deepStrictEqual(stored[label].reference, data);
        } catch (e) {
          stored[label].current = data;
          throw new Error(`${label}: Expected ${data.toString()} to equal ${stored[label].reference}.`);
        }
      } else {
        console.log(`Making new entry for ${label}`);
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
