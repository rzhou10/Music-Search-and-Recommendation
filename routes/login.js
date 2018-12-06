const express = require('express');
const router = express.Router();
const asyncMiddleware = require("../public/js/asyncMiddleware");
const mongoCollections = require("../config/mongoCollections");
const Users = mongoCollections.Users;
const bcrypt = require("bcrypt");
const data = require("../data");
const usersData = data.users;

router.get('/', function(req, res){
    if(req.session && req.session.user){
        //console.log(req.session.user);
        //If session exists, proceed to page
        res.render('private', {title: "My Account Page", 
            username: req.session.user.username,
            firstName: req.session.user.profile.firstName,
            lastName: req.session.user.profile.lastName,
            email: req.session.user.profile.email,
            favorites: req.session.user.profile.favorites,
            history: req.session.user.profile.history
        });
    } else {
        res.render('login', {title: "Login Page"});
    }
});

router.get('/private', function(req, res, next){
    if(req.session && req.session.user){
        console.log('req.session', req.session);
        //If session exists, proceed to page
        res.render('private', {username: req.session.user.username,
            firstName: req.session.user.profile.firstName,
            lastName: req.session.user.profile.lastName,
            email: req.session.user.profile.email,
            favorites: req.session.user.profile.favorites,
            history: req.session.user.profile.history
        });
    } else {
        res.status(403).render('forbiddenErrPage');
    }
});

router.get('/registration', function(req, res, next){
    if(req.session && req.session.user){
        res.redirect('/private', {title: "My Account Page"});
    } else {
        res.render('registration', {title: "Registration Page"});
    }
});

router.post('/registration', asyncMiddleware(async (req, res, next) => {
    const username = req.body.username,
        firstName = req.body.firstName,
        lastName = req.body.lastName,
        email = req.body.email,
        password = req.body.password;
    
    // get all users from db
    const allUsers = await Users();
    console.log(allUsers);
    const newUser = await allUsers.findOne({ username: username });
    console.log(newUser);
    if(newUser){
        return res.status(401).render('registration', {message: "User Already Exists! Login or choose another Username"});
    }
    await usersData.createNewUser(username, firstName, lastName, email, password);
    res.render('regSuccess');
}));

router.get('/login', function(req, res, next){
    if(req.session && req.session.user){
        res.redirect('/private', {title: "My Account Page"});
    }else {
        res.render('login', {title: "Login Page"});
    }
});

router.post('/login', asyncMiddleware(async (req, res, next) => {
    const username = req.body.username,
        password = req.body.password;
    // get all users from db
    const allUsers = await Users();
    // check if entered username exists in db 
    const user = await allUsers.findOne({ username: username });
    // if username doesn't exist in the db show error
    if(!user) {
        return res.status(401).render('login', {message: "The username provided is invalid. Please provide a valid username."});;
    }
    // check password
    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    // if entered password doesn't match the one in the db show error
    if(!isMatch) {
        return res.status(401).render('login', {message: "The password provided is invalid. Please enter a valid password."});;
    }
    // sets a cookie with the user's info
    req.session.user = user;
    return res.redirect('private');
}));

router.get('/logout', function (req, res, next) {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
              next(err)
            } else {
              res.clearCookie('AuthCookie')
              res.render('exit')
            }
        })
    }
});

module.exports = router;