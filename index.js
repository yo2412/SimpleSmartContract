const express = require('express'),
	app = express(),
	port = process.env.PORT || 3000;

app.use(express.static("public"));

app.get('/', (req, res) => res.send("hello world yo"));

app.listen(port, function() {
	console.log("listening on localhost:3000");
});





