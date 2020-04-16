const fs = require('fs');

const fileWriter = (fileNameDir, data, callback) => {
	fs.writeFile(fileNameDir, data, err => {
		if (err) throw err;
	});
};

const fileReader = fileNameDir => {
	fs.readFile(fileNameDir, (err, data) => {
		if (err) return err;
		return (JSON.parse(data.toString()).error.info);
	});
};

module.exports = { fileWriter, fileReader };
