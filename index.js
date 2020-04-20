const { promiseObj } = require('./httpRequest.js');

promiseObj('')
	.then(res => {
		console.log(res);
	})
	.catch(e => {
		console.log(e);
	});
