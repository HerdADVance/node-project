var Registration = require("../lib/registration");

describe("Registration:", function(){
	
	// Happy path
	describe("a valid application", function(){
		var regResult = {};
		before(function(){
			regResult = Registration.applyForMembership({email: "herdadvance@gmail.com", password: "password", confirm: "password"})
		});
		it("is successful", function(){
			regResult.success.should.equal(true);
		});
		it("creates a user", function(){

		});
		it("creates a log entry");
		it("sets the user's status to approved");
		it("offers a welcome message");
	});

	describe("an empty or null e-mail", function(){
		it("is not successful");
		it("tells user tha email is required");
	});

	describe("an empty or null password", function(){
		it("is not successful");
		it("tells user that password is required");

	});

	describe("password and confirm mismatch", function(){
		it("is not successful");
		it("tells user passwords don't match");

	});

	describe("e-mail already exists", function(){
		it("is not successful");
		it("tells user e-mail already exists");

	});

})