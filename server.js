'use strict';

const express = require('express');
const cassandra = require('cassandra-driver');
const async = require('async');

// Constants
const PORT = 8080;
const CASSANDRA_PORT = process.env['CASSANDRA_PORT'];
const CASSANDRA_PATH = '127.0.0.1';

// App
const app = express();
var client = new cassandra.Client({contactPoints: [CASSANDRA_PATH], protocolOptions: {port: CASSANDRA_PORT}});

client.on('log', function(level, className, message, furtherInfo) {
  console.log('log event: %s -- %s', level, message);
});

app.get('/', function (req, res) {
	client.execute("select * from chat;", {keyspace: 'webchat'}, function (err, result) {
	 res.send('Hello Guys\n' + err + "\n" + result);
	  
	});
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
