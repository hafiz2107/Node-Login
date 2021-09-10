var db= require('../config/connection')
var collection = require('../config/collections')

module.exports = {

    addUser:(user,callback)=>{
        console.log(user);

        db.get().collection(collection.USER).insertOne(user).then((data)=>{
            callback(data);
        })
    },

    // function to get all users from the Database
    getAllUsers:()=>{
        return new Promise(async(resolve,reject)=>{
            let user=await db.get().collection(collection.USER).find().toArray()

            resolve(user)
        })
    }
}