const { response } = require('express');
var express = require('express');
const userHelpers = require('../helpers/user-helpers');
var router = express.Router();
var userHelper = require('../helpers/user-helpers')
var objectId = require('mongodb').ObjectId


/* GET admin's home page. */
router.get('/', function(req, res, next) {
  console.log("2.getting Admin home page")
// getting data from user helper the database and displaying it on the admins's Dashboard
  userHelpers.getAllUsers().then((data)=>{
    console.log("2.4 Getting datas from the database and displaying ")
    res.render('admin/view-users', {admin:true,data,title:"Admin Home"} );
  })
});

// getting the page to add new users
router.get('/add-user',(req,res)=>{
  console.log("2.2.getting Add-User page");
  res.render('admin/add-user',{admin:false,title:"Add User"});
})

// Posting new users uploded by admin
router.post('/add-user',(req,res)=>{
  console.log("2.3.Posting User to database");
  // Using user-helper to get The connection to database
  userHelpers.addUser(req.body).then((response)=>{
    res.redirect('/admin/')
  })
})

// deleting user

router.get('/delete-user/:id',(req,res)=>{
  // Getting ID Of a document
  console.log("Getting delete user and calling the fuction deleteUser");
  let user_id=req.params.id;
  console.log(user_id);

  // Calling User helper function
  userHelper.deleteUser(user_id).then((response)=>{
    console.log("Deleted user and redirecting to admin home page");

  
    if(response.acknowledged&&response.deletedCount>0){
    res.redirect('/admin')
    }else{
      console.log("Something happened")
    }

  })
})

// Getting User edit page
router.get('/edit-user/:id',async(req,res)=>{
  console.log("Getting the user that wants to be edited");
  let user =await userHelpers.getUserDetails(req.params.id)
  console.log(user);
  res.render('admin/edit-user',{user,admin:true,title:"Edit user"})
})

// Posting the edited details of the user
router.post('/edit-user/:id',(req,res)=>{
console.log("Posting the edited details of the user");
  userHelpers.updateUser(req.params.id,req.body).then(()=>{
    res.redirect('/admin')
  })
})
module.exports = router;
