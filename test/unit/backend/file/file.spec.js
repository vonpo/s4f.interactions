const fileService = require('../../../../lib/file/file');
const async = require('async');
const photoPath = require('config').get('user.storePhotoPath');
const fs = require('fs');
const path = require('path');

describe('file tests', function () {
	it('should check if file is downloaded and stored', function (done) {
		var image = {
			url: 'http://onehdwallpaper.com/wp-content/uploads/2015/11/Baby-Girl-With-Pink-Rose.jpg',
			id: 'testId'
		};
		this.expectedPath = path.normalize(photoPath.replace('{{id}}', image.id) + '/profile.png');
		async.waterfall([
			fileService.getFile.bind(null, image),
			(files, done)  => {
				fs.stat(this.expectedPath , (err, stats) => {
					if (err) {
						return done(err);
					}

					return done(null, stats);
				});
			}], done);
	});

	after(function () {
		fs.unlinkSync(this.expectedPath);
	});
});