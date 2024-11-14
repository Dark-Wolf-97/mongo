const express = require("express");
const router = express.Router();
const { getWallet, addSaldo } = require("../controllers/walletController");
const { verifyToken } = require("../middleware/authMiddleware");

router.get("/getWallet", verifyToken, getWallet);
router.post("/addSaldo", verifyToken, addSaldo);

module.exports = router;
