const express = require('express');
const router = express.Router();
const { registerUser, authUser, allUsers } = require("../routes/userController");
const { protect } = require("../Middleware/authMiddleware");

// Used for Homepage routing
router.route('/add_user').post(registerUser).get(protect, allUsers);
router.route('/login').post(authUser);

// Used for Chatpage routing

router.route('/chat').get(allUsers);



module.exports = router;