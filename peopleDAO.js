var request = require('request');
var people = [{'name':'name'}];

var url = "https://api.myjson.com/bins//1ap3x9"

let options = {
    url: url,
    json: true
};

var clearPeople = function() {
	options.method = 'PUT';
	options.json = [];

	request(options, function (error, response, body) {
	    if (!error && response.statusCode === 200) {
	    	console.log('Clearing JSON people.json at '+ options.url); 
	    } else {
	        console.log(error);
	    	callback('Error: '+ error);
	    }
	})
}

var setPeople = function(json) {
	options.method = 'PUT';
	options.json = json;

	request(options, function (error, response, body) {
	    if (!error && response.statusCode === 200) {
	    	console.log('Uploadeed people.json from '+ options.url); 
	    } else {
	        console.log(error);
	    	callback('Error: '+ error);
	    }
	})
}

var validatePerson = function(json) {
	console.log(json);

	if (json.hasOwnProperty('name')) {
		console.log(json['name']);
		return true;
	} else {
		console.log('"name" is a required field');
		return false;
	}
}

/**
If the person doesn't already exist in the file then they are added,
otherwise they are replaced.
**/
var replacePerson = function(json, peopleJson) {
	for(var i = 0; i<peopleJson.length; i++) {
		let person = peopleJson[i];

		if(person.name === json.name) {
			//Replaces the person
			console.log('Person found: '+ person.name);
			peopleJson[i] = json;
			return;
		}
	}

	//Will add the person to the end of the array
	peopleJson.push(json);
}

var getPeople = function (callback) {
	    options.method = 'GET';
	    options.json = undefined;

		request(options, function (error, response, body) {
		    if (!error && response.statusCode === 200) {
		        console.log('Retrieved people.json from '+ options.url);
		        callback(JSON.parse(body));
		    } else {
		        console.log(error);
		    }
		}) 
	};

module.exports = {
    getPeople: getPeople,
    addPerson: function(json) {
    	if (validatePerson(json)) {
    		replacePerson(json, people);

	    	//people.push(json);
	    	setPeople(people);
    	} else {
    		console.log('Person is not valid. '+ JSON.stringify(json));
    	}
    },
    getNames: function (callback) {
	    getPeople(function(json) {
	    	let names = [];

	    	for (var i=0; i<json.length; i++) {
  				names.push(json[i].name);
			}

			callback(names)
	    });
	}
}

var path = require('path');
var scriptName = path.basename(__filename);

console.log('Initiatlising '+ scriptName);

module.exports.getPeople(function(resp) {
	people = resp;
	console.log('Contents of people:  '+ JSON.stringify(people));
});