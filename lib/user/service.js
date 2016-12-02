'use strict';

const generateId = require('bigscreen-db').generateId;
const db = require('../db/db');
const User = db.Schema.User;
const async = require('async');
const fileService = require('../file/file');
const logger = require('bigscreen-logger');
const photoPath = require('config').get('user.storePhotoPath');
const imageSize = require('config').get('user.imageSize');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const imageService = require('../file/image');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		var directory = path.normalize(photoPath.replace('{{id}}', req._userId));

		fs.exists(directory, (exists) => {
			if (exists) {
				cb(null, directory);
				return;
			}

			fs.mkdir(directory, (err) => {
				if (err) {
					cb(err);
					return;
				}

				cb(null, directory);
			});
		});

	},
	filename: function (req, file, cb) {
		cb(null, 'original.png');
	}
});
const upload = multer({storage: storage});

function registerFacebookUser(data, callback) {
	data.email = data.emails[0].value;

	if (!data.email) {
		return callback('invalid email');
	}

	var user = {
		_id: generateId(),
		creation: new Date(),
		firstName: data.first_name || data.name.givenName,
		lastName: data.last_name || data.name.familyName,
		email: data.email,
		pictureOriginal: data.picture,
		role: ['registered']
	};

	var userSchema = new User(user);

	userSchema.save(callback);
	getUserImage(user, () => {
	});
}

function findOneOrCreate(profile, callback) {
	try {
		profile.email = profile.emails[0].value;
		profile.picture = profile.photos.length ? profile.photos[0].value : null;
	} catch (e) {
		logger.error('wrong facebook data', e);
		return callback('wrong facebook data');
	}

	async.waterfall([
		User.findOne.bind(User, ({email: profile.email})),
		(user, callback) => {
			if (user) {
				return callback(null, user);
			}

			registerFacebookUser(profile, callback);
		}
	], callback);
}

function getUserImage(user, callback) {
	if (!user) {
		return callback({message: 'user not found'});
	}

	fileService.getFile({
		url: user.pictureOriginal,
		id: user._id
	}, err => {
		if (err) {
			logger.error(err);
			return callback(err);
		}

		callback();
	});
}

function saveFile(req, res, callback) {
	res.setTimeout(0);
	let uploadVideo = upload.single('picture');

	uploadVideo(req, res, err => {
		if (err || !req.body) {
			return callback(err || 'bad request');
		}

		req.body._id = req._userId;
		callback(null, req.body);
	});
}

function registerUser(userData, callback) {
	userData.creation = new Date();
	//userData.password = crypto
	//	.createHash("md5")
	//	.update(userData.password)
	//	.digest('hex');

	var user = new User(userData);

	user.save(callback);
}

function getOrRegisterUser(userData, callback) {
	User.findOne({email: userData.email}, (err, user) => {
		if (err) {
			return callback(err);
		}

		if (user) {
			return callback(null, user, 'created');
		}

		registerUser(userData, callback);
	});
}

function createThumbnail(user, callback) {
	var src = path.join(path.normalize(photoPath.replace('{{id}}', user._id)), 'original.png');
	var dst = path.join(path.normalize(photoPath.replace('{{id}}', user._id)), 'profile.png');

	imageService.createThumbnail({
		src: src,
		dst: dst,
		width: imageSize,
		height: imageSize
	}, err => {
		if (err) {
			return callback(err);
		}

		callback(null, user);
	});
}

function parseAnswer(answer) {
	var parsed;
	try{
		parsed = JSON.parse(answer);
	}
	catch(err) {
		logger.error('Trying to parse ressonse', err);
	}

	return parsed || answer;
}

exports.getUserImage = getUserImage;
exports.findOneOrCreate = findOneOrCreate;
exports.getOrRegisterUser = getOrRegisterUser;