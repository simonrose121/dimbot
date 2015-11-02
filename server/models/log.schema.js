var mongoose = require('mongoose');

var logSchema = mongoose.Schema({
	type: String,
	message: String,
	timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Log', logSchema);
