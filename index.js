var request = require('request-promise');
var fs = require('fs');

var storeByField = function(url, fileName, fields, callback) {
    if(!url || !fileName || !fields) {
        throw new Error("Please provide a valid url, filename and fields");
    }
    var fields = fields;
    var options = {
        url: url,
        headers: {
            'User-Agent': 'request'
        }
    }
    request(options)
        .then(function(response) {
            var response = JSON.parse(response);
            var filteredData = {};
            var count = 0;
            for(var key in response) {
                if(fields.indexOf(key) > -1)  {
                    count += 1;
                    filteredData[key] = response[key];
                }
            }
            if(count === 0) {
                return callback('No fields match!', null);
            }

            fs.writeFile(fileName, JSON.stringify(filteredData), function(err) {
                if(err) {
                    return callback(err, null)
                }
                return callback(null, filteredData)
            })
        })
        .catch(function(err) {
            return callback(err, null)
        })
}


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
                    return callback(err, null);
                };
                var data = JSON.parse(response);
                return callback(null, data);
            });
        })
        .catch(function(error) {
            return callback(error, null);
        });
};

var getJSON  = function(fileName) {
    if(!fileName || typeof fileName !== 'string') {
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
            if(error.code === 'ENOENT') {
                reject('File does not exist! Please create the file in your directory and try again!');
            };
        };
    });
};

module.exports = {
    store: store,
    getJSON: getJSON,
    storeByField: storeByField
};