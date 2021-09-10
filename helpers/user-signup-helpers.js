var db= require('../config/connection')
var collection = require('../config/collections')
var bcrypt=require('bcrypt')
const collections = require('../config/collections')

console.log("At user sign up helper")

module.exports={
    doSignup:(userData)=>{
        return new Promise(async(resolve,reject)=>{

        userData.pass=await bcrypt.hash(userData.pass,10)
        var details = await db.get().collection(collections.NEW_USER).insertOne(userData)
        var data = await db.get().collection(collections.NEW_USER).findOne({_id:details.insertedId}) 
        resolve(data)
        })  
    },
    
    doLogin:(userData)=>{
        return new Promise(async(resolve,reject)=>{

            let logInStatus = false;
            let response = {}
            let user = await db.get().collection(collections.NEW_USER).findOne({email:userData.your_name})
            console.log("The user is : "+user)

            if(user){
                bcrypt.compare(userData.pass,user.password).then((status)=>{
console.log("Comparing"+userData.pass+" and "+user.password)

                    if(status){
                        console.log("Login success")
                        response.user=user
                        response.status = true
                        resolve(response)
                    }
                    else{
                        console.log("Login Failed")
                        resolve({status:false})
                    }
                })
            }else{
                console.log("LOGIN SUCCESS");
            }
        })
    }
}