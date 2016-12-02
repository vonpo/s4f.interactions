const express = require('express');
const HttpStatus = require('http-status-codes');
const service = require('./service');
const logger = require('bigscreen-logger');
const bodyParser = require('body-parser');

var router = express.Router();

router.use(bodyParser.json());

router.post('/', (req, res) => {
	service.sendNewClientEmail(req.body, err => {
		if(err) {
			logger.error('error sending email', err);
			return 	res.sendStatus(HttpStatus.BAD_REQUEST);
		}
		logger.info('new client', req.body);
		res.sendStatus(HttpStatus.OK);
	});
});

module.exports = router;