//FileName: users.js
//created by Deepa k
// student id :301250548
//30th September

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
