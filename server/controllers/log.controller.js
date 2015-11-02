var log = require('../models/log.schema.js');

module.exports.post = function(req, res) {
	var entry = {
		type: req.body.type,
		message: req.body.message
	};

	console.log(entry);

	log.create(entry, function(err, doc) {
		if (err) {
			res.send(err);
		}

		res.send(doc);
	});
};
