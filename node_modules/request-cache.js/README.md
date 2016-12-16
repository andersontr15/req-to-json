request-cache.js
===========

Simple express middleware to cache last 10 requests.
Stores request urls in an object and appends to request property of express.

To use in Node:

```js
var express = require('express');

var requestCache = require('request-cache');

var app = express();

app.use(requestCache);

app.get('/', function(request, response) {
	console.log(request.cache) ==> { '/': 1, '/users': 2 }
});

```

Built by Theodore Anderson