# baddsert

Framework for baseline acceptance driven development in JavaScript.

General idea: Maintaining tests is hard. With every change you make in your API, all the associated tests fail and need to be updated manually. Automating the process of updating these tests can reduce manual effort and manual errors.

`baddsert` keeps track of failures and allows you to update the expected data without having to update the entire test battery by hand.


### Usage
`baddsert` is designed to in place replace `assert` library. You will first need to create an instance of  `baddsert`. It is recommended that you name it descriptive of your test battery.

```typescript

import {baddsert} from 'baddsert';
let docTests = baddsert('docTests');

```

Once you have the instance we are calling it `docTests` you can then use it as you would use assert. Here the first parameter describes the assertion (What are you testing). The second parameter is the value you want to be asserted.

```typescript
it('runs a superfluous demo test', () => {
  const result = hammertime(`can't touch this`);
  docTests('I am a steg-o-sarus', result);
});
```

Notice there wasn't a comparator or expected value statement, that is because `baddsert` will take the result from the first test and save it under the `badd-baseline` directory (In this case we defined it as the file `docTests`). Future tests will now throw if the second argument is not `deepStrictEqual` to the saved version.

In future when you change your API and the tests fail the tests with the correct value. Run `baddsert` as CLI in your `badd-baseline` directory. This will run through all of your assertions, letting you replace the old data with the data returned in the failing test.

```
--- Checking docTests ---
   I am a steg-o-sarus: AGH THEY DON'T MATCH DOOOOOOOM
Stored result: result
Latest: NEW SWEET DATAS
Should I replace this? [y/n] :
```

### Installation 
You can either install the baddsert cli globally 

```sh
$npm install -g baddsert
```

or by adding it as a dev dependency

```sh
$npm install --save --only=dev baddsert
```

When installing as a dev dependency it is recommended you add this to your npm scripts in your package.json

```json
{
  "scripts": {
    "baddsert": "./node_modules/.bin/baddsert"
  }
}
```

Then you can run baddsert by doing

```sh
$npm run baddsert
```


You can read more about "baseline acceptance driven development" at https://medium.com/@tinganho/baseline-acceptance-driven-development-f39f7010a04#.d1fdg36x0
