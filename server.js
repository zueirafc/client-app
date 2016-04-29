var express = require('express');
var app = express();
var auth = express();
var admin = express();
var home = express();

var path = require('path');

[admin, auth, app, home].forEach(function(element, index, array){
	element.use('/images', express.static(__dirname + '/app/resources/images'));
	element.use('/scripts', express.static(__dirname + '/app/resources/bower'));
	element.use('/scripts/core', express.static(__dirname + '/app/resources/core'));
	element.use('/components', express.static(__dirname + '/app/resources/components'));
	element.use('/styles', express.static(__dirname + '/app/resources/css'));
	element.use('/vendor', express.static(__dirname + '/app/node_modules'));
});

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/app/masters/app/index.html'));
});

admin.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/app/masters/admin/index.html'));
});

auth.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/app/masters/auth/index.html'));
});

home.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/app/masters/home/index.html'));
});

app.use(['/auth'], auth);
app.use(['/admin'], admin);
app.use(['/home'], home);

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
	console.log('Zueira F.C client app is running on port:', app.get('port'));
});
