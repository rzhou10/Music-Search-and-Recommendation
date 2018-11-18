const data = require("../data");
const bcrypt = require("bcrypt")
const express = require("express")
const router = express.Router();
const songData = data.songs;

router.get("/", async(req, res) =>{
    //song details here
});

module.exports = router;