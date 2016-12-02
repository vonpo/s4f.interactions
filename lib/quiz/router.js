const express = require('express');
const quizService = require('./service');
const HttpStatus = require('http-status-codes');
const auth = require('../auth/auth');
const logger = require('bigscreen-logger');
var router = express.Router();


router.post('/:id/data', (req, res) => {
	quizService.save(req, res, err  => {
		if (err) {
			logger.error(err);
			return res.sendStatus(HttpStatus.BAD_REQUEST);
		}

		res.sendStatus(HttpStatus.OK);
	});
});

module.exports = router;
