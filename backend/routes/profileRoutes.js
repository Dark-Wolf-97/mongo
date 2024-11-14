const express = require("express");
const router = express.Router();
const { getProfile, saveProfile } = require("../controllers/profileController");
const { verifyToken } = require("../middleware/authMiddleware");

router.get("/getProfile", verifyToken, getProfile);
router.post("/saveProfile", verifyToken, saveProfile);

module.exports = router;
