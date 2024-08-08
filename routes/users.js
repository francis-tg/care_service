var express = require('express');
const { ensureAuthenticated } = require('../middleware/auth');
var router = express.Router();

/* GET users listing. */
router.get('/',ensureAuthenticated, function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
