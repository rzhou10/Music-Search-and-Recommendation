const mongoCollections = require("../config/mongoCollections");
const Users = mongoCollections.users;
const bcrypt = require("bcrypt");
const saltRounds = 16;
const uuid = require("uuid");

const exportedMethods = {
    createNewUser : async (username, firstName, lastName, email, password) => {
        try{
            let UsersCollection = await Users();
            
            const newUser = {
            _id: uuid.v4(),
            username: username,
            hashedPassword: bcrypt.hashSync(password, saltRounds),
            profile: { 
                first_name: firstName,
                last_name: lastName,
                user_id: uuid.v4(),
                imageUrl: '',
                email: email,
                favorites: [],
                history: []
                }
            };
            
            let users = await UsersCollection;
            await users.insertOne(newUser);
            return await users.findOne({ _id : newUser._id});
        } catch (err) {
            throw err;
        }
    }
}

module.exports = exportedMethods;