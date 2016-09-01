var express = require('express');
var db = require('../database/dao');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res) {
   
});

router.post('/login', function(req, res) {
  console.log("--------hello-----login-----");
  var username=req.body.lusername;
  var passwd=req.body.lpasswd;
     db.login(username,passwd,function(result){
       console.log("=="+result);
         res.send(result);
     });
});
router.post('/register',function(req,res){
   console.log("-------register-----");
   var username=req.body.rusername;
   var passwd=req.body.rpasswd;
   var email=req.body.remail;
   var phone=req.body.rphone;
   db.register(username,passwd,email,phone,function(result){
         res.send(result);
   });
});

module.exports = router;
