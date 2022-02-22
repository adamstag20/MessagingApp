const express = require('express');
const router = express.Router();
const { registerUser, authUser } = require("../routes/userController");

router.route('/add_user').post(registerUser);
router.route('/login').post(authUser);
module.exports = router;