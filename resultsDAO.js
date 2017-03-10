var request = require('request');
//var rsvp = require('rsvp');
var peopleDAO = require('./peopleDAO');
var Promise = require('promise');

var url = "https://api.myjson.com/bins/1h9v5d"

var options = {
    url: url,
    json: true
};

var clearResults = function() {
	options.method = 'PUT';
	options.json = [];

	request(options, function (error, response, body) {
	    if (!error && response.statusCode === 200) {
	    	console.log('Clearing JSON results.json at '+ options.url); 
	    } else {
	        console.log(error);
	    	callback('Error: '+ error);
	    }
	})
}

//clearResults();

var setPeople = function(json) {
	options.method = 'PUT';
	options.json = json;

	request(options, function (error, response, body) {
	    if (!error && response.statusCode === 200) {
	    	console.log('Uploadeed results.json from '+ options.url); 
	    } else {
	        console.log(error);
	    	callback('Error: '+ error);
	    }
	})
}

/**
If the person doesn't already exist in the file then they are added,
otherwise they are replaced.
**/
var replaceResult = function(json, resultsJson) {
	var people = resultsJson.names;

	/*if (json.hasOwnProperty('name') && !json.hasOwnProperty('id')) {
		console.log('Seeting ID to: '+ getIdFromName(json["name"]));
		json["id"] = getIdFromName(json["name"]);

	}

	for(var i = 0; i<people.length; i++) {
		var person = people[i];

		if(person.name === json.name) {
			//Replaces the person
			console.log('Person found: '+ person.name);
			people[i] = json;
			return;
		}
	}

	//Will add the person to the end of the array
	people.push(json);*/
}

var getResult = function (id, callback) {
	//var json = getR
}

var getResults = function (callback) {
    options.method = 'GET';
    options.json = undefined;

	request(options, function (error, response, body) {
	    if (!error && response.statusCode === 200) {
	        console.log('Retrieved results.json from '+ options.url);
	        callback(JSON.parse(body));
	    } else {
	        console.log(error);
	    }
	}) 
};


var called = 0;

module.exports = {
    getResults: getResults,
    addResult: function(json, callback) {
		validateResult(json).then(function() {
	    	callback({"result": 1, "message": "Complete"});
		}, function() {
			callback({"result": -1, "message": 'Result is not valid. '+ JSON.stringify(json)});
		});
    }
}

var path = require('path');
var scriptName = path.basename(__filename);

console.log('Initiatlising '+ scriptName);


/**
If the person doesn't already exist in the file then they are added,
otherwise they are replaced.
**/
var addResult = function(json, resultsJson) {
	var people = resultsJson.names;
}

var validateResult = function(json) {
	return new Promise(function(fulfill, reject) {
		if (json.hasOwnProperty('nameId')) {
			peopleDAO.getNames(function(names) {
				let matchFound = false;

				for(let i = 0; i<names.length; i++) {
					if (json.nameId === names[i].id) {
						//console.log('Match found');
						matchFound = true;
						fulfill();
					} 
				}

				if(!matchFound) {
					console.log(json.nameId +' doesnt exist as a person. Please add them first');
					reject();
				}
			});
		} else {
			console.log('"nameId" is a required field and should match the id in the person record');
			reject();
		}
	});
}
