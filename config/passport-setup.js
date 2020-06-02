const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LinkedinStrategy = require('passport-linkedin-oauth2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const chaves = require('./chaves');
const User = require('../models/login-model');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: process.env.googleClientID,
        clientSecret: process.env.googleClientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // check if user already exists in our own db
        User.findOne({googleId: profile.id}).then((currentUser) => {
            if(currentUser){
                // already have this user
                console.log('user is: ', currentUser);
                done(null, currentUser);
            } else {
                // if not, create user in our db
                new User({
                    googleId: profile.id,
                    username: profile.displayName,
                    thumbnail: profile._json.picture
                }).save().then((newUser) => {
                    console.log('created new user: ', newUser);
                    done(null, newUser);
                });
            }
        });
    }),
);
 
passport.use(
    new LinkedinStrategy({
        // options for linkedin strategy
        clientID: process.env.linkedinClientID,
        clientSecret: process.env.linkedinClientSecret,
        callbackURL: '/auth/linkedin/redirect',
        scope: ['r_emailaddress', 'r_liteprofile'],
        state: true
    }, (accessToken, refreshToken, profile, done) => {
        // check if user already exists in our own db
        User.findOne({linkedinId: profile.id}).then((currentUser) => {
            if(currentUser){
                // already have this user
                console.log('user is: ', currentUser);
                done(null, currentUser); 
            } else {
                // if not, create user in our db
                console.log(profile);
                new User({
                    linkedinId: profile.id,
                    username: profile.displayName,
                    thumbnail: profile.photos[1].value
                }).save().then((newUser) => {
                    console.log('created new user: ', newUser);
                    done(null, newUser);
                });
            }
        }); 
    })
);

passport.use(
    new FacebookStrategy({
        // options for facebook strategy
        clientID: process.env.facebookClientID,
        clientSecret: process.env.facebookClientSecret,
        callbackURL: '/auth/facebook/redirect',
        profileFields: ['id', 'displayName', 'photos', 'email']
    }, (accessToken, refreshToken, profile, done) => {
        // check if user already exists in our own db
        User.findOne({facebookId: profile.id}).then((currentUser) => {
            if(currentUser){
                // already have this user
                console.log('user is: ', currentUser);
                done(null, currentUser);
            } else {
                // if not, create user in our db
                console.log(profile);
                new User({
                    facebookId: profile.id,
                    username: profile.displayName,
                    thumbnail: profile.photos[0].value
                }).save().then((newUser) => {
                    console.log('created new user: ', newUser);
                    done(null, newUser);
                });
            }
        }); 
    })
);
