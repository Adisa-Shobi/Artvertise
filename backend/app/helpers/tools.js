const fs = require('fs');

class Tools {
    /**
     *Checke if all the characters in a string are digits
     *
     */
    static isDigits(str) {
	return /^\d+$/.test(str);
    }

    static objPropsInList(obj, list) {
	return Object.keys(obj).every(prop => list.includes(prop));
    }

    static removeImg (dir) {
	if (fs.existsSync(dir)) {
	    // Remove the file
	    fs.unlinkSync(dir, function(err) {
		if (err) {
		    console.error(err);
		} else {
		    console.log('File removed');
		}
	    });
	}
    }
}

module.exports = Tools;
