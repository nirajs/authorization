var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');




// User Schema
var UserSchema = mongoose.Schema({

	email:
	{ type: String,  index: { unique: true }, lowercase: true  },

	name: {
		type: String
	},
  password: {
    type: String
  },
	facebook: {
		id: String,
		token: String,
		email: String,
		name: String
	},
	google: {
		id: String,
		token: String,
		email: String,
		name: String
	}

});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserByemail = function(email, callback){
	var query = {email: email};
	User.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}
