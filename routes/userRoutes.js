const express = require("express")
const { register } = require("module")
const { registerUser, loginUser, curretnUser } = require("../controller/userController")

const router = express.Router()

router.post('/register', registerUser)
router.post("/login", loginUser).get("/current", curretnUser)

module.exports = router