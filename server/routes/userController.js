const asyncHandler = require("express-async-handler");
const User = require("../models");
const generateToken = require("../routes/generateToken");


const allUsers = asyncHandler(async (req,res)=> {

    const keyword = req.query.search
    // looks for keyword (username) in database if not found show nothing
    ? { username : {$regex: req.query.search, $options: "i"}} : {}; 

    // Find users who match keyword but not the currently logged in user
    const users = await User.find(keyword).find({ _id: { $ne : req._id} });

    res.send(users);

});
//////////////////////////////////////////////////////////////////
// Process to register a user to the mongoDB database
const registerUser = asyncHandler( async(req, res) => {
    const { username, password} = req.body;

    // Username or password not given throw error
    if (!username || !password) {
        res.status(400);
        throw new Error("Please Enter all the fields");
    }
    
    // Queries MongoDB to find if username exists
    const userExists = await User.findOne({username });

    // If username is already used throw error
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    // Queries database and creates new User
    const user = await User.create({
        username,
        password
    });
    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Failed to Create the User");
    }
});

////////////////////////////////////////////////////////////
// Authenticates a user 

const authUser = asyncHandler(async(req,res) => {
    const {username, password} = req.body;

    const user = await User.findOne({username});

    if (user && (await user.matchPassword(password))){
        res.json ({
            _id: user._id,
            username : user.username,
            token: generateToken(user._id),

        });
    } else {
        res.status(400);
        throw new Error("Invalid Username or Password");
    }

});

///////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////
module.exports = { registerUser, authUser, allUsers };
