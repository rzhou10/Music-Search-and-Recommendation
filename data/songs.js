const mongoCollections = require("../config/mongoCollections");
const songs = mongoCollections.main;

async function getAllSongs() {
    const songCollection = await songs();
    return await songCollection.find({}).toArray();
}

async function getSongByField(item, field){
    if (!item){
        throw "item is needed";
    }
    if (!field){
        throw "field is needed";
    }
    const songCollection = await songs();
    const list = await songCollection.find({field: item}).toArray();

    return list;
}

module.exports = {
    getAllSongs,
    getSongByField
}