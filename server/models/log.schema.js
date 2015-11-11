var mongoose = require('mongoose');

var logSchema = mongoose.Schema({
	user_id: Number,
	type: String,
	message: String,
	summary: String,
	timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Log', logSchema);
