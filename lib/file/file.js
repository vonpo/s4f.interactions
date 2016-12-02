'use strict';

const Download = require('download');
const photoPath = require('config').get('user.storePhotoPath');
const path = require('path');

function getFile(options, callback) {
	var download = new Download({mode: '755'});
	var filePath = path.normalize(photoPath.replace('{{id}}', options.id));

	download
		.get(options.url)
		.rename(file => {
			file.basename = 'profile';
			file.extname = '.png';

			return file;
		})
		.dest(filePath)
		.run(callback);
}

exports.getFile = getFile;