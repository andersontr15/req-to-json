var express = require('express');
var jsonStore = require('../index');
var app = express();

app.get('/', function(request, response) {
    jsonStore.store('https://api.github.com/users/andersontr15', 'user.json', function(err, data) {
        if(err) {
            return response.status(400).send(err);
        }
        return response.status(200).send(data);
    });
});

app.get('/getData', function(request, response) {
    jsonStore.getJSON('user.json')
             .then(function(data) {
                 return response.status(200).send(data);
             })
             .catch(function(error) {
                 return response.status(400).send(error);
             });
});

app.listen(8080, function() {
    console.log('Listening on port 8080');
});