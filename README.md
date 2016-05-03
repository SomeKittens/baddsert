# baddsert

[![Build Status](https://travis-ci.org/SomeKittens/baddsert.svg?branch=master)](https://travis-ci.org/SomeKittens/baddsert) [![npm](https://img.shields.io/npm/v/baddsert.svg?maxAge=2592000)](https://www.npmjs.com/package/baddsert)

---

Framework for baseline acceptance driven development in JavaScript.

It's annoying to maintain tests.  Every time you change an api, all the tests fail and they need to be manually updated.

`baddsert` allows you to keep the data of tests separate from the test themselves, allowing you to update each separately for cleaner diffs and sane programmers.  `baddsert` keeps tracks of the newly-provided data on failures and provides a CLI to update the expected data.

### Use

baddsert replaces your old assert library.  Write your tests as usual, using baddsert as the assert.  Step one is to import the whole shebang:

```typescript
// docTests.js

import {baddsert} from 'baddsert';
```

`baddsert` will group the baselines by the filename of the calling file, so make it descriptive!

Now that everything's all set up, let's use baddsert:

```typescript
it('runs a superfluous demo test', () => {
  let result = hammertime(`can't touch this`);
  baddsert('I am a steg-o-saurus', result);
});
```

The first param describes this particular assertion - what are you testing?

The second is the value you want checked against the stored baseline value.  If there isn't a stored baseline value, you'll need to approve one (see [CLI section](#CLI) below).

There's an optional third param that allows you to define your own equality.  Otherwise baddsert will just use [`deepStrictEqual`](https://nodejs.org/api/assert.html#assert_assert_deepequal_actual_expected_message) from Node's assert package.

And now, the magic happens.  When you run your tests, baddsert will take the result from the first test run and save it under the `.baselines` directory (in this case, as the file `docTests.js`).  Future runs will throw if the value passed in is not `deepStrictEqual` to the original one.

### CLI

When you inevitably change something that makes the tests fail (because your function is correctly returning a new value) run `baddsert` in your root directory.  This will run through all of your asserts, letting you replace the old data with the data that was passed in during the failing test.

The CLI will run `npm test` before cycling through the baselines.  There are three cases:

##### The provided value matched the baseline value

All good, no user input required.

```
--- BADD baselines ---
  - dogfood.js
    ✓ I am a steg-o-sarus
```

##### The provided value did not match

The CLI will allow you to overwrite the baseline value with the new value.

```
--- BADD baselines ---
  - dogfood.js
    X I am a steg-o-sarus: Values don't match
      Reference value: pants: Expected 'pants' to equal 'super duper llama'.
      Latest result: pants: Expected 'pants' to equal 'super llama'.
Should I replace this? [y/n] :
```

##### A value was provided but there was no baseline to compare it to

In order to avoid accidentally using an incorrect value as the baseline, all new values must be approved by the operator.

```
--- BADD baselines ---
  - dogfood.js
    X throw check: No reference value found
      Latest result: pants: Expected 'pants' to equal 'super llama'.
Use this value? [y/n] :
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
