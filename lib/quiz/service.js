'use strict';

const multer = require('multer');
const fs = require('fs');
let i = 0;

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		let directory = 'uploads/';

		file.videoDirectory = directory;

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
		i++;

		cb(null, i + 'input.png');
	}
});
const upload = multer({storage: storage});


function save(req, res, callback) {
	res.setTimeout(0);
	let uploadVideo = upload.single('picture');

	uploadVideo(req, res, function (err, data) {
		if (err) {
			return callback(err);
		}

		callback(null);
	});
}

exports.save = save;