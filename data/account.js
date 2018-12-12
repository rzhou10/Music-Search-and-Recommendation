const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const songs = mongoCollections.main;

const exportedMethods = {

    async getAllFavorites(username) {
        if (!username) throw "Please provide user id.";

        const usersCollection = await users();
        const userDetails = await usersCollection.findOne({ username: username });
        const favoritesList = userDetails.profile.favorites;

        return favoritesList;
    },

    async getSongList(id) {
        if (!id) throw "Please provide song id.";

        const songCollection = await songs();
        const songDetails = await songCollection.findOne({ song_id: id });
        var song = {};
        song.songTitle = songDetails.title;
        song.albumart = songDetails.albumart;
        
        return song;
    },

    async getAllHistory(username) {
        if (!username) throw "Please provide user id.";

        const usersCollection = await users();
        const userDetails = await usersCollection.findOne({ username: username });
        const historyList = userDetails.profile.history;

        return historyList;
    },
};

module.exports = exportedMethods;