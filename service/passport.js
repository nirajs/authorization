var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var UserDB = require('../models/user');

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function(email, password, done) {
        console.log("email" + email);
        UserDB.getUserByemail(email, function(err, user) {
            if (err) throw err;
            if (!user) {
                return done(null, false, {
                    message: 'Unknown User'
                });
            }

            UserDB.comparePassword(password, user.password, function(err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, {
                        message: 'Invalid password'
                    });
                }
            });
        });
    }));
