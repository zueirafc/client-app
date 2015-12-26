var express = require('express');
var app = express();
var path = require('path');

// scripts
app.use('/scripts', express.static(__dirname + '/app/resources/bower'));
app.use('/scripts/core', express.static(__dirname + '/app/resources/core'));
app.use('/components', express.static(__dirname + '/app/resources/components'));
app.use('/styles', express.static(__dirname + '/app/resources/css'));
app.use('/vendor', express.static(__dirname + '/app/node_modules'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/app/index.html'));
});

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
