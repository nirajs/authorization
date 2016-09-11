// TODO change the reference of localhost to the real server address
// TODO remove this file from github
module.exports = {
    'dbconnect': 'mongodb://localhost/auth',
    'secretKey': 'whatever',
    'facebook': {
        'AppID': 'secret',
        'AppSecret' : 'secrete',
        'callbackURL': 'http://localhost:4000/auth/facebook/callback',
        'profileFields': ['id', 'emails', 'first_name', 'middle_name', 'last_name']
    },
    'google': {
        'clientID': 'secret',
        'clientSecret': 'secret',
        'callbackURL': 'http://localhost:4000/auth/google/callback'
    }
};
