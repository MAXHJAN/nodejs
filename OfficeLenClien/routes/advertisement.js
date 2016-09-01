var express = require('express');
var router = express.Router();
var http=require('http');
var httpconnection=require('../net/httpclient');
var db=require('../database/dao');
var fs = require('fs');  
var formidable = require("formidable");  

router.get('/', function(req, res, next) {
   res.render('advertisement',{title:'advertisement'});
});
router.get('/advertisement', function(req, res) {
  res.render('advertisement');
});


router.post('/test', function(req, res) {
    console.log("---------------------");
   console.log(req.body);
   console.log(req.body.cmd);
   console.log(req.body.platform);
   res.send("123123123");
});

router.post('/getprovience', function(req, res) {
   console.log("---------getprovience------------");
      var countryid="11e5-a9fe-56e0d2cb-9e35-39a6f156570b";
       httpconnection.getProvience(countryid,function(result){
              res.send(result);
       });
});


router.post('/getcity', function(req, res) {

      var provienceid=req.body.provienceid;
      httpconnection.getCity(provienceid,function(result){

      });
});
//获取建筑列表
router.post('/getbuild', function(req, res) {
    console.log("------getbuild");
  httpconnection.getBuilding(function(result){
    res.send(result);
  });
});

//获取建筑列表
router.post('/getunit', function(req, res) {
  console.log("------getunit");
  var data=req.body;
  console.log(data);
  httpconnection.getUnit(data,function(result){
    res.send(result);
  });
});
//
router.post('/saveadvert', function(req, res) {
     console.log("------saveadvert");
      var data=req.body;
     db.saveAdvert(data,function(result){
         console.log("result="+result);
       res.send(result);
     });
});

router.post('/uploadimage',function(req,res){
    console.log("------uploadimage");
  var cacheFolder = 'public/images/';
 // var currentUser = req.session.user;
  var userDirPath =cacheFolder+ "uploadimage";
    if (!fs.existsSync(userDirPath)) {
        fs.mkdirSync(userDirPath);
    }
    var form = new formidable.IncomingForm(); //创建上传表单
    form.encoding = 'utf-8'; //设置编辑
    form.uploadDir = userDirPath; //设置上传目录
    form.keepExtensions = true; //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024; //文件大小
    form.type = true;
    var displayUrl;
    form.parse(req, function(err, fields, files) {
        if (err) {
            res.send(err);
            return;
        }
        var extName = ''; //后缀名
        switch (files.upload.type) {
            case 'image/pjpeg':
                extName = 'jpg';
                break;
            case 'image/jpeg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;
        }
        if (extName.length === 0) {
            res.send({
                code: 202,
                msg: '只支持png和jpg格式图片'
            });
            return;
        } else {
            var avatarName = '/' + Date.now() + '.' + extName;
            var newPath = form.uploadDir + avatarName;
            displayUrl = avatarName;
            fs.renameSync(files.upload.path, newPath); //重命名
            res.send({
                code: 200,
                msg: displayUrl
            });
        }
    });

});

module.exports = router;