var Application = function(args){

	var app = {};
	app.email = args.email;
	app.password = args.password;
	app.confirm = args.confirm;
	app.status = "pending";
	app.message = null;
	
	app.isValid = function(){
		return app.status == "valid";
	};

	app.isInvalid = function(){
		return !isValid();
	};

	app.setInvalid = function(message){
		app.status = "invalid";
		app.message = message;
	};

	app.validate = function(message){
		app.status = "valid";
	};

	return app;

};

module.exports = Application;