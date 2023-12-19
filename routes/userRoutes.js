const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

const { registerUser, authUser } = require("../controllers/userController");
router.route("/").post(registerUser).get(protect);
router.post("/login", authUser);

module.exports = router;
