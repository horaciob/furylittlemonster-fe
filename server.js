var express = require('express');
var path = require('path');

var app = express();
var publicPath = path.resolve(__dirname, 'public');
// We point to our static assets
var port=8080;

app.use(express.static(publicPath));

app.get('/ping', function(req, res) {
    res.send('pong');
});

app.listen(port, function () {
  console.log('Server running on port ' + port);
});
