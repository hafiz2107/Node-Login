var db= require('../config/connection')
var collection = require('../config/collections')
var bcrypt=require('bcrypt')
const collections = require('../config/collections')

console.log("At user sign up helper")

module.exports={
    doSignup:(userData)=>{
        return new Promise(async(resolve,reject)=>{

        userData.pass=await bcrypt.hash(userData.pass,10)
        var details = await db.get().collection(collections.USER).insertOne(userData)
        var data = await db.get().collection(collections.USER).findOne({_id:details.insertedId}) 
        resolve(data)
        })  
    },
    
    doLogin:(userData)=>{
        return new Promise(async(resolve,reject)=>{

            let logInStatus = false;
            let response = {}
            let user = await db.get().collection(collections.USER).findOne({name:userData.your_name})
            console.log("At Do login helper")
            console.log(user);
            if(user){
                console.log("At if user"+user);
                console.log("Comparing  "+userData.your_pass+" and "+user.pass)
                bcrypt.compare(userData.your_pass,user.pass).then((status)=>{
                        console.log(status)
                    if(status){
                        console.log("Login Success!!");
                        response.user=user
                        response.status=true
                        resolve(response)
                    }
                    else{
                        console.log("Login Failed")
                        resolve({status:false})
                    }
                })
            }else{
                console.log("LOGIN Failed");
                resolve({status:false})
            }
        })
    }
}