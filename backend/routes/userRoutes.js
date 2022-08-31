const express = require("express")
const router = express.Router()

const auth = require('../middleware/auth')
const passwordValidator = require('../middleware/passwordValidator')

const userController = require("../controllers/userController")

router.post("/signup", passwordValidator, userController.signup)
router.post("/login", userController.login)

module.exports = router