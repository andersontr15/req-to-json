var port = process.env.PORT || 3000;
var express = require('express');
var authorizeHeaders = require('../authorize-headers');
var jwt = require('jsonwebtoken');

process.env.secret = 'test';

var app = express();

var token = jwt.sign({}, process.env.secret, { expiresIn: 3600 })

app.use(function(request, response, next){
	request.headers.authorization = "Bearer " + token;
	next();
})
app.get('/', authorizeHeaders, function(request, response) {
	response.status(200).send('Authorized token');
});

app.listen(port, function() {
	console.log('Listening on port ' + port);
});

module.exports = app;