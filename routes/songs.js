const data = require("../data");
const express = require("express");
const router = express.Router();
const songData = data.songs;
const accountData = data.account;
const xss = require("xss");
var song_id = [];

router.get("/", async(req, res) =>{
    res.render("music/home");
});

// renders with items searched
router.post("/", async(req, res) =>{
    try{
        if (req.session.id && req.cookies.MusicCookie){
       
            const item = xss(req.body.searchItem);
            const field = xss(req.body.specificField);
            let username = xss(req.session.user.username);

            //renders of "All" was selected, no need for item field.
            if (field === "All"){
                let songsList = await songData.getAllSongs();
                for(let item of songsList){
                    song_id.push(item.song_id);
                }
                
                //await accountData.updateHistory(username, song_id);
                res.json(songsList);
            }
            else if (item && field){

                let songsList = await songData.getSongByField(item.toLowerCase(), field.toLowerCase());
                for(let item of songsList){
                    song_id.push(item.song_id);
                }
                
                //await accountData.updateHistory(username, song_id);
                res.json(songsList);
            }
        }
        else {

            const item = xss(req.body.searchItem);
            const field = xss(req.body.specificField);

            //renders of "All" was selected, no need for item field.
            if (field === "All"){
                let songsList = await songData.getAllSongs();
                res.json(songsList);
            }
            else if (item && field){
                let songsList = await songData.getSongByField(item.toLowerCase(), field.toLowerCase());
                res.json(songsList);
            }
        }
    }
    catch (e){
        res.status(404).json({ error: e });
    }
});

module.exports = router;