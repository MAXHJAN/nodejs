var express = require('express');
var db = require('../database/dao');
var util = require('../Util/utils');
var router = express.Router();

/* GET home page. */
router.get('/',
    function (req, res, next) {
        res.render('index', {
            title: 'Express'
        });
    });

/* Test */
router.get('/test', function (req, res) {
    console.log('-----test----');
    var head = req.headers;
    // var vv = req.query.name;
    console.log(head);
    console.log(head.host);

    // var sql = "select * from user where username='"+vv+"'";

    // db.Test(sql,function(err,result){
    //     console.log("----str--1----");
    //     console.log(result);
    //     console.log("----str--2----");
    // });
    res.render('index', {
        title: 'll'
    });

});

/*登录模块*/
router.post('/login',
    function (req, res) {
        console.log('login');
        var username = req.body.username;
        var passwd = req.body.passwd;
        console.log(+ username + '-----' + passwd);
        db.login(username, passwd, function (result) {
            res.send(result);
            console.log("结束");
        });

    });

/*注册模块 */
router.post('/register',
    function (req, res) {
        console.log("register");
        var username = req.body.username;
        var passwd = req.body.passwd;
        console.log(username + "------1------" + passwd);
        db.register(username, passwd, function (result) {
            res.send(result);
            console.log("结束");
        });

    });

/**获取该用户的精灵列表 */
router.get('/list',
    function (req, res) {
        var head = req.headers;
        console.log(head);
        var token = head.token;
        console.log(token);
        db.userMonsterList(token, function (result) {
            res.send(result);
            console.log("结束");
        });
    });

//推送广告
router.post('/advert',
    function (req, res) {
        console.log("------advert-------");
        var lat = req.body.lat;
        var lon = req.body.lon;
        var buildingid = req.body.uuid;
        db.pushAdvert(lat, lon, buildingid, function (result) {
              console.log("----------------------------------------------------");
              console.log(result);
            res.send(result);
        });      

    });

 router.post('/getadvert',
    function (req, res) {
        console.log("------getadvert-------");
        var lat = req.body.lat;
        var lon = req.body.lon;
        var buildingid = req.body.uuid;
         console.log("buildingid="+buildingid);
         db.getArdert(lat,lon,buildingid,function(result){
              console.log(result);
          res.send(result);
        });
    
});

module.exports = router;