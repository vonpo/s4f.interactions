'use strict';

const async = require('async');
const R = require('ramda');
const random = require('random-js')();
const request = require('request');
const expect = require('expect.js');
const oneSecond = 1000;
const oneMinute = 60 * oneSecond;
const hour = 60 * oneMinute;
const server = require('config').get('server');
const SERVER_URL = server.hostname + ':' + server.port;

exports.registerUser = function(limit, done) {
	const pollName = 'zawodnik-meczu';
	const votePath = SERVER_URL + '/api/user';
	var array = R.range(0, limit);

	async.eachLimit(array, 40, (index, callback) => {
		let latency = random.integer(10, 5000);

		var data = {
			email: 'test@wp.pl',
			firstName : 'name',
			lastName: 'lastName',
			pollName: pollName,
			answer : JSON.stringify({
				answer: 'test',
				option: 'bocian_lukasz'
			})
		};

		setTimeout(() => {
			console.time('index start:' + index);
			request.post({
				url: votePath,
				formData: data
			}, err => {
				if (err) {
					return done(err);
				}

				console.timeEnd('index start:' + index);
				callback();
			});
		}, latency);

	}, done);
};

exports.simpleVote = function (options, done) {
	const pollName = 'kto-wygra';
	const votePath = SERVER_URL + '/api/poll/' + pollName + '/vote';
	var array = R.range(0, options.limit);
	async.eachLimit(array, 40, (index, callback) => {
		let option = random.integer(0, 1) ? 'tychy' : 'niepolomice';
		let latency = random.integer(options.start, options.end);

        setTimeout(() => {
			console.time('index start:' + index);
			request.post({
				url: votePath,
				body: {
					vote: {
						option : option
					}
				},
				json: true,
				method: 'POST'
			}, (err, response) => {
				if (err || response.statusCode !== 200) {
					return callback(err || response.statusMessage);
				}

				console.timeEnd('index start:' + index);
				callback();
			});
		}, latency);

	}, done);
};

exports.advancedVote = function (options, done) {
	const pollName = 'zawodnik-meczu';
	const votePath = SERVER_URL + '/api/poll/' + pollName + '/vote';
	var array = R.range(0, options.limit);
	async.eachLimit(array, 40, (index, callback) => {
		let latency = random.integer(options.start, options.end);
		let data = {
			user : {
				email: 'test@wp.pl',
				firstName : 'name',
				lastName: 'lastName'

			},
			vote : {
				answer: 'test',
				option: 'bocian_lukasz'
			}
		};

		setTimeout(() => {
			console.time('index start:' + index);
			request.post({
				url: votePath,
				body: data,
				json: true,
				method: 'POST'
			}, (err, response) => {
				if (err || response.statusCode !== 200) {
					return callback(err || response.statusMessage);
				}

				console.timeEnd('index start:' + index);
				callback();
			});
		}, latency);

	}, done);
};