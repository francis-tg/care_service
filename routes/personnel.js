const personnel = require("../controllers/personnel");
const { ensureAuthenticated } = require("../middleware/auth");

const router = require("express").Router()

router.get('/',ensureAuthenticated, personnel.getPersonnel);
router.post('/create',ensureAuthenticated,personnel.createPersonnel)

module.exports = router