const express = require('express');
const passport = require('passport');

const { logout } = require('./helpers');


const router = express.Router();

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (user) 
            req.login(user, loginError => res.render('main-menu', {loggedInUsername: user.name, loggedInUserID: user.id, userType: "local"}));
        else 
            next(info);
    })(req, res, next);
});

router.get('/logout', logout);

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback',
    passport.authenticate('kakao', { failureRedirect: '/' }),
    (req, res) => res.render('main-menu', {loggedInUsername: req.user.name})
);

module.exports = router;
