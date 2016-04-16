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
  })
  it('creates new items if not found', () => {
    baddsert('some pants', 'llama');
    realB('basic assert', mockStore);
  });
});
