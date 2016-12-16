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
    };
    request(options)
        .then(function(response) {
            fs.writeFile(fileName, response, function(err) {
                if(err) {
                    callback(err, null);
                };
                callback(null, JSON.parse(response));
            });
        })
        .catch(function(error) {
            return error;
        });
};

var getJSON  = function(fileName) {
    if(!fileName) {
       throw new Error("Please provide a valid url");
    }
    return new Promise(function(resolve, reject) {
        try {
            fs.readFile(fileName, 'utf8', function(err, data) {
                if(err) {
                    reject('File does not exist! Please create the file in your directory and try again!');
                }
                else {
                    resolve(JSON.parse(data));
                };
          });
        }
        catch(error) {
            if(err.code === 'ENOENT') {
                reject('File does not exist! Please create the file in your directory and try again!');
            };
        };
    });
};

module.exports = {
    store: store,
    getJSON: getJSON
};