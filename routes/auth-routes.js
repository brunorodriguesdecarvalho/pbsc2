const router = require('express').Router();
const passport = require('passport');
 
// auth login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

// auth logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// auth with google+
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    //res.send(req.user._id);
    var userID = req.user._id;
    console.log("userID: ", userID);
    res.redirect('/profile');
    return userID;
});


// auth with linkedin
router.get('/linkedin', passport.authenticate('linkedin'));

// callback route for linkedin to redirect to
// hand control to passport to use code to grab profile info
router.get('/linkedin/redirect', passport.authenticate('linkedin'), (req, res) => {
    //res.send(req.user);
    res.redirect('/profile');
});

// auth with facebook
router.get('/facebook', passport.authenticate('facebook'));

// callback route for facebook to redirect to
// hand control to passport to use code to grab profile info
router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
    //res.send(req.user);
    res.redirect('/profile');
});

module.exports = router;
