var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var Config = require('./config/config');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;

// Init App
var app = express();

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Logging system
//app.use(morgan('combine'));


// Routes Locations
var users = require('./routes/user');


// Router Setup
app.use('/', users);

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


// Cros origin for mobile etc.
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// DB Setup
mongoose.connect(Config.dbconnect);
var db = mongoose.connection;

//
app.use(passport.initialize());

// Define routes.
app.get('/login',
  function(req, res) {
    res.render('login', { user: req.user });
  });

  app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

  // the callback after google has authenticated the user
    app.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/profile',
                    failureRedirect : '/',
                    session: false
            }));


  //app.get('/auth/google',  function(req, res) {
  //    res.render('home', { user: req.user });
  //  });



app.set('port', (process.env.PORT || 4000));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+ app.get('port'));
});
