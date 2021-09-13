const { response } = require('express');
var express = require('express');
const userHelpers = require('../helpers/user-helpers');
var router = express.Router();
var userHelper = require('../helpers/user-helpers')
var objectId = require('mongodb').ObjectId

const admin = {
  user : 'admin',
  pass:112233
}



/* GET admin's home page. */
router.get('/', function(req, res, next) {
  
  if(req.session.admin){
  console.log('1');
  console.log("2.getting Admin home page")
// getting data from user helper the database and displaying it on the admins's Dashboard
    userHelpers.getAllUsers().then((data)=>{
    console.log("2.4 Getting datas from the database and displaying ")
    res.render('admin/view-users', {admin:true,data,title:"Admin Home",search:true} );
  })
}
else{
  // Going to login page if no session is there
  console.log("In else case");
  res.render('admin/admin-sign',{loginError:req.session.error,title:"Admin Login"})
  req.session.error = false;
}
});

// Posting user login page
router.post('/adminLogin',(req,res)=>{
  console.log(req.body)
  if(req.body.your_name == admin.user && req.body.your_pass == admin.pass){
    console.log("Comparing");
    req.session.adminDetails = admin
    req.session.admin = true
    res.redirect('/admin')
  }
  else{
    req.session.error = true
    res.redirect('/admin')
  }
})

// getting the page to add new users
router.get('/add-user',(req,res)=>{
  if(req.session.admin){
  console.log("2.2.getting Add-User page");
  res.render('admin/add-user',{admin:true,title:"Add User",search:false});
}else{
  res.redirect('/admin')
}
})
// Cancel button for cancel Adding new user
router.get('/add-cancel',(req,res)=>{
  if(req.session.admin){
    res.redirect('/admin')
  }else{
    res.redirect('/admin')
  }
})

// cancelling Edit
router.get('/edit-cancel',(req,res)=>{
  if(req.session.admin){
    res.redirect('/admin')
  }else{
    res.redirect('/admin')
  }
})

// Posting new users uploded by admin
router.post('/add-user',(req,res)=>{
  console.log("2.3.Posting User to database");
  // Using user-helper to get The connection to database
  userHelpers.addUser(req.body).then((response)=>{
    
    if(response){
      res.redirect('/admin/')
    }
    else{
      userNameInvalid = true
      res.render('admin/add-user',{admin:true,title:"Add User",search:false,userNameInvalid})
    }
    
  })
})

// deleting user
router.get('/delete-user/:id',(req,res)=>{
  // Getting ID Of a document
  if(req.session.admin){
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
}
else{
  res.redirect('/admin');
}
})

// Getting User edit page
router.get('/edit-user/:id',async(req,res)=>{

  if(req.session.admin){
  console.log("Getting the user that wants to be edited");
  let user =await userHelpers.getUserDetails(req.params.id)
  console.log(user);
  res.render('admin/edit-user',{user,admin:true,title:"Edit user",search:false})
  }
  else{
  res.redirect('/admin');
  }
})

// Posting the edited details of the user
router.post('/edit-user/:id',(req,res)=>{
console.log("Posting the edited details of the user");
  userHelpers.updateUser(req.params.id,req.body).then(()=>{
    res.redirect('/admin')
  })
})

// Logout
router.get('/adminLogout',(req,res)=>{
  req.session.admin = false;
  res.redirect('/admin');
})
module.exports = router;
