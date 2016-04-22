'use strict';

/**
 * Tests Mocha injection, allowing for nested labels
 */

import {baddsert} from '../index';
import {inject} from '../mochaInject';

let injected = baddsert('injected');

inject();

describe('root describe', () => {
  describe('nested describe', () => {
    it('works inside nesting', () => {
      injected('nest', true);
    });
  });

  it('works with a single layer of nesting', () => {
    injected('single', true);
  });
});
