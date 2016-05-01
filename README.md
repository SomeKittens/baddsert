# baddsert

[![Build Status](https://travis-ci.org/SomeKittens/baddsert.svg?branch=master)](https://travis-ci.org/SomeKittens/baddsert) [![npm](https://img.shields.io/npm/v/baddsert.svg?maxAge=2592000)](https://www.npmjs.com/package/baddsert)

---

Framework for baseline acceptance driven development in JavaScript.

It's annoying to maintain tests.  Every time you change an api, all the tests fail and they need to be manually updated.

`baddsert` allows you to keep the data of tests separate from the test themselves, allowing you to update each separately for cleaner diffs and sane programmers.  `baddsert` keeps tracks of the newly-provided data on failures and provides a CLI to update the expected data.

### Use

baddsert replaces your old assert library.  Write your tests as usual, using baddsert as the assert.  Step one is to init the whole shebang:

```typescript
import {baddsert} from 'baddsert';

let docTests = baddsert('docTests');
```

You'll need to init once per file.  Try and make it descriptive of that particular test battery.

Now that everything's all init-ifyed, let's use baddsert:

```typescript
it('runs a superfluous demo test', () => {
  let result = hammertime(`can't touch this`);
  docTests('I am a steg-o-saurus', result);
});
```

The first param describes this particular assertion - what are you testing?

The second is the thing you want asserted.

There's an optional third param that allows you to define your own equality.  Otherwise baddsert will just use `deepStrictEqual` from Node's assert package.

And now, the magic happens.  When you run your tests, baddsert will take the result from the first test and save it under the `badd-baseline` directory (in this case, as the file `docTests`).  Future runs will throw if the value passed in is not `deepStrictEqual` to the original one.

When you inevitably change something that makes the tests fail (because your function is correctly returning a new value) run `baddsert` in the same dir as your `badd-baseline` directory.  This will run through all of your asserts, letting you replace the old data with the data that was passed in during the failing test.

```
--- Checking docTests ---
   I am a steg-o-sarus: AGH THEY DON'T MATCH DOOOOOOOM
Stored result: result
Latest: NEW SWEET DATAS
Should I replace this? [y/n] :
```

### Installation
Install the baddsert cli globally:

```sh
$ npm install -g baddsert
```

Add it as a dev dependency (for npm scripts & such)

```sh
$ npm install --save-dev baddsert
```

When installing as a dev dependency I recommend you add a npm script to your package.json:

```json
{
  "scripts": {
    "baddsert": "baddsert"
  }
}
```

Then you can run baddsert without requiring a global install

```sh
$ npm run baddsert -s
```

Easy as pie.

Further reading on BADD development practices: https://medium.com/@tinganho/baseline-acceptance-driven-development-f39f7010a04#.d1fdg36x0
