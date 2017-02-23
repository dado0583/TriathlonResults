var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var peopleDAO = require('./peopleDAO.js');
//var _ = require('underscore');

var app = express();
var PORT = 3000;

app.use(bodyParser.json());
//app.use(middleware.requireAuthentication);

console.log('Running in unsafe mode (process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";)');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

app.get('/', function(req, res) {
	res.send('API route');
});

/**** PEOPLE REST URLS ****/

app.get('/people', function(req, res) {
	peopleDAO.getPeople(function(people){
		res.json(people);
	});
});

app.get('/people/names', function(req, res) {
	peopleDAO.getNames(function(names){
		res.json(names);
	});
});

app.post('/people', function(req, res) {
	peopleDAO.addPerson(req.body);
	console.log('Complete');
});

app.listen(PORT, function() {
	console.log('Express server started on port '+ PORT +'!');
});