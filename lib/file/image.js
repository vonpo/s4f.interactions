var Jimp = require("jimp");

function createThumbnail(options, callback) {
	console.time('thumbnailRead');
	Jimp.read(options.src, (err, image) => {
		if (err) {
			return callback(err);
		}
		console.timeEnd('thumbnailRead');
		console.time('thumbnailResize');
		image
			.resize(options.width || Jimp.AUTO, options.height || Jimp.AUTO)
			.write(options.dst, (err) => {
				callback(err);
				console.timeEnd('thumbnailResize');
			});
	});

}

exports.createThumbnail = createThumbnail;