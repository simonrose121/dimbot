// Main app entry point

// includes
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// config files
var port = process.env.PORT || 8079;

// set view engine
app.set('view engine', 'jade');

// get POST parameter
app.use(bodyParser.json());

// page routes
app.get('/', function(req,res) {
    res.render(__dirname + '/client/components/game/gameView.jade');
});

// static files
app.use('/js', express.static(__dirname + '/client/assets/js'));
app.use('/libs', express.static(__dirname + '/client/assets/libs'));
app.use('/css', express.static(__dirname + '/client/assets/css'));
app.use('/img', express.static(__dirname + '/client/assets/img'));
app.use('/font', express.static(__dirname + '/client/assets/font'));
app.use('/views', express.static(__dirname + '/client/assets/views'));

app.listen(port);

// expose app
exports = module.exports = app;
