const express = require("express");
const router = express.Router();
const data = require("../data");
const songData = data.songs;

router.get("/:id", async function(req, res, next){
    console.log("id = " + req.params.id);
    var objID = req.params.id;
    try{
        const songDetails = await songData.getSongByID(objID);
        var albumart = songDetails.albumart;
        if (!albumart || albumart.length < 5) {
            albumart = "https://media2.fishtank.my/app_themes/raaga/assets/images/default-album-art.png";
        }

        reviews = songDetails.reviews;

        if (reviews && reviews.length > 0) {
            
        }

        res.render("music/songdetails", { title: songDetails.title, imgsrc: albumart, artist: songDetails.artist,
                                        genre: songDetails.genre, searchCount: songDetails.searchCount,
                                        lyrics: songDetails.lyrics });


        if(req.session.id && req.cookies.MusicCookie){
            
        }
    }
    catch(e){
        res.status(404).json({ error: e });
    }  
});

router.post("/getReviews", async(req, res) =>{
    try{
        const _id = req.body._id;

        let reviewList = await songData.getSongReviews(_id);
        res.json(reviewList);
    }
    catch (e){
        res.status(404).json({ error: e });
    }
});

router.post("/addReview", async(req, res) =>{
    try{
        const song_id = req.body.song_id;
        const comment = req.body.comment;
        const rating = req.body.rating;
        const user_id = req.body.user_id;
        
        let review = await songData.addReview(song_id, comment, rating, user_id);
        res.json(review);
    }
    catch (e){
        res.status(404).json({ error: e });
    }
});

module.exports = router;