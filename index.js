var request = require('request-promise');
var fs = require('fs');

var store = function(url, fileName, callback) {
    if(!url || !fileName) {
        throw new Error("Please provide a valid url & fileName");
    }
    var options = {
        url: url,
        headers: {
            'User-Agent': 'request'
        }
    }
    request(options)
        .then(function(response) {
            fs.writeFile(fileName, response, function(err) {
                if(err) {
                    console.log(err);
                    return err;
                };
                callback();
            });
        })
        .catch(function(error) {
            return error;
        })
        .finally(function() {
            console.log('Request has finished');
        });
};

var get = function(url) {
    if(!url) {
       throw new Error("Please provide a valid url");
    }
    return new Promise(function(resolve, reject) {
        fs.readFile(url, 'utf8', function(err, data) {
            if(err) {
                reject(err);
            }
            resolve(data);
        });
    });
};

module.exports = {
    store: store,
    get: get
};

// Example

// Get json from file
// getJSON('user.json').then(function(response) {
//     console.log(JSON.parse(response));
// }).catch(function(err) {
//     console.log(err);
// })

// Store json in a file
// storeJSON('http://api.github.com/users/andersontr15', 'user.json');