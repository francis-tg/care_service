var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  
  try {
    
    res.render('index', {layout:false});
  } catch (error) {
    next(error)
  }
});

module.exports = router;
