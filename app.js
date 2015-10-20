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
    res.render(__dirname + '/client/index.jade');
});

app.get('/client/components/:component/:name', function (req, res) {
    var name = req.params.name;
    var component = req.params.component;
    if (req.params.name.indexOf("view") > -1) {
        res.render(__dirname + '/client/components/' + component + '/' + name);
    } else {
        res.sendFile(__dirname + '/client/components/' + component + '/' + name);
    }
});

// static files
app.use('/libs', express.static(__dirname + '/client/assets/libs'));
app.use('/css', express.static(__dirname + '/client/assets/css'));
app.use('/img', express.static(__dirname + '/client/assets/img'));
app.use('/mdls', express.static(__dirname + '/client/assets/mdls'));
app.use('/client', express.static(__dirname + '/client/'));

app.listen(port);

// expose app
exports = module.exports = app;
