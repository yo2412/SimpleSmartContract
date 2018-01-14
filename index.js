const crypto = require('crypto');
const EthConnection = require('./api');
const DBConneection = require('./database');
const flash = require('connect-flash');

const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;
const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
var session = require('express-session');
var bodyParser = require('body-parser')

ethConnection = new EthConnection();
currentRequests = {};

dbConnection = new DBConneection(false);


passport.use(new LocalStrategy({
	  passReqToCallback : true

	}, (req, username, password, done) => {

  		dbConnection.checkPass(req, username, password, done);
	}
));

 passport.serializeUser(function (user, done)
    {
    	console.log("serializing: " + user.username);
        done(null, user.username);
       // console.log(user);
    });

    passport.deserializeUser(function (user, done)
    {
        done(null, user.username);
});

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


app.use(session({
    secret: 'ne maram šole',
    resave: false, 
    saveUninitialized: false
}));

app.set('views', __dirname + '/frontend');

app.get('/login', (req, res) => {
	res.end("sorry");
});

app.get('/wallet', (req, res) => {
	console.log(req.session.passport.user);
	res.end("nice");
});

app.post('/login', 
  passport.authenticate('local', { successRedirect: '/wallet', failureRedirect: '/login', failureFlash: true })
);



// views

app.get('/', function(req, res) {
    sess = req.session;
    if (sess.user) {
        res.redirect('/wallet');
    } else {
        res.render('index.html');
    }
});

app.get('/logout', function(req, res) {
    req.session.destroy(function(err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    })
});


/*
app.get('/wallet', function(req, res) {
    sess = req.session;
    if (sess.user) {
        res.redirect('/wallet');
    } else {
        res.write('<h1>Please login first.</h1>');
        res.end('<a href="+">Login</a>');
    }
});

*/

// API

app.get('/api/deploy', (req, res) => {
    let id = crypto.randomBytes(6).toString('hex');
    res.send(id);
    res.status(201).end();
    currentRequests[id] = null;
    /* query v stilu:

	{
		privateKey: "0x321123adssaddsa",
		contractName: "Zepnina",
		params: {
			"receiver": "0x213213dasda"
		}
	}

	ethConnection.deployContract(req.query.privateKey, req.query.contractName, req.query.params).then(function(res) {
    	currentRequests[id] = res;	
	}); */
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