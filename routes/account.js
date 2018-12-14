const express = require("express");
const router = express.Router();
const data = require("../data");
const accountData = data.account;

router.get("/", async function(req, res, next){
    try{
        if(req.session.id && req.cookies.MusicCookie){
            res.render("music/account", { title: "My Account" });
        }
        else {
            res.render('music/login', { title: "Login Page" });
        }
    }
    catch(e){
        res.status(404).json({ error: e });
    }  
});

router.get("/favorites", async function(req, res, next){
    try{
        /* If user is in session, it gets the favorites list of the user. */
        if(req.session.id && req.cookies.MusicCookie){

            const username = req.session.user.username;
            const favoritesList = await accountData.getAllFavorites(username);
            var songList = [];
            var result = true;

            for(let i = 0; i < favoritesList.length ; i++){
                const songID = favoritesList[i];
                const song = await accountData.getSongList(songID);
                songList.push({song_ID: songID, song_title: song.songTitle, song_albumart: song.albumart});
            }
            if (!songList.length){
                result = false;
            }
            res.render("music/favorites", { title: "Favorites" , result: result, songList: songList }); 
        }
        else {
            res.render('music/login', { title: "Login Page" });
        }
    }
    catch(e){
        res.status(404).json({ error: e });
    }  
});

router.get("/history", async function(req, res, next){
    try{
        /* If user is in session, it gets the search history of the user. */
        if(req.session.id && req.cookies.MusicCookie){

            const username = req.session.user.username;
            const historyList = await accountData.getAllHistory(username);
            var songList = [];
            var result = true;

            for(let i = 0; i < historyList.length ; i++) {
                const songID = historyList[i];
                const song = await accountData.getSongList(songID);
                songList.push({song_ID: songID, song_title: song.songTitle, song_albumart: song.albumart});
            }
            if (!songList.length){
                result = false;
            }
            res.render("music/history", { title: "History", result: result, songList: songList });
        }
        else {
            res.render('music/login', { title: "Login Page" });
       }
    }
    catch(e){
        res.status(404).json({ error: e });
    }  
});

router.get("/user", (req, res) => {
    try{
        /* If user is in session, it will display the user details. */
        if(req.session.id && req.cookies.MusicCookie){
            const userDetails = request.session.user;
            console.log(userDetails);
            res.render('music/userProfile', { title: "User Profile", userDetails: userDetails });
        } else {
            res.render('music/login', { title: "Login Page" });
        }
    }
    catch(e){
        res.status(404).json({ error: e });
    }
});

router.get("/logout", function(req, res){
    try{
        /* Destroying the session and cookie on Logout. */
        if(req.session.id && req.cookies.MusicCookie){
            req.session.destroy();
            res.clearCookie('MusicCookie');
            res.clearCookie('connect.sid');
            //res.send("You've logged out successfully.");
            res.render("music/logout", {title: "Logout Page"} );
        }
    }
    catch(e){
        res.status(404).json({ error: e });
    }  
});

module.exports = router;