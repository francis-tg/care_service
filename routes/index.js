var express = require('express');
const db = require('../models');
const {  ensureUserAuthenticated } = require('../middleware/auth');
const issue = require('../controllers/issue');
const { ValidateField } = require('../middleware/validation');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    res.render('index', {layout:false});
  } catch (error) {
    next(error)
  }
});

router.get("/issue",ensureUserAuthenticated, async function(req,res,next){
  try {
    const issues = await db.Issue.findAll({where:{user_id:req.user.id},include:["User",'Intervention'],raw:true})
    return res.render('issue/user',{layout:false,issues})
  } catch (error) {
    next(error)
  }
})
router.post('/issue',ensureUserAuthenticated,ValidateField, issue.createIssue)

module.exports = router;
