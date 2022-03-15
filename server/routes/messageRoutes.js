const express = require("express");
const router = express.Router();
const {protect} = require("../Middleware/authMiddleware");
const {sendMessage, allMessages} = require("../routes/messageControllers");

router.route("/").post(protect, sendMessage);
router.route("/:chatId").get(protect, allMessages);

module.exports = router;