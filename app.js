var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

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


// Cros origin for mobile etc.
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// DB Setup
mongoose.connect('mongodb://localhost/auth');
var db = mongoose.connection;



app.set('port', (process.env.PORT || 4000));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+ app.get('port'));
});
