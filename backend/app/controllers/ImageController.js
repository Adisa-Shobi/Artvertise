const sharp = require('sharp');
const path = require('path');
const Tools = require('../helpers/tools')
const fs = require('fs');

class ImageController {
    static getImage (req, res) {
	const { imageWidth, imageHeight } = req.body;

	if (!imageWidth || !imageHeight) {
	    res.status(404).json({ error: "Invalid image dimensions" })
	}

	const isDigits = Tools.isDigits(imageWidth) && Tools.isDigits(imageHeight)

	if (!isDigits) {
	    return res.status(404).json({ error: "Image dimensions must be digits" })
	}

	const filePath = path.join(__dirname, 'uploads', req.params.filename);
	console.log(filePath);

	const readStream = fs.createReadStream(filePath);

	readStream.on('error', (err) => {
	    return res.status(404).json({ error: err.message });
	});

	const resized = sharp().resize(
	    parseInt(imageWidth),
	    parseInt(imageHeight)
	);

	return readStream.pipe(resized).pipe(res);
    }
}

module.exports = ImageController;
