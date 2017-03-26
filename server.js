var express = require('express'); 
var bodyParser = require('body-parser');
var request = require('request');
var peopleDAO = require('./peopleDAO.js');
var resultsDAO = require('./resultsDAO.1.js');
var HttpStatus = require('http-status-codes');
//var _ = require('underscore');

var app = express();
var PORT = 3000;

app.use(bodyParser.json());
//app.use(middleware.requireAuthentication);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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
	console.log(JSON.stringify(req.body));

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
	resultsDAO.getResults().then(function(results){
		res.json(results);
	}, undefined);
});

app.get('/results/:nameId', function(req, res) {
	console.log(req.query.nameId);

	resultsDAO.getResults().then(function(results){

		for(let i=0; i<results.length;i++) {
			if(results[i].name === req.query.nameId) {
				res.json(results[i]);
			}
		}
	}, undefined);
});

app.post('/results', function(req, res) {
	resultsDAO.addResult(req.body).then(function() {

		result = {"result": 1};

		if(result.result === -1) {
			res.status(HttpStatus.BAD_REQUEST).send(result);
		} else {
			res.status(HttpStatus.OK).send(result);
		}
		console.log(JSON.stringify(result));
	});
});

app.get('/tests', function(req, res) {
	res.json([
		'Swim: 200yd', 
		'Swim: 500yd', 
		'Bike: FTP Test', 
		'Run: 2 mile', 
		'Run: 3 mile'
	]);
});

app.listen(PORT, function() {
	console.log('Express server started on port '+ PORT +'!');
});