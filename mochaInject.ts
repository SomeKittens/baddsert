'use strict';

let injected = false;
let key;

export let inject = () => {
  injected = true;
  beforeEach(function (): void {
    key = [this.currentTest.title];
    let t = this.currentTest;
    while (t.parent && t.parent.title) {
      key.unshift(t.parent.title);
      t = t.parent;
    }

  });
};

export let getKey = () => {
  if (!injected) {
    return [];
  }
  return key.slice();
};
