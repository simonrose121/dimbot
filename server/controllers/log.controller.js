var log = require('../models/log.schema.js');

module.exports.post = function(req, res) {
	var entry = {
		user_id: req.body.user_id,
		type: req.body.type,
		message: req.body.message
	};

	log.create(entry, function(err, doc) {
		if (err) {
			res.send(err);
		}

		res.status(200).send(doc);
	});
};
