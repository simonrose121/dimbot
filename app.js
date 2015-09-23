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
    res.render(__dirname + '/client/views/index.jade');
});

// static files
app.use('/js', express.static(__dirname + '/client/js'));
app.use('/libs', express.static(__dirname + '/client/libs'));
app.use('/css', express.static(__dirname + '/client/css'));
app.use('/img', express.static(__dirname + '/client/img'));
app.use('/font', express.static(__dirname + '/client/font'));
app.use('/views', express.static(__dirname + '/client/views'));

app.listen(port);

// expose app
exports = module.exports = app;
