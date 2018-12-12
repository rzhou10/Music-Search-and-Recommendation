const express = require("express");
const router = express.Router();
const data = require("../data");
//const songData = data.songs;
const accountData = data.account;
//const asyncMiddleware = require("../public/js/asyncMiddleware");
//const mongoCollections = require("../config/mongoCollections");
//const songs = mongoCollections.main;

/* This is for demo. Work in progress.*/

router.get("/", async function(req, res, next){
    try{
    //    if(req.session && req.session.user){
            res.render("music/account", { title: "My Account" });
       // }
    }
    catch(e){
        res.status(404).json({ error: e });
    }  
});

router.get("/favorites", async function(req, res, next){
    try{
        //if user is in session
        //if(req.session && req.session.user){

            /* Demo with hardcoded user. Gets the favorites list of the user. This user is present in backbone database. */
            const username = "stressedstraus";
            const favoritesList = await accountData.getAllFavorites(username);
            var songList = [];
            var result = true;

            for(i = 0; i < favoritesList.length ; i++){
                const songID = favoritesList[i];
                const song = await accountData.getSongList(songID);
                songList.push({song_ID: songID, song_title: song.songTitle, song_albumart: song.albumart});
            }
            if (!songList.length){
                result = false;
            }
            res.render("music/favorites", { title: "Favorites" , result: result, songList: songList }); 
        //}
        //else {
        //    res.render('music/login', { title: "Login Page" });
       // }
    }
    catch(e){
        res.status(404).json({ error: e });
    }  
});

router.get("/history", async function(req, res, next){
    try{
        //if user is in session
        //if(req.session && req.session.user){

            /* Demo with hardcoded user. Gets the favorites list of the user. This user is not present in backbone database. I registered as new user */
            const username = "jsamuel";
            const historyList = await accountData.getAllHistory(username);
            var songList = [];
            var result = true;

            for(i = 0; i < historyList.length ; i++) {
                const songID = historyList[i];
                const song = await accountData.getSongList(songID);
                songList.push({song_ID: songID, song_title: song.songTitle, song_albumart: song.albumart});
            }
            if (!songList.length){
                result = false;
            }
            res.render("music/history", { title: "History", result: result, songList: songList });
        //}
        //else {
        //    res.render('music/login', { title: "Login Page" });
       // }
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