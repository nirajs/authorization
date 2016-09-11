var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var UserDB = require('../models/user');
var Config = require('../config/config');

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

passport.use(new FacebookStrategy({
    clientID: Config.facebook.AppID ,
    clientSecret: Config.facebook.AppSecret,
    callbackURL: Config.facebook.callbackUrl
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));



// =========================================================================
// GOOGLE ==================================================================
// =========================================================================
    passport.use(new GoogleStrategy({

        clientID        : Config.google.clientID,
        clientSecret    : Config.google.clientSecret,
        callbackURL     : Config.google.callbackURL,

    },
    function(token, refreshToken, profile, done) {

        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {

            // try to find the user based on their google id
            UserDB.findOne({ 'google.id' : profile.id }, function(err, user) {
                if (err)
                    return done(err);

                if (user) {

                    // if a user is found, log them in
                    return done(null, user);
                } else {
                    // if the user isnt in our database, create a new user
                    //console.log("profile id" + profile.id + "token" + token );
                    var newUser          = new UserDB();

                    // set all of the relevant information
                    newUser.google.id    = profile.id;
                    newUser.google.token = token;
                    newUser.google.name  = profile.displayName;
                    newUser.google.email = profile.emails[0].value; // pull the first email
                    console.log("New user" + JSON.stringify(newUser));
                    // save the user
                    newUser.save(function(err) {
                        if (err)
                            return done(err);
                        return done(null, newUser);
                    });
                    //console.log(profile);
                }
            });
        });

    }));
