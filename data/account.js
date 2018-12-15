const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const songs = mongoCollections.main;
const reviews = mongoCollections.reviews;
const data = require("../data");
const songData = data.songs;

const exportedMethods = {

    async getAllFavorites(username) {
        if (!username) throw "Please provide username.";

        const usersCollection = await users();
        const userDetails = await usersCollection.findOne({
            username: username
        });
        const favoritesList = userDetails.profile.favorites;

        return favoritesList;
    },

    async backProp(item) {
        if (!item) throw "Please provide user id.";
        const usersCollection = await users();
        const song_title_fetch = await usersCollection.findOne({
            profile: {
                history: {
                    $elemMatch: item
                }
            }
        });
        if (song_title_fetch != null) {
            console.log(song_title_fetch)
            return song_title_fetch.title;
        } else
            return false;
    },

    async getRawUserHistory(value) {
        if (!value) throw "Please provide song id.";

        const reviewCollection = await reviews();
        const reviewDetails = await reviewCollection.findOne(value);
        return reviewDetails.rating;
    },

    async getRawUserData(value) {
        if (!value) throw "Please provide song id.";

        const songCollection = await songs();
        const songDetails = await songCollection.findOne(value);
        var song = {};
        song.id = songDetails.song_id;
        song.songTitle = songDetails.title;
        song.albumart = songDetails.albumart;
        song.searchCount = songDetails.searchCount;
        song.artistid = songDetails.artist_id;
        song.genre = songDetails.genre;
        song.reviews = songDetails.reviews;
        return song;
    },

    async getRawSongData(value) {
        if (!value) throw "Please provide song id.";

        const songCollection = await songs();
        const songDetails = await songCollection.findOne(value);
        var song = {};
        song.id = songDetails.song_id;
        song.searchCount = songDetails.searchCount;
        return song;
    },

    async getSongList(id) {
        if (!id) throw "Please provide song id.";

        const songCollection = await songs();
        const songDetails = await songCollection.findOne({
            song_id: id
        });
        var song = {};
        song.songTitle = songDetails.title;
        song.albumart = songDetails.albumart;

        return song;
    },

    async getAllHistory(username) {
        if (!username) throw "Please provide username.";

        const usersCollection = await users();
        const userDetails = await usersCollection.findOne({
            username: username
        });
        const historyList = userDetails.profile.history;

        return historyList;
    },

    async updateHistory(username, song_id) {
        if (!username) throw "Please provide username.";
        if (!song_id) throw "Please search for song first.";

        const usersCollection = await users();
        const userDetails = await usersCollection.findOne({
            username: username
        });
        var historyList = userDetails.profile.history;

        for (var i = 0; i < song_id.length; i++) {
            historyList.push(song_id[i]);
        }

        await usersCollection.update({
            username: username
        }, {
            $set: {
                'profile.history': historyList
            }
        });
        return await this.getAllHistory();
    }
}

module.exports = exportedMethods;