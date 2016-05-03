'use strict';

/**
 * Tests Mocha injection, allowing for nested labels
 */

import {baddsert} from '../index';
import {inject} from '../mochaInject';

inject();

describe('root describe', () => {
  describe('nested describe', () => {
    it('works inside nesting', () => {
      baddsert('nest', true);
    });
  });

  it('works with a single layer of nesting', () => {
    baddsert('single', true);
  });
});
