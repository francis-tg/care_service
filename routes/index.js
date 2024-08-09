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
    const issues = await db.Issue.findAll({
      where: { user_id: req.user.id },
      include: [
        {
          model: db.Intervention,
          include: [
            {
              model: db.User,
              as: 'technician' // Include the technician with alias
            }
          ]
        }
      ],
      raw: true, // Set to false to get nested results; use true for flat structure
      nest: false // Used for nested results if raw: false
    });
    return res.render('issue/user',{layout:false,issues})
  } catch (error) {
    next(error)
  }
})
router.post('/issue',ensureUserAuthenticated,ValidateField, issue.createIssue)
router.post('/issue/update/:id',ensureUserAuthenticated,ValidateField, issue.updateIssue)
router.get('/issue/delete/:id',ensureUserAuthenticated,issue.deleteIssue)

module.exports = router;
