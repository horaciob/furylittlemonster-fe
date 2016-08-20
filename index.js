require('newrelic')
var express = require('express');
var app = express();

var server = app.listen(8080, function () {
    var port = server.address().port;
    console.log('Example app listening at http://localhost:%s', port);
});
