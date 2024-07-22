const express = require("express")
const { register } = require("module")
const { registerUser, loginUser, currentUser } = require("../controller/userController")
const validateToken = require("../middleware/validateTokenHandler")
// const verifyToken = require("../middleware/verifyToken")

const router = express.Router()

router.post('/register', registerUser)
router.post("/login", loginUser).get("/current", validateToken,currentUser)

module.exports = router