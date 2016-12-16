req-to-json
===========

Simple express middleware to take data from an API get request and store in a file in your project
This node module also allows you to access the data in JSON format.

Methods currently: get and store JSON

To use in Node:

```js
var express = require('express');

var jsonStore = require('req-to-json');

var app = express();


app.get('/', function(request, response) {
	jsonStore.store(url, fileName, function() {
       // Continuation of code execution goes here     
    });
    // Similarly, to use the store method 
    jsonStore.get(url)
        .then(function(response) {
            // Handle success callback
         })
         .catch(function(error) {
             // Handle error callback
         })
         .finally(function() {
             // Handle when request has finished (successful or not)
         })
});
```

Built by Theodore Anderson