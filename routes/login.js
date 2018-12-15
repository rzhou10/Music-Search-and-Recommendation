const express = require('express');
const router = express.Router();
const asyncMiddleware = require("../public/js/asyncMiddleware");
const mongoCollections = require("../config/mongoCollections");
const Users = mongoCollections.users;
const bcrypt = require("bcrypt");
const xss = require("xss");

router.get('/', function(req, res, next){
    if(req.session.id && req.cookies.MusicCookie){
        res.redirect('/account/');
    } else {
        res.render('music/login', {title: "Login Page"});
      }
});

router.post('/', asyncMiddleware(async (req, res, next) => {
    const username = xss(req.body.username),
        password = xss(req.body.password);
    
    const allUsers = await Users();
    
    const user = await allUsers.findOne({ username: username });
    
    if(!user) {
        return res.status(401).render('music/login', {message: "The username provided is invalid. Please provide a valid username."});
    }
    
    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    
    if(!isMatch) {
        return res.status(401).render('music/login', {message: "The password provided is invalid. Please enter a valid password."});
    }
    // sets a cookie with the user's info
    if (user.username === username && isMatch === true) {
        res.cookie('MusicCookie', username);
        req.session.user = user;
        res.redirect('/account/');
    }
}));

module.exports = router;