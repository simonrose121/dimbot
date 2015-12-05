var mongoose = require('mongoose');

var logSchema = mongoose.Schema({
	user_id: Number,
	category: String,
	type: String,
	environment: String,
	instruction: String,
	level: Number,
	button: String,
	time: String,
	attempts: String,
	data: String,
	message: String,
	timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Log', logSchema);
