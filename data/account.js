const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const songs = mongoCollections.main;
const data = require("../data");
const songData = data.songs;

const exportedMethods = {

    async getAllFavorites(username) {
        if (!username) throw "Please provide username.";

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
        if (!username) throw "Please provide username.";

        const usersCollection = await users();
        const userDetails = await usersCollection.findOne({ username: username });
        const historyList = userDetails.profile.history;

        return historyList;
    },

    async updateHistory(username, song_id) {
        if (!username) throw "Please provide username.";
        if (!song_id) throw "Please search for song first.";
    
        const usersCollection = await users();
        const userDetails = await usersCollection.findOne({ username: username });
        var historyList = userDetails.profile.history;
        
        for (var i = 0; i < song_id.length; i++){
            historyList.push(song_id[i]);
        }
    
        await usersCollection.update({ username: username }, { $set: { 'profile.history': historyList }});
        return await this.getAllHistory();
    }
}

module.exports = exportedMethods;