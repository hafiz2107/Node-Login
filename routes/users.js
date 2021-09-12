const { response } = require('express');
var express = require('express');
const { getAllUsers } = require('../helpers/user-helpers');
const userSignupHelpers = require('../helpers/user-signup-helpers');
var router = express.Router();
var userHelpers = require('../helpers/user-signup-helpers')


var products=[
  {
    item:'Asus ROG',
    price:'₹ 1,49,990',
    des:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a efficitur erat.",
    img:'https://dlcdnwebimgs.asus.com/gain/AABE2893-9E3A-4ED4-B95B-6173EC52E028/w185',
  },
  {
    item:'Lenovo Legion 5',
    price:'₹ 81,490',
    des:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a efficitur erat.',
    img:'https://rukminim1.flixcart.com/image/312/312/kggviq80/computer/x/6/g/lenovo-original-imafwpajqjvfhrea.jpeg?q=70',
  },
  {
    item:'MSI GL65',
    price:'₹ 1,04,990',
    des:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a efficitur erat.',
    img:'https://rukminim1.flixcart.com/image/312/312/kawtvgw0/computer/4/m/m/msi-na-gaming-laptop-original-imafsdbgyhpkejhz.jpeg?q=70',
  },
  {
    item:'Asus ROG Strix ',
    price:'₹ 71,990',
    des:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a efficitur erat.',
    img:'https://rukminim1.flixcart.com/image/312/312/kcp4osw0/computer/t/f/z/asus-na-original-imaftrgwna6snfn8.jpeg?q=70',
  },
  {
    item:'Asus ROG strix',
    price:'₹ 1,54,990',
    des:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a efficitur erat.',
    img:'https://rukminim1.flixcart.com/image/312/312/ks7tuvk0/computer/t/j/v/g513qy-hq008ts-gaming-laptop-asus-original-imag5tthdvxrbrnv.jpeg?q=70',
  },
  {
    item:'Dell G7',
    price:'₹ 1,79,990',
    des:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a efficitur erat.',
    img:'https://rukminim1.flixcart.com/image/312/312/kf4ajrk0/computer/q/8/5/dell-na-gaming-laptop-original-imafvn3yewuackzs.jpeg?q=70',
  },
  {
    item:'MSI GE66',
    price:'₹ 1,94,990',
    des:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a efficitur erat.',
    img:'https://rukminim1.flixcart.com/image/312/312/kfpq5jk0/computer/h/t/b/msi-na-gaming-laptop-original-imafw3yhmdkzmhzr.jpeg?q=70',
  },
]


// Dispalying Users Home page
router.get('/', function(req, res, next) {
  console.log("1 Getting user home page");
  // Getting User session
  var userSession = req.session.user
  
  
  userHelpers=getAllUsers().then((users)=>{
    // console.log(users)
    console.log("1.getting User home page")
    res.render('user/user-home',{products,user:true,userSession})
  })
  
});

// getting user login page 
router.get('/login',(req,res)=>{
  console.log("1.2 User login page");
  
  if(req.session.loggedIn){
    console.log("Redirecting to home page when hitting back")
    res.redirect('/')
  }else{
    console.log("Rendering to login page if not logged in");
    res.render('user/user-login',{user:false,loginErr:req.session.loggedInErr})
    req.session.loggedInErr=false
  }
  
})

//posting login details of the users to the database
router.post('/login',(req,res)=>{
  console.log("Login user details : ");
  console.log(req.body)
  console.log("1.3 Checking the details of the user");
  userSignupHelpers.doLogin(req.body).then((response)=>{
    
    if(response.status){
      req.session.loggedIn = true
      req.session.user = response.user
      res.redirect('/')
    }else{
      req.session.loggedInErr=true  
      res.redirect('/login')
    }
  })
})

// Getting page for user's signUp
router.get('/signup',(req,res)=>{
  console.log("1.1 Users signup Page")
  res.render('user/user-signup',{user:false})
})


// Posting Users signed up data to database
router.post('/signup',(req,res)=>{
  console.log("Posting Users signed up data to database")
  userSignupHelpers.doSignup(req.body).then((response)=>{
  console.log("1.2 Posting users Signed up data");
  console.log(response);
  res.redirect('/login')
})
})

// Logging out
router.get('/logout',(req,res)=>{
  console.log("Logging out");
  req.session.destroy()
  res.redirect('/')
})

module.exports = router;
