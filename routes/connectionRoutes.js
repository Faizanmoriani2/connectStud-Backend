const express = require("express");
const { sendConnectionRequest, getPendingRequests, confirmConnectionRequest, getAllUsers } = require("../controller/connectionController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post("/connect", validateToken, sendConnectionRequest);
router.get("/requests", validateToken, getPendingRequests);
router.put("/requests/confirm", validateToken, confirmConnectionRequest);
router.get("/users", validateToken, getAllUsers);

module.exports = router;
