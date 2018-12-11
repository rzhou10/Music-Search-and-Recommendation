const express = require('express');
const router = express.Router();
const asyncMiddleware = require("../public/js/asyncMiddleware");
const mongoCollections = require("../config/mongoCollections");
const Users = mongoCollections.users;
const bcrypt = require("bcrypt");

router.get('/', function(req, res, next){
    if(req.session && req.session.user){
        res.redirect('/account', {title: "My Account Page"});
    }else {
        res.render('music/login', {title: "Login Page"});
    }
});

router.post('/', asyncMiddleware(async (req, res, next) => {
    const username = req.body.username,
        password = req.body.password;
    // get all users from db
    const allUsers = await Users();
    // check if entered username exists in db 
    const user = await allUsers.findOne({ username: username });
    // if username doesn't exist in the db show error
    if(!user) {
        return res.status(401).render('music/login', {message: "The username provided is invalid. Please provide a valid username."});;
    }
    // check password
    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    // if entered password doesn't match the one in the db show error
    if(!isMatch) {
        return res.status(401).render('music/login', {message: "The password provided is invalid. Please enter a valid password."});;
    }
    // sets a cookie with the user's info
    req.session.user = user;
    return res.redirect('/account');
}));

module.exports = router;