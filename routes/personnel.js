const personnel = require("../controllers/personnel");
const {isAdmin } = require("../middleware/auth");

const router = require("express").Router()

router.get('/', isAdmin, personnel.getPersonnel);
router.post('/create',isAdmin,personnel.createPersonnel)

module.exports = router