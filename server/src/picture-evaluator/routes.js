var Promise = require('bluebird');
var Path = require('path');
var Url = require('url');
var Express = require('express');
var Busboy = require('busboy');
var Jimp = require('jimp');

var imageQuality = 80;
/* options (object):
 */
module.exports = function(options) {
	options = Object.assign({}, options);

	var router = Express.Router();

	router.post('/evaluate', function(req, res, next) {
		var busboy = new Busboy({
			headers: req.headers,
			limits: {
				files: 1
			}
		});

		busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
			var fileBuffers = [];
			//console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
			file.on('data', function(data) {
				fileBuffers.push(data);
			});
			file.on('end', function() {
				try {
					var data = Buffer.concat(fileBuffers);
					if(data.length === 0) {
						return res.status(400).send('You must upload an image');
					}
					Jimp.read(data)
					.then(function(image) {
						//read the file, rewrite it as jpeg with fixed quality, report the image size
						if(!image) {
							throw new Error('Failed to read image');
						}
						image.quality(imageQuality);
						return Promise.promisify(image.getBuffer, {context: image})(Jimp.MIME_JPEG);
					}).then(function(buffer) {
						res.status(200).send('' + bytesToWordCount(buffer.length));
					}).catch(function(err) {
						res.status(400).send(err.message);
					});
				}
				catch(err) {
					next(err);
				}
			});
			//file.on('end', function() {
				//console.log('File [' + fieldname + '] Finished');
			//});
		});

		req.pipe(busboy);
	});

	return router;
}

function bytesToWordCount(bytes) {
	var x = bytes + 10000;
	return Math.floor(10*Math.pow(x, 1/2)-100*Math.pow(x, 1/4));
}
