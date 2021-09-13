var db= require('../config/connection')
var collection = require('../config/collections');
var bcrypt = require('bcrypt')
var objectId = require('mongodb').ObjectId
const { ObjectId } = require('bson');

module.exports = {

    addUser:(user)=>{
 
        return new Promise(async(resolve,reject)=>{
            var allDatas =await db.get().collection(collection.USER).findOne({name:user.name}) 

            // assigning a value because it is null
            if(allDatas == null)
            {
                allDatas = 'm';
            }

            // console.log(allDatas,user.name);
            if(allDatas.name == user.name){
                console.log("At if case  in add user");
                resolve(false)
            }
            else{
                console.log("At else CAse in add user");
            user.pass = await bcrypt.hash(user.pass,10)
            var details = await db.get().collection(collection.USER).insertOne(user)
            var data = await db.get().collection(collection.USER).findOne({_id:details.insertedId}) 
            resolve(data)
        }
            
        })
    },
        // console.log(user);

        // db.get().collection(collection.USER).insertOne(user).then((data)=>{
        //     callback(data);
    //     })
    //  },

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
    },
        getUserDetails:(userId)=>{
        return new Promise((resolve,reject)=>{
            console.log("Getting all details of the user that wants to be Edited");
            db.get().collection(collection.USER).findOne({_id:objectId(userId)}).then((response)=>{
                resolve(response);
            })
        })
    },
    updateUser:(userId,userDetils)=>{
        return new Promise((resolve,reject)=>{
            console.log("At update user function");
            db.get().collection(collection.USER)
            .updateOne(
                {_id:objectId(userId)},{$set:{
                    name:userDetils.name,
                    email:userDetils.email,
                    pass:userDetils.pass,
                    re_pass:userDetils.re_pass
                }})
                .then((response)=>{
                    console.log(response);
                resolve();
            })
        })
    }
}

