
Simple express middleware to take data from an API get request and store in a file in your project.
This node module also allows you to access the data in JSON format.

Methods currently: 
-----------------
- getJSON
- store
- storeByField

To use in Node:

```js
var express = require("express");

var jsonStore = require("req-to-json");

var app = express();

app.get("/", function (request, response) {
  // Store all

  jsonStore.store(url, fileName, function (err, data) {
    if (err) {
      // Do something with the error
    } else {
      // Do something with the data
    }
  });

  // Store by fields --> add specific data fields. E.g. (github --> ['login', 'id'])

  jsonStore.storeByField(url, fileName, fieldsArray, function (err, data) {
    if (err) {
      // Do something with the error
    } else {
      // Do something with the data
      //{
      // "login": "yourlogin",
      // "id": 2343345
      //}
    }
  });

  // Similarly, to use the getJSON method

  jsonStore
    .getJSON(fileName)
    .then(function (response) {
      // Handle success callback
    })
    .catch(function (error) {
      // Handle error callback
    });
});
```

Built by Theodore Anderson
