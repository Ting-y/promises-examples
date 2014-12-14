var promise = require('promise');
// dummy funnctions
var httpGet = function (callback) {
    'use strict';
    setTimeout(function () {
        // node style callback(err, response)
        callback(null, 'The promise is fulfilled');
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


//Example 1 (Promise with fullfilled)
getDate().then(function (value) {
    'use strict';
    // Resolved
    console.log(value);
}, function (reason) {
    'use strict';
    console.log(reason);
});
// OUTPUT:
// The promise is fulfilled



//Example 2 (Promise with rejected)
getError().then(function (value) {
    'use strict';
    console.log(value);
}, function (reason) {
    'use strict';
    console.log(reason);
});
// OUTPUT:
// Oops! something went wrong



//Example 3 (Chaining)
getDate().then(function (value) { 
    'use strict';
    value = 'Promise is awesome'; // modify the value 
    return saveData(value); // return a promise
})
    .then(function (value) {
        'use strict';
        console.log(value); 
        return getError(); // rejectedcallback will fire up
    })
    .then(function (value) {
        'use strict';
        console.log(value);
    }, function (reason) {
        'use strict';
        console.log(reason + ' again!!');
    });
// OUTPUT: 
// Promise is awesome
// Oops! something went wrong again!!
