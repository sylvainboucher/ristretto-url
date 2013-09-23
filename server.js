//     ristretto-url 0.0.1
//     (c) 2013 Sylvain Boucher
//     ristretto-url may be freely distributed under the MIT license.

var express = require('express'),
    config = require('./config'),
    urls = require('./urls'),
    fs = require('fs');
    mongoose = require('mongoose');

var app = express();

app.configure(function () {
    app.use(express.json());
});

app.configure("development", function() {
    app.use(express.logger('dev'));
    app.use(express.errorHandler({
        dumpException: true,
        showStack: true
    }));
});

app.configure("production", function() {
    var logFile = fs.createWriteStream('./express.log', {flags: 'a'});
    app.use(express.logger({stream: logFile}));
});

app.get('/', function(request, response) {
    response.send(config.appname);
});
app.get('/:hash', urls.redirectToUrl);
app.post('/', urls.addUrl);

mongoose.connect(config.mongodb.uri);
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

app.listen(config.node.port, function() {
    console.log( 'Express server listening on port %d in %s mode', config.node.port, app.settings.env );
});
