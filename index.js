var promise = require('promise');
// dummy funnctions
var httpGet = function (callback) {
    'use strict';
    setTimeout(function () {
        // node style callback(err, response)
        callback(null, 'A message from httpGet');
    }, 1000);
};

var httpGetError = function (callback) {
    'use strict';
    setTimeout(function () {
        callback('Oops! something went wrong', null);
    }, 2000);
};

var httpPost = function (data, callback) {
    'use strict';
    setTimeout(function () {
        callback(null, data);
    }, 2000);
};
//promise.denodeify() can use in the node style callback(err, response)
var getDate = promise.denodeify(httpGet),
    getError = promise.denodeify(httpGetError),
    saveData = promise.denodeify(httpPost);


// Pattern
// promise.then(reslovedCallback, rejectedCallback);
// only 1 callback will fireup in 1 promise, either resolved or rejected

//Example 1 (Promise with fullfilled)
getDate().then(function (value) {
    'use strict';
    // fulfilled
    console.log('Messsage from getDate(): ' + value);
}, function (reason) {
    'use strict';
    //it will fire up, if callback 1st paramter is not null
    console.log(reason);
});
//Example 2 (Promise with rejected)
getError().then(function (value) {
    'use strict';
    console.log(value);
}, function (reason) {
    'use strict';
    console.log('Message from getError(): ' + reason);
});

//Example 3 (Chaining)
getDate().then(function (value) {  // value = 'A message from httpGet'
    'use strict';
    value = 'Promise is awesome'; // modify the value 
    return saveData(value); // return a promise
})
    .then(function (value) {
        'use strict';
        console.log(value); // 'Promise is awesome' 
        return getError();
    })
    .then(function (value) {
        'use strict';
        console.log(value);
    }, function (reason) {
        'use strict';
        console.log(reason + ' again!!'); // 'Oops! something went wrong'
    });
