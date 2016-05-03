'use strict';

/**
 * Dogfooding baddsert in baddsert tests
 */

import {baddsertInject} from '../badd';
import {baddsert as realBadd} from '../index';

describe('dogfooding', () => {
  let mockStore;
  let baddsert;
  beforeEach(() => {
    mockStore = {};
    baddsert = baddsertInject(() => mockStore);
  });

  it('creates new items if not found', () => {
    baddsert('some pants', 'llama');
    realBadd('basic assert', mockStore);
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
    realBadd('no mutate', mockStore);
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
      realBadd('throw check', e.message);
    }
    realBadd('throw check did throw', didThrow);
  });

  it('should reject if passed a different falsy value', () => {
    baddsert('falsy check', false);
    let didThrow = true;
    try {
      baddsert('falsy check', undefined);
      didThrow = false;
    } catch (e) {
      // falsy reject: Expected 'undefined' to equal 'false'
      realBadd('falsy reject', e.message);
    }
    realBadd('falsy reject did throw', didThrow);
  });

  it('should persist an undefined item', () => {
    // No check, just reading test output, yeaaaahhh...
    realBadd('undef', undefined);
  });

  it('allows the user to pass a different comparator', () => {
    let didThrow = true;
    try {
      baddsert('diff comparator', 'moosle0');
      baddsert('diff comparator', 'moosle', (a, b) => {
        realBadd('comparator a', a);
        realBadd('comparator b', b);

        return false;
      });
      didThrow = false;
    } catch (e) {
      realBadd('comparator reject', e.message);
    }
    realBadd('comparator didThrow', didThrow);
  });
});
