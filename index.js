const express = require('express'),
	app = express(),
	port = process.env.PORT || 3000;

app.use(express.static("src"));

app.get('/', (req, res) => res.send("hello world"));

app.listen(port);



