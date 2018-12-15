const express = require('express');
const router = express.Router();
const asyncMiddleware = require("../public/js/asyncMiddleware");
const mongoCollections = require("../config/mongoCollections");
const Users = mongoCollections.users;
const data = require("../data");
const usersData = data.users;
const xss = require("xss");

router.get('/', function(req, res, next){
    if(req.session && req.session.user){
        res.redirect('/account', {title: "My Account Page"});
    } else {
        res.render('music/registration', {title: "Registration Page"});
    }
});

router.post('/', asyncMiddleware(async (req, res, next) => {
    const username = xss(req.body.username),
        firstName = xss(req.body.firstName),
        lastName = xss(req.body.lastName),
        email = xss(req.body.email),
        password = xss(req.body.password);
    // get all users from db
    const allUsers = await Users();
    const newUser = await allUsers.findOne({ username: username });
    if(newUser){
        return res.status(401).render('music/registration', {message: "User Already Exists! Login or choose another Username"});
    }
    await usersData.createNewUser(username, firstName, lastName, email, password);
    res.render('music/regSuccess', {title: "Successful Registration Page"});
}));

module.exports = router;