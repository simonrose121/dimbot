var log = require('../models/log.schema.js');

module.exports.post = function(req, res) {
	var entry = {
		user_id: req.body.user_id,
		type: req.body.type,
		summary: req.body.summary,
		message: req.body.message
	};

	log.create(entry, function(err, doc) {
		if (err) {
			res.send(err);
		}

		res.status(200).send(doc);
	});
};

module.exports.idExists = function(req, res) {
	var user_id = req.body.user_id;

	log.find({user_id: user_id}, function(err, docs) {
		if (err) {
			res.send(err);
		}

		if (docs.length > 0) {
			res.json(true);
		} else {
			res.json(false);
		}
	});
};
