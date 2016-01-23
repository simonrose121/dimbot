// Main app entry point

// includes
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

var logController = require('./server/controllers/log.controller.js');

mongoose.connect('mongodb://localhost:27017/dimbot-local');

// config files
var port = process.env.PORT || 8079;

// set view engine
app.set('view engine', 'jade');

// get POST parameter
app.use(bodyParser.json());

// page routes
app.get('/', function(req,res) {
    res.render(__dirname + '/client/index.jade');
});

// returns individual view based on name and component
app.get('/client/components/:component/views/:name', function (req, res) {
    var name = req.params.name;
    var component = req.params.component;
    res.render(__dirname + '/client/components/' + component + '/views/' + name);
});

// static files
app.use('/libs', express.static(__dirname + '/client/assets/libs'));
app.use('/css', express.static(__dirname + '/client/assets/css'));
app.use('/img', express.static(__dirname + '/client/assets/img'));
app.use('/mdls', express.static(__dirname + '/client/assets/mdls'));
app.use('/lvls', express.static(__dirname + '/client/assets/lvls'));
app.use('/client', express.static(__dirname + '/client/'));

// api routes
app.post('/log/instruction', logController.instruction);
app.post('/log/level', logController.level);
app.post('/log/button', logController.button);
app.post('/log/program', logController.program);
app.post('/idcheck/', logController.idExists);

app.listen(port);

// expose app
exports = module.exports = app;
