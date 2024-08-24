
const issue = require('../controllers/issue')
const { ensureAuthenticated } = require('../middleware/auth')
const { ValidateField } = require('../middleware/validation')

const router =require('express').Router()

router.get('/',ensureAuthenticated, issue.getIssue)
router.post('/',ensureAuthenticated, issue.createIssue)
router.post('/update/:id',ensureAuthenticated,ValidateField,issue.updateIssue)
router.post("/remove/:id",ensureAuthenticated,issue.deleteIssue)

module.exports = router