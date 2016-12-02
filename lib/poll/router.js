const express = require('express');
const pollService = require('./service');
const HttpStatus = require('http-status-codes');
const auth = require('../auth/auth');
const logger = require('bigscreen-logger');
const bodyParser = require('body-parser');

var router = express.Router();

router.use(bodyParser.json());

router.post('/:id/vote', (req, res) => {
	var pollName = req.params.id;

	pollService.vote({
		pollName: pollName,
        vote: req.body.vote,
		user: req.body.user
	}, err => {
		if (err) {
			if(err.finished) {
				return res.status(HttpStatus.LOCKED).json(err);
			}

			return res.sendStatus(HttpStatus.BAD_REQUEST);
		}

		res.sendStatus(HttpStatus.OK);
	});
});

router.get('/:parent/active', (req, res) => {
	var parent = req.params.parent;

	pollService.getActiveByParent(parent, (err, polls) => {
		if (err) {
			logger.error(err);
			return res.sendStatus(HttpStatus.BAD_REQUEST);
		}

		if(polls.length === 0) {
			return res.sendStatus(HttpStatus.NOT_FOUND);
		}

		res.redirect('/' + polls[0].name);
	})
});

router.post('/:id/register',
	auth.facebookAuth(),
	(req, res) => {
		if (!req.user) {
			return res.sendStatus(HttpStatus.NOT_FOUND);
		}

		pollService.vote({
			pollName: req.params.id,
			vote: req.body.vote,
			user: req.user
		}, err  => {
			if (err) {
				logger.error(err);
				return res.sendStatus(HttpStatus.BAD_REQUEST);
			}

			res.sendStatus(HttpStatus.OK);
		});
	});

router.get('/:id', (req, res) => {
	pollService.getPoll(req.params.id, (err, data) => {
		if (err) {
			return res.sendStatus(HttpStatus.BAD_REQUEST);
		}

		res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
		res.json(data);
	});
});

module.exports = router;