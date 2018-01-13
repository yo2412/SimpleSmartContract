var s = 'sebita';

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


////////////////////////////////////////////////////////// MODELS ///////////////////////////////////////////////////////////

const Deploy = sequelize.define('deploycontracts', {
  id: { type: Sequelize.INTEGER, primaryKey: true},
  users: Sequelize.STRING,
  contract: Sequelize.STRING,
  adress: Sequelize.STRING
});


const User = sequelize.define('users', {
  username: { type: Sequelize.STRING, primaryKey: true},
  password: Sequelize.STRING,
  realname: Sequelize.STRING
});

///////////////////////////////////////////  USE FUNCTIONS  ////////////////////////////////////////////////////////////////////////////

insertUsers('sebita','hahah','cualquiera');
//insertDeploy('sebita','Quiero terminar de una vez por todas!!!!', 'gmail.com');
//findUser('sebita');
//findContracts('sebita');
//deleteUser('eva');
//deleteContracts('gmail.com');

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
/*
sequelize.query("SELECT * FROM deploycontracts", { type: sequelize.QueryTypes.SELECT }).then( users => {
	console.log(users);
});
*/

//////////////////////////////////// INSERST USERS ////////////////////////////////////////////////////////////////////////////



function insertUsers(uname,pass,rname){
User.create({ username: uname, password: pass, realname: rname })
  .then(() => User.findOrCreate({where: {username: 'eva'}, defaults: {password: 'hoho'}}))
  .spread((user) => {
    console.log(user.get({
      plain: true
    }))
    console.log(created)
  });
}





//////////////////////////////////// INSERST DEPLOYCONTRACTS ////////////////////////////////////////////////////////////////////////////


function insertDeploy(uname,cont,adr){
	var maxId = findMaxCont();
	Deploy.create({ id: maxId, users: uname, contract: cont, adress: adr })
	  .then(() => User.findOrCreate({where: {id: maxId}, defaults: {adress: adr}}))
	  .spread((user) => {
	    console.log(user.get({
	      plain: true
	    }))
	    console.log(created)
	  });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////  FIND USER  //////////////////////////////////////////////////////////////////////////////////////

function findUser(uname){ 
	sequelize.query('SELECT * FROM users WHERE username = ?',{ raw: true, replacements: ['sebita']}).then(projects => {
	    console.log(projects[0])
	  });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////   FIND CONTRACTS   ///////////////////////////////////////////////////////////////////////////////////////////////////

function findContracts(unames){
	sequelize.query('SELECT * FROM deploycontracts WHERE users = ?',{ raw: true, replacements: [unames]}).then(projects => {
	    console.log(projects[0])
	  });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////// FIND MAX CONTRACT ///////////////////////////////////////////////////////////////////////////

function findMaxCont(){
	Deploy.max('id').then(max => {
	  console.log(max);// this will return 40
	  return max;
	});
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////  DELETE USERS  /////////////////////////////////////////////////////////////////////////////////////////////


function deleteUser(uname){
	User.destroy({
	   where: {
	      username: uname //this will be your id that you want to delete
	   }
	}).then(function(rowDeleted){ // rowDeleted will return number of rows deleted
	  if(rowDeleted === 1){
	     console.log('Deleted successfully');
	   }
	}, function(err){
	    console.log(err); 
	});
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////  DELETE DEPLOY CONTRACTS  ////////////////////////////////////////////////////////////////////////////////////////////////

function deleteContracts(adr){
	Deploy.destroy({
	   where: {
	      adress: adr //this will be your id that you want to delete
	   }
	}).then(function(rowDeleted){ // rowDeleted will return number of rows deleted
	  if(rowDeleted === 1){
	     console.log('Deleted successfully');
	   }
	}, function(err){
	    console.log(err); 
	});
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////