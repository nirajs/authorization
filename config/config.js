// TODO change the reference of localhost to the real server address
// TODO remove this file from github
module.exports = {
    'db': 'mongodb://localhost/onda',
    'secretKey': 'whatever',
    'facebook': {
        'AppID': '1807765906116990',
        'AppSecret' : '9b6e517ea36598ac4e98df1e7246eaab',
        'callbackUrl': 'http://localhost:3000/auth/facebook/callback',
        'profileFields': ['id', 'emails', 'first_name', 'middle_name', 'last_name']
    },
    'google': {
        'clientID': '316573529654-6j48e3fon0qhtqd2cl2d840a76cs9i1e.apps.googleusercontent.com',
        'clientSecret': 'WLFwSRuVNZGj8W8Ageg2vYJI',
        'callbackUrl': 'http://localhost:3000/auth/google/callback'
    }
};
