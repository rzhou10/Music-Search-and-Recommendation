# Music Search and Recommendation System

A music search and recommendation system to help find relevant items and personalize content based on personal preferences. Final project for CS 546 Web Programming I.

The website allows you to search songs based on certain fields, such as lyrics, genre, title, etc. While the search is allowed for non users, in order to save your search, and add to your personal collection, you need to have an account. From there, songs will be recommended to you based on your searches, and you can leave reviews to rate the songs.

**Team Members**:

Anastasia Fasolia

Tulsi Patel

Bhumika Patoliya

Ravi Rathore

Renjie Zhou

# Running and Installation

1. Clone/download this repository
2. Install all dependencies (make sure you have mongodb and node.js)
3. Run with `npm start`.
4. Extract backbone.zip to a particular path and then use this command to seed in the data into your mongoDB, 
  `mongorestore -d backbone dbpath`. where dbpath is the path to the folder where the bson files are located.
5. Go to localhost:3000 to view the website.
6. For the testing purposed, use the username: tulsip and password: darknight Or you can create one for yourself.
