const validator = require('email-validator');
const email = require('../email/email');

function sendNewClientEmail(request, done) {
	if(!request || !validator.validate(request.email)) {
		return done('bad email');
	}

	email.newClientInfo(request, done);
}

exports.sendNewClientEmail = sendNewClientEmail;