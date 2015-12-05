var log = require('../models/log.schema.js');

module.exports.instruction = function(req, res) {
	var entry = {
		user_id: req.body.user_id,
		category: req.body.category,
		type: req.body.type,
		environment: req.body.environment,
		level: req.body.level,
		message: req.body.message
	};

	log.create(entry, function(err, doc) {
		if (err) {
			res.send(err);
		}

		res.status(200).send(doc);
	});
};

module.exports.button = function(req, res) {
	var entry = {
		user_id: req.body.user_id,
		category: req.body.category,
		button: req.body.button,
		environment: req.body.environment,
		level: req.body.level,
		message: req.body.message
	};

	log.create(entry, function(err, doc) {
		if (err) {
			res.send(err);
		}

		res.status(200).send(doc);
	});
};

module.exports.level = function(req, res) {
	var entry = {
		user_id: req.body.user_id,
		category: req.body.category,
		attempts: req.body.attempts,
		time: req.body.time,
		environment: req.body.environment,
		level: req.body.level,
		message: req.body.message
	};

	log.create(entry, function(err, doc) {
		if (err) {
			res.send(err);
		}

		res.status(200).send(doc);
	});
};

module.exports.program = function(req, res) {
	var entry = {
		user_id: req.body.user_id,
		category: req.body.category,
		environment: req.body.environment,
		level: req.body.level,
		data: req.body.data
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
