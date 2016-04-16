'use strict';

/**
 * Some smoke tests so I can be sure I didn't break everything
 */

import {baddsertInject} from '../badd';
import {baddsert as realBadd} from '../index';

let realB = realBadd('test-actual');

describe('smoke tests', () => {
  let mockStore;
  let baddsert;
  beforeEach(() => {
    mockStore = {};
    baddsert = baddsertInject(() => mockStore)('test');
  });

  it('creates new items if not found', () => {
    baddsert('some pants', 'llama');
    realB('basic assert', mockStore);
  });

  it('checks against old data and does fine', () => {
    // This'll throw if something's wrong
    mockStore.pants = {
      _meta: {
        type: 'denim'
      },
      reference: 'pants'
    };
    baddsert('pants', 'pants');
  });

  it('should throw if it finds something that does not match', () => {
    mockStore.pants = {
      _meta: {
        type: 'denim'
      },
      reference: 'super llama'
    };
    let didThrow = true;
    try {
      baddsert('pants', 'pants');
      didThrow = false;
    } catch (e) {
      // pants: Expected pants to equal super llama.
      realB('throw check', e.message);
    }
    realB('throw check did throw', didThrow);
  });

  it('should reject if passed a different falsy value', () => {
    baddsert('falsy check', false);
    let didThrow = true;
    try {
      baddsert('falsy check', undefined);
      didThrow = false;
    } catch (e) {
      // pants: Expected pants to equal super llama.
      realB('falsy reject', e.message);
    }
    realB('falsy reject did throw', didThrow);
  });

  it('should persist an undefined item', () => {
    realB('undef', undefined);
  });
});
