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

    var i;
    for (i = 0; i < reviewsData.length; i++) {
        userid = reviewsData[i].user_id;
        let user = await usersCollection.findOne({ "profile.user_id" : userid});
        reviewsData[i].username = user.username;
    } 

    //console.log(reviewsData[0]);
    return reviewsData;
}

async function getmaxreviewid() {
    const reviewsCollection = await reviews();
    /*return new Promise((resolve, reject) => {
        reviewsCollection.find().sort({review_id:-1}).limit(1) {
          if (err) {
            return reject(err)
          }
          resolve(content)
        });*/
    return new Promise(review => {reviewsCollection.find().sort({review_id:-1}).limit(1)});
  }

async function addReview(song_id, comment, rating, username){
    if (!song_id){
        throw "song_id is needed";
    }

    var async = require('async'),
        mongo = require('mongodb'),
        ObjectID = mongo.ObjectID;

    const reviewsCollection = await reviews();
    var max_review = await reviewsCollection.find().sort({review_id:-1}).limit(1).toArray();
    var max_review_id = 1;
    if (max_review) {
        max_review_id = max_review[0].review_id + 1;
    }

    const usersCollection = await users();
    let user = await usersCollection.findOne({ "username" : username});
    let uid = user.profile.user_id;

    if (uid) {
        await reviewsCollection.insertOne(
            { _id: new ObjectID(), comment:comment, rating: parseInt(rating), user_id:uid, review_id:max_review_id} );

        var ObjectId = require('mongodb').ObjectID;
        const songCollection = await songs();
        await songCollection.updateOne(
            { "_id": new ObjectId(song_id) },
            { $push: { "reviews": max_review_id } }
        );
    }
    return {comment:comment, rating: parseInt(rating), username:username};
}

module.exports = {
    getAllSongs,
    getSongByField,
    getSongByID,
    getSongReviews,
    addReview
}