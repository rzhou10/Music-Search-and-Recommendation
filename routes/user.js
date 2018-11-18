const data = require("../data");
const bcrypt = require("bcrypt-nodejs");
const express = require("express");
const router = express.Router();
const userData = data.user;

router.get("/", (req, res) => {
    if (req.cookies && req.cookies.AuthCookie){
        //render account here?
        res.render("back");
    }
    else{
        res.render("signin", {layout: false})
    }
})