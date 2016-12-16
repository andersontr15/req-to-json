var app = require('./index.js');
var supertest = require('supertest');

describe("It validates a signed jsonwebtoken", function() {
	it("hits the / route and returns a 200 for a valid token", function() {
		supertest(app)
		.get('/')
		.expect(200)
		.end(function(err, response) {
			if(err) {
				throw err
			}
			console.log(response.status + ":" + response.text);
			done();
		});
	})
});

describe("It invalidates a falsey jsonwebtoken", function() {
	it("hits the / route and returns a 400 for an invalid token", function() {
		supertest(app)
		.get('/')
		.set('Authorization', 'Bearer ' + 12345)
		.expect(400)
		.end(function(err, response) {
			if(err) {
				throw err
			}
			console.log(response.status + ":" + response.text);
			done();
		});
	})
});
