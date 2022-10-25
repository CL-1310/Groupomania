const express = require("express")
const router = express.Router()

const auth = require('../middleware/auth')
const passwordValidator = require('../middleware/passwordValidator')
const multer = require('../middleware/avatar-multer-config')

const userController = require("../controllers/userController")

router.post("/signup", passwordValidator, multer, userController.signup)
router.post("/login", userController.login)
router.get("/user/:id", auth, multer, userController.getOneUser)
router.put("/user/:id", auth, multer, userController.editOneUser)

module.exports = router