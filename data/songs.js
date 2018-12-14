const mongoCollections = require("../config/mongoCollections");
const songs = mongoCollections.main;
const reviews = mongoCollections.reviews;
const users = mongoCollections.users;
const uuid = require("uuid");

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
    var regex = new RegExp([item].join(""), "i");
    const songCollection = await songs();
    const list = await songCollection.aggregate([{$match: {[field] : regex}}]).toArray();

    return list;
}

async function getSongByID(id){
    if (!id){
        throw "item is needed";
    }
    var ObjectId = require('mongodb').ObjectID;
    const songCollection = await songs();
    const song = await songCollection.findOne({"_id": new ObjectId(id)});
    
    return song;
}

async function getSongReviews(id){
    if (!id){
        throw "id is needed";
    }
    var ObjectId = require('mongodb').ObjectID;
    const songCollection = await songs();
    const reviewsCollection = await reviews();
    const usersCollection = await users();

    const song = await songCollection.findOne({"_id": new ObjectId(id)});
    var reviewIDs = song.reviews;

    
    var reviewsData = await reviewsCollection.find( { review_id : { $in : reviewIDs } } ).toArray();

    console.log(reviewsData[0]);
    return reviewsData;
}

async function addReview(song_id, comment, rating, user_id){
    if (!song_id){
        throw "item is needed";
    }

    var ObjectId = require('mongodb').ObjectID;
    const songCollection = await songs();
    const reviewsCollection = await reviews();
    const usersCollection = await users();

    var max_review = await reviewsCollection.find().sort({review_id:-1}).limit(1);
    var max_review_id = max_review.review_id;
    const review = await reviewsCollection.insertOne(
        { _id: uuid.v4(), comment:comment, rating: parseFloat(rating), user_id:user_id, review_id:4444} );
    return {comment:comment, rating: parseFloat(rating), user_id:user_id};
}

module.exports = {
    getAllSongs,
    getSongByField,
    getSongByID,
    getSongReviews,
    addReview
}