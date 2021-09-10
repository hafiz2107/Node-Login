var express = require('express');
var router = express.Router();

var products=[
  {
    item:'Asus ROG Zephyrus G14',
    price:'₹ 1,49,990',
    des:"GeForce RTX™ 3050 Ti Laptop GPU Windows 10 Home AMD Ryzen™ 9 5000 Series 35.56cm(14) 1TB M.2 NVMe™ PCIe® 3.0 SSD",
    img:'https://dlcdnwebimgs.asus.com/gain/AABE2893-9E3A-4ED4-B95B-6173EC52E028/w185',
  },
  {
    item:'Lenovo Legion 5',
    price:'₹ 81,490',
    des:'Intel Core i7 Processor (10th Gen) 16 GB DDR4 RAM 64 bit Windows 10 Operating System 512 GB SSD 39.62 cm (15.6 Inch) Display Microsoft Office (Trial Only), Xbox Subscription (30 Day Free Trial) 1 Year Onsite Warrant',
    img:'https://rukminim1.flixcart.com/image/312/312/kggviq80/computer/x/6/g/lenovo-original-imafwpajqjvfhrea.jpeg?q=70',
  },
  {
    item:'MSI GL65 Leopard',
    price:'₹ 1,04,990',
    des:'Intel Core i7 Processor (10th Gen) 16 GB DDR4 RAM 64 bit Windows 10 Operating System 1 TB HDD|256 GB SSD 39.62 cm (15.6 inch) Display Matrix Display, Dragon Center, Cooler Boost 5, Nahimic 3 2 Year Warranty    ',
    img:'https://rukminim1.flixcart.com/image/312/312/kawtvgw0/computer/4/m/m/msi-na-gaming-laptop-original-imafsdbgyhpkejhz.jpeg?q=70',
  },
  {
    item:'Asus ROG Strix G15',
    price:'₹ 71,990',
    des:'Intel Core i5 Processor (10th Gen) 8 GB DDR4 RAM 64 bit Windows 10 Operating System 512 GB SSD 39.62 cm (15.6 inch) Display 1 Year Onsite Warranty',
    img:'https://rukminim1.flixcart.com/image/312/312/kcp4osw0/computer/t/f/z/asus-na-original-imaftrgwna6snfn8.jpeg?q=70',
  },
  {
    item:'Asus ROG strix G15(2021)',
    price:'₹ 1,54,990',
    des:'AMD Ryzen 9 Octa Core Processor 16 GB DDR4 RAM Windows 10 Operating System 1 TB SSD 39.62 cm (15.6 inch) Display Office Home and Student 2019 included 1 Year Onsite Warranty',
    img:'https://rukminim1.flixcart.com/image/312/312/ks7tuvk0/computer/t/j/v/g513qy-hq008ts-gaming-laptop-asus-original-imag5tthdvxrbrnv.jpeg?q=70',
  },
  {
    item:'Dell G7',
    price:'₹ 1,79,990',
    des:'Intel Core i9 Processor (10th Gen) 16 GB DDR4 RAM 64 bit Windows 10 Operating System 1 TB SSD 39.62 cm (15.6 inch) Display Microsoft Office Home and Student 2019 1 Year Onsite Warranty',
    img:'https://rukminim1.flixcart.com/image/312/312/kf4ajrk0/computer/q/8/5/dell-na-gaming-laptop-original-imafvn3yewuackzs.jpeg?q=70',
  },
  {
    item:'MSI GE66',
    price:'₹ 1,94,990',
    des:'Intel Core i7 Processor (10th Gen) 32 GB DDR4 RAM 64 bit Windows 10 Operating System 1 TB SSD 39.62 cm (15.6 inch) Display Dragon Center, Cooler Boost 5, Nahimic VR, True Color 2.0, Nahimic 3 2 Years Carry In Warranty',
    img:'https://rukminim1.flixcart.com/image/312/312/kfpq5jk0/computer/h/t/b/msi-na-gaming-laptop-original-imafw3yhmdkzmhzr.jpeg?q=70',
  },
]

// Dispalying Users Home page
router.get('/', function(req, res, next) {
  console.log("1.getting User home page")
  res.render('user/user-home',{products,admin:false})
});

// getting user login page
router.get('/login',(req,res)=>{
  console.log("1.User login page")
  res.render('user/user-login',{user:false})
})

module.exports = router;
