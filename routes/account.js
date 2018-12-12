const express = require("express");
const router = express.Router();

/* This is for demo. Work in progress.*/

router.get("/", async function(req, res, next){
    try{
        // check user is logged in or not
        res.render("music/account", {title: "My Account"});
    }
    catch(e){
        res.status(404).json({ error: e });
    }  
});

router.get("/favorites", async function(req, res, next){
    try{
        // check user is logged in or not
        res.render("music/favorites", {title: "Favorites"});
    }
    catch(e){
        res.status(404).json({ error: e });
    }  
});

router.get("/history", async function(req, res, next){
    try{
        // check user is logged in or not
        res.render("music/history", {title: "History"});
    }
    catch(e){
        res.status(404).json({ error: e });
    }  
});

router.get("/logout", async function(req, res, next){
    try{
        //destroy session and cookie
         res.render("music/logout", {title: "Logout Page"} );
    }
    catch(e){
        res.status(404).json({ error: e });
    }  
});

module.exports = router;
