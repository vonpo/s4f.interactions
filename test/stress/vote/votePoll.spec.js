'use strict';

const expect = require('expect.js');
const oneSecond = 1000;
const oneMinute = 60 * oneSecond;
const fiveMinutes = 5 * oneMinute;
const tenMinutes = 2 * fiveMinutes;
const hour = 6 * tenMinutes;
const voteService = require('./voteService');

describe('poll service tests', () => {
	it('should vote for given option', function (done) {
		this.timeout(hour);
		voteService.simpleVote({
			limit: 2,
			start: 13,
			end: 23
		}, done);
	});

    it('should vote for given option and saveUser', function (done) {
        this.timeout(hour);
        voteService.advancedVote({
            limit: 100,
            start: 50,
            end: 100
        }, done);
    });
});