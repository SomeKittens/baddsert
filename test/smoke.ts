'use strict';

/**
 * Some smoke tests so I can be sure I didn't break everything
 * Using chai's expect here so we don't get double-whammy'd by a bug causing tests to pass
 */

import {baddsertInject} from '../badd';
import {expect} from 'chai';


describe('smoke tests', () => {
  let mockStore;
  let baddsert;
  beforeEach(() => {
    mockStore = {};
    baddsert = baddsertInject(() => mockStore)('test');
  });

  it('creates new items if not found', () => {
    baddsert('some pants', 'llama');
    expect(mockStore).to.deep.equal({
     'some pants': {
       '_meta': {
         'type': 'string'
       },
       'current': 'llama'
     }
   });
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

    function thrower(): void {
      baddsert('pants', 'pants');
    }

    expect(thrower).to.throw(`pants: Expected 'pants' to equal 'super llama'.`);
  });

  it('should reject if passed a different falsy value', () => {
    baddsert('falsy check', false);
    function thrower(): void {
      baddsert('falsy check', undefined);
    }

    expect(thrower).to.throw(`falsy check: Expected 'undefined' to equal 'false'.`);
  });

  it('should persist an undefined item', () => {
    baddsert('undef', undefined);

    expect(mockStore).to.deep.equal({
      undef: {
        _meta: {
          type: 'undefined'
        },
        current: undefined
      }
    });
  });

  it('allows the user to pass a different comparator', () => {
    function thrower(): void {
      baddsert('diff comparator', 'moosle0');
      baddsert('diff comparator', 'moosle', (a, b) => {
        expect(a).to.equal('moosle0');
        expect(b).to.equal('moosle');

        return false;
      });
    }

    expect(thrower).to.throw(`diff comparator: Expected 'moosle' to equal 'moosle0'`);
  });
});
