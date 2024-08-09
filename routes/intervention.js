const intervention = require('../controllers/intervention')
const { ensureAuthenticated } = require('../middleware/auth')

const router =require('express').Router()

router.get('/',ensureAuthenticated, intervention.getIntervention)
router.post('/',ensureAuthenticated, intervention.createIntervention)
router.post('/update/:id',ensureAuthenticated, intervention.updateIntervention)

module.exports = router