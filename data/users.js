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
            profile:    
                {firstName: firstName,
                lastName: lastName,
                email: email,
                favories: null,
                history: null}
            };
            
            let users = await UsersCollection;
            await users.insertOne(newUser);
            return await users.findOne({ _id : newUser._id});
        } catch (err) {
            throw err;
        }
    }

    /*updateUser : async (id, updatedRecipe) => {
        try {
            if(typeof(id) !== 'string') {
                throw TypeError(`${id} is not a valid id!`);
            }
            let setSet = {};
            if(updatedRecipe.title) {
                if(typeof(updatedRecipe.title) !== 'string') {
                    throw TypeError(`${updatedRecipe.title} is not a valid title!`);
                }
                setSet.title = updatedRecipe.title;
            } 
            if(updatedRecipe.ingredients) {
                if(!Array.isArray(updatedRecipe.ingredients)) {
                    throw TypeError(`${updatedRecipe.ingredients} is not a valid array of ingredients!`);
                }
                setSet.ingredients = updatedRecipe.ingredients;
            }
            if(updatedRecipe.steps) {
                if(!Array.isArray(updatedRecipe.steps)) {
                    throw TypeError(`${updatedRecipesteps} is not a valid array of steps!`);
                }
                setSet.steps = updatedRecipe.steps;
            }
            let recipes = await Users();
            await recipes.findOneAndUpdate({_id: id}, { $set: setSet });
            return await recipes.findOne({_id : id});
        } catch(err) {
            throw err;
        }
    },

    deleteUser : async (id) => {
        try {
            if(typeof(id) !== 'string') {
                throw TypeError(`${id} is not a valid id!`);
            }
            let recipes = await Users();
            return await recipes.deleteOne({_id: id});
        } catch(err) {
            throw err;
        }
    }, 
    */
}

module.exports = exportedMethods;