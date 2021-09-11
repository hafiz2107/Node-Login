var express = require('express');
const userHelpers = require('../helpers/user-helpers');
var router = express.Router();
var userHelper = require('../helpers/user-helpers')


/* GET admin's home page. */
router.get('/', function(req, res, next) {
  console.log("2.getting Admin home page")
// getting data from user helper the database and displaying it on the admins's Dashboard
  userHelpers.getAllUsers().then((data)=>{
    console.log("2.4 Getting datas from the database andn displaying ")
    res.render('admin/view-users', {admin:true,data} );
  })
});

// getting the page to add new users
router.get('/add-user',(req,res)=>{
  console.log("2.2.getting Add-User page");
  res.render('admin/add-user',{admin:false});
})

// Posting new users uploded by admin
router.post('/add-user',(req,res)=>{
  console.log("2.3.Posting User to database");
  // Using user-helper to get The connection to database
  userHelpers.addUser(req.body,(result)=>{
    res.redirect("/admin/")
  })
})

module.exports = router;
