const nodemailer = require('nodemailer');
const config = require('config');

function sendMail(options, callback) {
	var email = nodemailer.createTransport(config.get('email.connection'));

	if (config.get('email.skip')) {
		return callback(null);
	}

	email.sendMail(options, callback);
}

function newClientInfo(options, callback) {
	var mailOptions = {
		from: config.get('email.newClientInfo.from'),
		to: config.get('email.newClientInfo.to'),
		subject: config.get('email.newClientInfo.subject')
			.replace('{email}', options.email),
		html: config.get('email.newClientInfo.html')
			.replace('{email}', options.email)
	};

	sendMail(mailOptions, callback);
}

exports.newClientInfo = newClientInfo;