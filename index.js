const crypto = require('crypto');
const EthConnection = require('./api');
const express = require('express'),
	app = express(),
	port = process.env.PORT || 3000;

app.use(express.static("frontend"));

ethConnection = new EthConnection();
currentRequests = {};



app.get('/', (req, res) => res.send("hello world"));

app.get('/api/deploy', (req, res) => {
	let id = crypto.randomBytes(6).toString('hex');
	res.send(id);
	res.status(201).end();
	currentRequests[id] = null;

	ethConnection.deployContract("0xca8b218de3ae8cba66fc3fd81d80d9bda9fead4f85d49ae7baa8a9b484da0e1c", "Zepnina", {
		"receiver": "0x874b54a8bd152966d63f706bae1ffeb0411921e5"
	}).then(function(res) {
    	currentRequests[id] = res;	
	});
});

app.get('/api/status/:id', (req, res) => {
	console.log("index.js :: got request with id " + req.params.id);
	if (currentRequests[req.params.id] != null) {
		res.send(currentRequests[req.params.id]);
	} else {
		res.send("null");
	}
	res.status(201).end();
});

app.listen(port, function() {
	console.log("listening on localhost:3000");
});





