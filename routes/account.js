const express = require("express");
const router = express.Router();
const data = require("../data");
const xss = require("xss");
const accountData = data.account;
const songData = data.songs;

function checkSignIn(req, res, next) {
    if (req.session.id && req.cookies.MusicCookie) {
        res.render("music/account", {
            title: "My Account"
        });
    } else {
        next();
    }
}

router.get("/", checkSignIn, async function (req, res, next) {
    try {
        res.render('music/login', {
            title: "Login Page"
        });
    } catch (e) {
        res.status(404).json({
            error: e
        });
    }
});
/*
router.post("/", async function(req, res, next) {
    try{
        if (req.session.id && req.cookies.MusicCookie){
            const item = xss(req.body.searchItem);
            const field = xss(req.body.specificField);

            let username = xss(req.session.user.username);

            //renders if "All" was selected, no need for item field.
            if (field === "All"){
                let songsList = await songData.getAllSongs();
                var song_id = songsList.song_id;
                await accountData.updateHistory(username, song_id);
                res.json(songsList);
            }
            else if (item && field){
                let songsList = await songData.getSongByField(item.toLowerCase(), field.toLowerCase());
                var song_id = songsList.song_id;
                await accountData.updateHistory(username, song_id);
                res.json(songsList);
            }
        }
    }
    catch (e){
        res.status(404).json({ error: e });
    }
});
*/
router.get("/favorites", async function (req, res, next) {
    try {
        /* If user is in session, it gets the favorites list of the user. */
        if (req.session.id && req.cookies.MusicCookie) {

            const username = xss(req.session.user.username);
            const favoritesList = await accountData.getAllFavorites(username);
            var songList = [];
            var result = true;

            for (let i = 0; i < favoritesList.length; i++) {
                const songID = favoritesList[i];
                const song = await accountData.getSongList(songID);
                songList.push({
                    song_ID: songID,
                    song_title: song.songTitle,
                    song_albumart: song.albumart
                });
            }
            if (!songList.length) {
                result = false;
            }
            res.render("music/favorites", {
                title: "Favorites",
                result: result,
                songList: songList
            });
        } else {
            res.render('music/login', {
                title: "Login Page"
            });
        }
    } catch (e) {
        res.status(404).json({
            error: e
        });
    }
});

router.get("/history", async function (req, res, next) {
    try {
        /* If user is in session, it gets the search history of the user. */
        if (req.session.id && req.cookies.MusicCookie) {

            const username = xss(req.session.user.username);
            const historyList = await accountData.getAllHistory(username);
            var songList = [];
            var result = true;

            for (let i = 0; i < historyList.length; i++) {
                const songID = historyList[i];
                const song = await accountData.getSongList(songID);
                songList.push({
                    song_ID: songID,
                    song_title: song.songTitle,
                    song_albumart: song.albumart
                });
            }
            if (!songList.length) {
                result = false;
            }
            res.render("music/history", {
                title: "History",
                result: result,
                songList: songList
            });
        } else {
            res.render('music/login', {
                title: "Login Page"
            });
        }
    } catch (e) {
        res.status(404).json({
            error: e
        });
    }
});

router.get("/user", (req, res) => {
    try {
        /* If user is in session, it will display the user details. */
        if (req.session.id && req.cookies.MusicCookie) {

            const userDetails = req.session.user;

            res.render('music/userProfile', {
                title: "User Profile",
                userDetails: userDetails
            });
        } else {
            res.render('music/login', {
                title: "Login Page"
            });
        }
    } catch (e) {
        res.status(404).json({
            error: e
        });
    }
});

router.get("/logout", function (req, res) {
    try {
        /* Destroying the session and cookie on Logout. */
        if (req.session.id && req.cookies.MusicCookie) {
            req.session.destroy();
            res.clearCookie('MusicCookie');
            res.clearCookie('connect.sid');

            res.render("music/logout", {
                title: "Logout Page"
            });
        }
    } catch (e) {
        res.status(404).json({
            error: e
        });
    }
});

router.get("/recommendations", async function (req, res, next) {
    try {
        /* If user is in session, it gets the favorites list of the user. */
        if (req.session.id && req.cookies.MusicCookie) {

            const username = req.session.user.username;
            const favoritesList = await accountData.getAllFavorites(username);
            // const historyList = await accountData.getAllHistory(username);
            var songIdList = [];
            var Lgenre = {};
            var Lartist = {};
            var Lrating = {};
            var result = true;
            var genre = []
            for (let i = 0; i < favoritesList.length; i++) {
                const songID = favoritesList[i];
                songIdList.push(songID);
                const song = await accountData.getRawUserData({
                    song_id: songID
                });

                let stitle = song.songTitle;
                //LsearchCount[stitle] = song.searchCount;
                if (Lgenre[song.genre] != null) {
                    Lgenre[song.genre] += 1;
                } else {
                    Lgenre[song.genre] = 1;
                }
                if (Lartist[song.artistid] != null) {
                    Lartist[song.artistid] += 1;
                } else {
                    Lartist[song.artistid] = 1;
                }
                //Lgenre[stitle] = song.genre;
                genre.push(song.genre);
                //Lartist[stitle] = song.artistid;
                Lrating[stitle] = song.reviews;
            }

            var genreScount = {};
            var finalGenre = {};
            var genreL = [];

            if (Object.keys(Lgenre).length > 0) {
                //var mainG = Object.keys(Lgenre).reduce((a, b) => Lgenre[a] > Lgenre[b] ? a : b);
                let x = Object.keys(Lgenre);

                for (let i = 0; i < x.length; i++) {
                    var ListGenre = await accountData.getRawUserData({
                        genre: x[i]
                    });
                    genreScount[ListGenre["id"]] = ListGenre.searchCount;
                }

                // finalGenre = Object.keys(genreScount).map(function (key) {
                //     return [key, genreScount[key]];
                // });

                // finalGenre.sort(function (first, second) {
                //     return second[1] - first[1];
                // });
                // console.log(Object.keys(genreScount));
            } else {
                console.log("genre array empty");
            }

            var artScount = {};
            var finalArt = {};

            if (Object.keys(Lartist).length > 0) {
                let x = Object.keys(Lartist);
                // var mainA = Object.keys(Lartist).reduce((a, b) => Lartist[a] > Lartist[b] ? a : b);
                for (let i = 0; i < x.length; i++) {
                    var ListArt = await accountData.getRawSongData({
                        artist_id: x[i]
                    });
                    artScount[ListArt["id"]] = ListArt.searchCount;
                }

                // finalArt = Object.keys(artScount).map(function (key) {
                //     return [key, artScount[key]];
                // });
                // finalArt.sort(function (first, second) {
                //     return second[1] - first[1];
                // });
                // console.log(Object.keys(artScount));
            } else {
                console.log("artist array empty");
            }
            var songList = [];
            var temp = Object.keys(artScount).concat(Object.keys(genreScount));
            temp = temp.filter(val => !songIdList.includes(val));
            // console.log(temp);
            for (let i = 0; i < temp.length; i++) {
                const songID = temp[i];
                const song = await accountData.getSongList(songID);
                songList.push({
                    song_ID: songID,
                    song_title: song.songTitle,
                    song_albumart: song.albumart
                });
            }
            result = true;
            if (!songList.length) {
                result = false;
            }
            res.render("music/recommendations", {
                title: "Recommendations",
                result: result,
                songList: songList
            });
        } else {
            res.render('music/login', {
                title: "Login Page"
            });
        }
    } catch (e) {
        console.log(e)
        res.status(404).json({
            error: e
        });
    }
});
module.exports = router;