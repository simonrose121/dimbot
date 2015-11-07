var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');

MongoClient.connect('mongodb://localhost:27017/dimbot', function(err, db) {
	if (err) {
		throw err;
	}

	var data = db.collection('logs');

	var studentCount = 3;

	for (var i = 1; i <= studentCount; i++) {
		var cursor = data.find({'user_id': i});
		console.dir(cursor);
	}
});
