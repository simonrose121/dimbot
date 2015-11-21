var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');

MongoClient.connect('mongodb://localhost:27017/dimbot', function(err, db) {
	if (err) {
		throw err;
	}

	// capture id from command arguments
	var args = process.argv.slice(2);
	var id = parseInt(args[0]);
	var type = args[1];

	// capture collection
	var data = db.collection('logs');

	// get cursor
	var cursor = data.find({"user_id": id});

	cursor.each(function(err, doc) {
		if (err) {
			throw err;
		}

		if (doc === null) {
			return db.close();
		} else {
			if (type === 'json') {
				console.dir(doc);
			} else if (type == 'text') {
				// output each activity
				if (doc.type != 'screenshot') {
					console.dir(doc.timestamp + ', ' + doc.type + ', ' + doc.message);
				}
			}
		}
	});
});
