var mongoose = require('mongoose');

var logSchema = mongoose.Schema({
	type: String,
	message: String,
	timestamp: Date
});

module.exports.log = mongoose.model('Log', logSchema);
