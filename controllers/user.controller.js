var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var User = require('../models/user');

var createUser = function(newUser, callback){
	// Avoiding duplicated regsitration
  console.log("log" + newUser.email);
	var query = {email: newUser.email};
	User.findOne(query,function(err,res){

			if(res) {
        err = "user already exist";
				callback(err,res); return;
			}

			else {
				bcrypt.genSalt(10, function(err, salt) {
				    bcrypt.hash(newUser.password, salt, function(err, hash) {
				        newUser.password = hash;
				        newUser.save(function(err,res){
                  console.log("error is " + err);
                  callback(err,res);
                });
                return;
				    });
				});
			}
	})


}

module.exports = {
  createUser: createUser
}
