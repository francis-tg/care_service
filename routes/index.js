var express = require('express');
const { ensureAuthenticated } = require('../middleware/auth');
const db = require('../models');
const { Op } = require('sequelize');
var router = express.Router();

/* GET home page. */
router.get('/',ensureAuthenticated, async function(req, res, next) {
  
  try {
    const users = await db.User.findAll({ where: { name: { [Op.not]: 'Admin User' } }, raw: true })
    res.render('index', {users});
  } catch (error) {
    next(error)
  }
});

module.exports = router;
