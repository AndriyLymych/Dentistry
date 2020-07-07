const passport = require('passport');
const {Strategy} = require('passport-google-oauth20');
const {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} = require('../config/configs');

passport.use(new Strategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/auth/google/callback",
        // profileFields: ['id', 'emails', 'name']
    },
    function (accessToken, refreshToken, profile, cb) {
        // console.log(profile);
        cb(null, profile);
    }
));