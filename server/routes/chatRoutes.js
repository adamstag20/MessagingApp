const express = require("express");
const {accessChat, fetchChats, createGroupChat } = require("../routes/chatController");
const router = express.Router();
const {protect} = require("../Middleware/authMiddleware");

router.route('/api/chat').post(protect,accessChat);
router.route('/api/chat').get(protect,fetchChats);
router.route('/group').post(protect, createGroupChat);
 module.exports = router;