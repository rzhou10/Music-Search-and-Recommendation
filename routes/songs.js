const data = require("../data");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const songData = data.songs;

router.get("/", async(req, res) =>{
    res.render("music/home");
});

// renders with items searched
router.post("/", async(req, res) =>{
    try{
        const item = req.body.searchItem;
        const field = req.body.specificField;

        //renders of "All" was selected, no need for item field.
        if (field === "All"){
            let songsList = await songData.getAllSongs();
            res.render("music/home", { songsList: songsList });
        }
        else if (item && field){
            let songsList = await songData.getSongByField(item, field);
            res.render("music/home", { songsList: songsList });
        }
    }
    catch (e){
        res.status(404).json({ error: e });
    }
});

module.exports = router;