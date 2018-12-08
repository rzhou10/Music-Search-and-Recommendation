const express = require('express');
const router = express.Router();
const asyncMiddleware = require("../public/js/asyncMiddleware");
const mongoCollections = require("../config/mongoCollections");
const Users = mongoCollections.users;
const data = require("../data");
const usersData = data.users;

router.get('/', function(req, res, next){
    if(req.session && req.session.user){
        res.redirect('/private', {title: "My Account Page"});
    } else {
        res.render('registration', {title: "Registration Page"});
    }
});

router.post('/', asyncMiddleware(async (req, res, next) => {
    const username = req.body.username,
        firstName = req.body.firstName,
        lastName = req.body.lastName,
        email = req.body.email,
        password = req.body.password;
    console.log(username);
    // get all users from db
    const allUsers = await Users();
    //console.log(allUsers);
    const newUser = await allUsers.findOne({ username: username });
    console.log(newUser);
    if(newUser){
        return res.status(401).render('registration', {message: "User Already Exists! Login or choose another Username"});
    }
    await usersData.createNewUser(username, firstName, lastName, email, password);
    res.render('regSuccess', {title: "Successful Registration Page"});
}));

module.exports = router;