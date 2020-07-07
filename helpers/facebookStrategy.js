const passport = require('passport');
const {Strategy} = require('passport-facebook');
const {FACEBOOK_APP_ID,FACEBOOK_APP_SECRET} = require('../config/configs');

passport.use(new Strategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:5000/auth/facebook/callback",
        profileFields: ['id', 'emails', 'name']
    },
    function(accessToken, refreshToken, profile, cb) {
        // console.log(profile);
        cb(null, profile);
    }
));