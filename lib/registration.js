var User = require("../models/user");
var Application = require("../models/application");
var assert = require("assert");
var bc = require('bcrypt');
var Log = require('../models/log');

var RegResult = function(){

	var result = {
		success: false,
		message: null,
		user: null
	}

	return result;
};

var Registration = function(db){
	var self = this;

	var validateInputs = function(app){
		//make sure there's email and password
		if(!app.email || !app.password){
			app.setInvalid("E-mail and password are required");
		}
		else if(app.password !== app.confirm){
			app.setInvalid("Passwords don't match")
		}
		else{
			app.validate();
		}
	};


	var checkIfUserExists = function(app, next){
		db.users.exists({email: app.email}, next);
	};

	var saveUser = function(user, next){
		db.users.save(user,next);
	};

	var addLogEntry = function(next){
		var log = new Log({
			subject: "Registration",
			userId: user.id,
			entry: "Successfully Registered"
		}, next);
	};

	self.applyForMembership = function(args, next){
		var regResult = new RegResult();
		var app = new Application(args);

		// validate inputs
		validateInputs(app);

		checkIfUserExists(app, function(err, exists){
			assert.ok(err === null, err);
			if(!exists){
				// create a new user
				var user = new User(app);

				// hash the password
				user.hashedPassword = bc.hashSync(app.password, "$2a$10$somethingheretobeasalt");

				// save the user
				saveUser(user, function(err, newUser){
					assert.ok(err === null, err);
					regResult.user = newUser;

					// create a log entry
					addLogEntry(newUser, function(err, newLog){
						regResult.log = newLog;
						regResult.success = true;
						regResult.message = "Welcome!";
						next(null, regResult);
					});
				});
			}
		});

		// validate password and e-mail
		// check to see if e-mail exists
		
		// hash the new password
		// create a log entry
	};

	return self;
};

module.exports = Registration;
