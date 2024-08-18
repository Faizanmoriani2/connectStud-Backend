const express = require("express")
const { register } = require("module")
const { registerUser, loginUser, currentUser, updateUserProfile } = require("../controller/userController")
const validateToken = require("../middleware/validateTokenHandler")
const upload = require('../middleware/uploadMiddleware');
// const verifyToken = require("../middleware/verifyToken")

const router = express.Router()

router.post('/register', registerUser)
router.post("/login", loginUser).get("/current", validateToken,currentUser)
router.put("/profile", validateToken,upload.single("profilePicture"),updateUserProfile)

module.exports = router