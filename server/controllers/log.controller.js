var logSchema = require('../models/log.schema.js');

module.exports.post = function(req, res) {
	var entry = {
		type: req.body.type,
		message: req.body.message,
		timestamp: Date.now
	};

	console.log(entry);

	logSchema.log.create(entry, function(err, result) {
		if (err) {
			res.send(err);
		}

		console.log(result);
	});
};
