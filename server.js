var express = require('express');
var app = express();
var path = require('path');

// scripts
app.use('/scripts', express.static(__dirname + '/resources/bower'));
app.use('/styles', express.static(__dirname + '/resources/css'));
app.use('/vendor', express.static(__dirname + '/node_modules'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + 'app/index.html'));
});

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
