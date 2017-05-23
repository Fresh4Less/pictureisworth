var Promise = require('bluebird');
Promise.longStackTraces();

var http = require('http');
var path = require('path');

var express = require('express');
var bodyParser = require('body-parser');
var compress = require('compression');

var routes = require('./routes');
var logger = require('./util/logger');

var app;
var server;
var isProduction;

function start(options) {
	options = Object.assign({}, options);

	isProduction = process.env.NODE_ENV === 'production';
	
	var loggerName = 'logger';

	if(options.port === undefined) {
		options.port = '8080';
	}
	if(options.logLevel === undefined) {
		options.logLevel = 'info';
	}

	console.log(JSON.stringify(options));

	app = express();
	server = http.Server(app);

	app.use(compress());
	app.use(bodyParser.json());

	app.use(logger({name: 'pictureisworth', reqName: loggerName, level: options.logLevel}));
	app.use(express.static(path.join(__dirname, '../../client')));
	app.use(routes({loggerName: loggerName}));

	server.listen(options.port);
	console.log('Listening on port ' + options.port);
}

function close() {
	if(server) {
		server.close();
		app = null;
		server = null;
	}
}

module.exports = {
	start: start,
	close: close
};
