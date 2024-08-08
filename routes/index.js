var express = require('express');
const { ensureAuthenticated } = require('../middleware/auth');
var router = express.Router();

/* GET home page. */
router.get('/',ensureAuthenticated, async function(req, res, next) {
  
  try {
    const users = await db.User.findAll({ where: { name: { [Op.not]: 'Admin User' } }, raw: true })
    res.render('index', {users});
  } catch (error) {
    
  }
});

module.exports = router;
