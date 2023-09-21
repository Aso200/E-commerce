var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('cart', { title: 'Express' });

  console.log('HELVETE');
});

module.exports = router;
