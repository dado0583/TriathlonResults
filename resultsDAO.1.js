var request = require('request');
//var rsvp = require('rsvp');
var peopleDAO = require('./peopleDAO');
var Promise = require('promise');
var rp = require('request-promise');

var url = "https://api.myjson.com/bins/1h9v5d"

var options = {
    url: url,
    json: true
};

var called = 0;

module.exports = {
    //getResults: getResults,
    addResult: function(json, callback) {
		validateResult(json, function() {
			options.method = 'GET';
			options.json = undefined;

			request(options, function (error, response, body) {
				if (!error && response.statusCode === 200) {
					console.log('Retrieved results.json from '+ options.url);
					
					var results = JSON.parse(body);

					for(let i=0; i<results.length;i++) {
						if(results[i].name === json.nameId) {
							results[i]['test-results'].push(json['test-result']);
						}

					}
					
					console.log('####AFTER############');
					console.log(JSON.stringify(results, null, 4));
				} else {
					console.log(error);
					reject(error);
				}
			}) 
		}, undefined);
		
    }
}

var path = require('path');
var scriptName = path.basename(__filename);

console.log('Initiatlising '+ scriptName);

var validateResult = function(json, fulfill, reject) {
	if (json.hasOwnProperty('nameId')) {
		peopleDAO.getNames(function(names) {
			let matchFound = false;

			for(let i = 0; i<names.length; i++) {
				if (json.nameId === names[i].id) {
					//console.log('Match found');
					matchFound = true;
					fulfill(json);
				} 
			}

			if(!matchFound) {
				console.log(json.nameId +' doesnt exist as a person. Please add them first');
				reject(json);
			}
		});
	} else {
		console.log('"nameId" is a required field and should match the id in the person record');
		reject();
	}
}



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