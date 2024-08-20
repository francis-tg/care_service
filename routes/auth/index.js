const auth = require("../../controllers/auth")
const { ValidateField } = require("../../middleware/validation")

const router = require("express").Router()

router.get("/login",auth.loginController)
router.post("/login",ValidateField, auth.authController)
/* router.get("/register",auth.registerController)
router.post("/register",auth.createAccountController) */
router.get("/logout",auth.logoutController)
module.exports = router