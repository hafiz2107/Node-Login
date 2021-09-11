var db= require('../config/connection')
var collection = require('../config/collections');
const { ObjectId } = require('bson');

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
    },
    deleteUser:(userId)=>{
        console.log("Deleting User from database");
        return new Promise((resolve,reject)=>{
           
            db.get().collection(collection.USER).deleteOne({_id:ObjectId(userId)}).then((response)=>{
                console.log(response)
                resolve(response)
            })
        })
    }
}

