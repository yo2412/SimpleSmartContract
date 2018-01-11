const Sequelize = require('sequelize');

const sequelize = new Sequelize('db', null, null, {
  dialect: 'sqlite',
  storage: 'db.sqlite'
});


sequelize.authenticate().then( (err) => {
	console.log("connection works");
}, (err) => {
	console.log("no it doesnt");
});


/* ORM 

var User = sequelize.define('User', {
	username: Sequelize.STRING,
	password: Sequelize.STRING,
	fullname: Sequelize.STRING
});

sequelize.sync({ force: true }).then( (err) => { console.log("it works!") });


sequelize.findAll(...)

*/ 


/* Raw */

sequelize.query("SELECT * FROM users", { type: sequelize.QueryTypes.SELECT }).then( users => {
	console.log(users);
});
