var express = require('express');
var router = express.Router();
var db = require('../database/dao');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('home', { title: 'home' });
});
router.get('/home', function (req, res) {
  res.render('home');
});
router.post('/getlist', function (req, res) {

  var company_id = req.body.company_id;
  db.getList(company_id, function (result) {
    res.send(result);
  });
});
module.exports = router;
