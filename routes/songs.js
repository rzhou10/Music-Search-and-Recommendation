const data = require("../data");
const bcrypt = require("bcrypt")
const express = require("express")
const router = express.Router();
const songData = data.songs;

router.get("/", async(req, res) =>{
    res.render("home", {layout: false});
});

//renders with items searched
//only link to this if items are searched, might crash otherwise
router.post("/home", async(req, res) =>{
    const item = req.body.searchItem;
    const field = req.body.specificField;
    let songsList;
    if (field == "All" && item == "All"){
        songsList = await songData.getAllSongs();
    }
    else{
        songsList = await songData.getSongByField(item, field);
    }

    res.render("home", { songsList: songsList });
});

module.exports = router;