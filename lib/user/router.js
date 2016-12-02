const express = require('express');
const HttpStatus = require('http-status-codes');
const userService = require('./service');
const logger = require('bigscreen-logger');

var router = express.Router();

router.post('/', (req, res) => {
	userService.createUserAndRegisterVote(req, res, err => {
		if (err) {
			logger.error(err);

			if (err.name === 'ValidationError' || err.name === 'MongoError') {
				return res.sendStatus(HttpStatus.BAD_REQUEST);
			}

			return res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
		}

		res.sendStatus(HttpStatus.OK);
	});
});

module.exports = router;