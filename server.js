var express = require('express'); 
var bodyParser = require('body-parser');
var request = require('request');
var peopleDAO = require('./peopleDAO.js');
var resultsDAO = require('./resultsDAO.js');
var HttpStatus = require('http-status-codes');
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
	console.log(typeof res);

	peopleDAO.addPerson(req.body, (result) => {
		if(result.result === -1) {
			res.status(HttpStatus.BAD_REQUEST).send(result);;
		} else {
			res.status(HttpStatus.OK).send(result);;
		}
		console.log(JSON.stringify(result));
	});
});

/**** RESULTS REST URLS ****/
app.get('/results', function(req, res) {
	resultsDAO.getResults(function(results){
		res.json(results);
	});
});

app.get('/results/:id', function(req, res) {
	/*resultsDAO.getNames(function(names){
		res.json(['David', 'Cesar', 'etc']);
	});*/
});

app.post('/results', function(req, res) {
	resultsDAO.addResult(req.body, function(result) {
		if(result.result === -1) {
			res.status(HttpStatus.BAD_REQUEST).send(result);
		} else {
			res.status(HttpStatus.OK).send(result);
		}
		console.log(JSON.stringify(result));
	});
});


app.listen(PORT, function() {
	console.log('Express server started on port '+ PORT +'!');
});