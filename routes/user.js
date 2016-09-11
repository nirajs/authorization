var express = require('express');
var router = express.Router();
var User = require('../controllers/user.controller');
var UserDB = require('../models/user');
var debug = require('debug')('signup');
var passportservice = require('../service/passport');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var Config = require('../config/config.js');
var auth = require('../config/auth.js');

// Login
router.get('/', auth.authenticate,  function(req, res) {
    res.send('Hello there You are so authenticated');
});

router.get('/hi', auth.isLoggedIn,  function(req, res) {
    res.send('Hello there You are so authenticated via gmail');
});

router.post('/signup', function(req, res) {

    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;


    var newUser = new UserDB({
      name: name,
      email: email,
      password: password,
    });

    debug('req.body param %s', JSON.stringify(req.body));

    User.createUser(newUser, function(err, user) {
        if (err) {
          res.json({ result: "Failure", message: err });
          return;
        }
        else {
          res.json({result: "Success"}); return;
        }
      });
});

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err)
        }
        if (!user) {
            return res.json({
                message: info.message,
                result: "Failure"
            });
        }

        //if(req.body.category!=user.category)
        //return res.json({ error: 'Valid user invalid category', result: "Failure",category: user });

        valid = 'Y';
        var userdata = {
            name: user.name,
            email: user.email,
            id: user._id,
            isValid: valid

        };

        //TODO delete password workaround
        //user has authenticated correctly thus we create a JWT token
        var token = jwt.sign(userdata, Config.secretKey);
        var decoded = jwt.verify(token, Config.secretKey);
        console.log("decoded :" + JSON.stringify(decoded)); // bar
        user.password = "";
        delete user.email;
        res.json({
            token: token,
            result: "Success",
            user: userdata
        });
        //console.log(res);


    })(req, res, next);
});


module.exports = router;
