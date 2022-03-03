const express = require("express");
const {accessChat } = require("../routes/chatController");
const router = express.Router();
const {protect} = require("../Middleware/authMiddleware");

router.route('/api/chat').post(protect,accessChat);
 //router.route('/chat').get(protect,fetchChats);

 module.exports = router;