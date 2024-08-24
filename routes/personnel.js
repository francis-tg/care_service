const personnel = require("../controllers/personnel");
const {isAdmin } = require("../middleware/auth");

const router = require("express").Router()

router.get('/', isAdmin, personnel.getPersonnel);
router.get('/users', isAdmin, personnel.getUsers);
router.post('/create',isAdmin,personnel.createPersonnel);
router.post('/client',isAdmin,personnel.createUser);
router.post('/update/:id',isAdmin,personnel.updatePersonnel)
router.get('/remove/:id',isAdmin,personnel.removeUser)
module.exports = router