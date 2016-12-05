'use strict';

const expect = require('expect.js');
const oneSecond = 1000;
const oneMinute = 60 * oneSecond;
const fiveMinutes = 5 * oneMinute;
const tenMinutes = 2 * fiveMinutes;
const hour = 6 * tenMinutes;
const voteService = require('./voteService');

describe('poll service tests', () => {
	it('should register user', function (done) {
		this.timeout(hour);
		voteService.registerUser(1, done);
	});
});