const imageService = require('../../../../lib/file/image');
const fs = require('fs');
const path = require('path');
const expect = require('expect.js');

var src = path.resolve(__dirname, './data/original.png');
var dst = path.resolve(__dirname, './data/small.png');

describe('image tests', function () {
	it('should create image with new dimensions', function (done) {
		imageService.createThumbnail({
			src: src,
			width: 40,
			height: 40,
			dst: dst
		}, err => {
			expect(err).to.be(null);

			fs.stat(dst , (err, stats) => {
				if (err) {
					return done(err);
				}

				expect(stats).not.to.be(null);
				return done();
			});
		});
	});

	after(function () {
		fs.unlinkSync(dst);
	});
});