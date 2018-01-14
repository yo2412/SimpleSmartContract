const Sequelize = require('sequelize');
const sleep = require('sleep');

class DBConnection {
    constructor(mode) {

        this.sequelize = new Sequelize('db', null, null, {
            dialect: 'sqlite',
            storage: 'db.sqlite',
            omitNull: true,
            define: {
                timestamps: false
            }
        });


        this.sequelize.authenticate().then((err) => {
            console.log("connection works");
        }, (err) => {
            console.log("no it doesnt");
        });

        this.Deploy = this.sequelize.define('deploycontracts', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            contract: Sequelize.STRING,
            address: Sequelize.STRING
        });

        this.User = this.sequelize.define('users', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                notNull: true
            },
            username: Sequelize.STRING,
            password: Sequelize.STRING,
            realname: Sequelize.STRING
        });

        this.Deploy.belongsTo(this.User);


        this.sequelize.sync({
            force: mode
        }).then((err) => {
            console.log("it works!")
        });

    }


    checkPass(req, username, password, done) {
        console.log("::::::: " + username + " : " + password);
        this.User.findOne({
            where: {
                "username": username
            }
        }).then(user => {
            if (user === null) {
                done(null, false, { message: 'Incorrect username.' });
            } else {
                if (user.password === password) {

                    console.log("successfully logged in");
                    done(null, user);
                } else {
                    //console.log("is not");
                    done(null, false, { message: 'Incorrect password.' });
                }
            }
        });
    }


    insertUser(uname, pass, rname) {
        this.User.create({
            username: uname,
            password: pass,
            realname: rname
        })
    }

}

if (require.main === module) {
    const dbConnection = new DBConnection(false);
    sleep.sleep(2);
    dbConnection.insertUser("blaz", "pass", "blaz blokar");


}

module.exports = DBConnection;



/*insertUsers(uname, pass, rname) {
        this.User.create({
            username: uname,
            password: pass,
            realname: rname
        }).then(() => User.findOrCreate({
            where: {
                username: 'eva'
            },
            defaults: {
                password: 'hoho'
            }
        })).spread((user) => {
            console.log(user.get({
                plain: true
            }))
            console.log(created)
        });
    }
    //////////////////////////////////// INSERST DEPLOYCONTRACTS ////////////////////////////////////////////////////////////////////////////
    insertDeploy(uname, cont, adr) {
        var maxId = findMaxCont();
        this.Deploy.create({
            id: maxId,
            users: uname,
            contract: cont,
            adress: adr
        }).then(() => this.User.findOrCreate({
            where: {
                id: maxId
            },
            defaults: {
                adress: adr
            }
        })).spread((user) => {
            console.log(user.get({
                plain: true
            }))
            console.log(created)
        });
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////  FIND USER  //////////////////////////////////////////////////////////////////////////////////////
    findUser(uname) {
        this.sequelize.query('SELECT * FROM users WHERE username = ?', {
            raw: true,
            replacements: ['sebita']
        }).then(projects => {
            console.log(projects[0])
        });
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////   FIND CONTRACTS   ///////////////////////////////////////////////////////////////////////////////////////////////////
    findContracts(unames) {
        this.sequelize.query('SELECT * FROM deploycontracts WHERE users = ?', {
            raw: true,
            replacements: [unames]
        }).then(projects => {
            console.log(projects[0])
        });
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////// FIND MAX CONTRACT ///////////////////////////////////////////////////////////////////////////
    findMaxCont() {
        Deploy.max('id').then(max => {
            console.log(max); // this will return 40
            return max;
        });
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////  DELETE USERS  /////////////////////////////////////////////////////////////////////////////////////////////
    deleteUser(uname) {
        User.destroy({
            where: {
                username: uname //this will be your id that you want to delete
            }
        }).then(function(rowDeleted) { // rowDeleted will return number of rows deleted
            if (rowDeleted === 1) {
                console.log('Deleted successfully');
            }
        }, function(err) {
            console.log(err);
        });
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////  DELETE DEPLOY CONTRACTS  ////////////////////////////////////////////////////////////////////////////////////////////////
    deleteContracts(adr) {
        Deploy.destroy({
            where: {
                adress: adr //this will be your id that you want to delete
            }
        }).then(function(rowDeleted) { // rowDeleted will return number of rows deleted
            if (rowDeleted === 1) {
                console.log('Deleted successfully');
            }
        }, function(err) {
            console.log(err);
        });
    }
}
///////////////////////////////////////////  USE FUNCTIONS  ////////////////////////////////////////////////////////////////////////////
//insertDeploy('sebita','Quiero terminar de una vez por todas!!!!', 'gmail.com');
//findUser('sebita');
//findContracts('sebita');
//deleteUser('eva');
//deleteContracts('gmail.com');
/* ORM 

var User = this.sequelize.define('User', {
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////