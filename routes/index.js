var express = require('express');
const { ensureAuthenticated } = require('../middleware/auth');
var router = express.Router();

/* GET home page. */
router.get('/',ensureAuthenticated, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
