Example of promises
===================

The code example is using [then/Promise](https://github.com/then/promise)

promise.denodeify can apply to node style callback(err, response)

Pattern
-------
promise.then(reslovedCallback, rejectedCallback);

only 1 callback will fireup in 1 promise, either resolved or rejected

