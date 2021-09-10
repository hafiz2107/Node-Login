var MongoClient = require('mongodb').MongoClient
var state={
    db:null
}

module.exports.connect=(done)=>{

    const url='mongodb://localhost:27017'
    const dbname='shopify-users'

    MongoClient.connect(url,(err,data)=>{
        if(err){
           return done(err)
        }
        else
        {
            state.db=data.db(dbname)
            done()
        }
    })
}

module.exports.get=function ()
{
    return state.db
}