const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

// @desc Register User
// @route POST /api/users/register
// @access PUBLIC
const registerUser = asyncHandler(async(req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered");
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Set the default profile picture path
    const defaultProfilePicture = "/uploads/default-avatar.png";

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        profilePicture: defaultProfilePicture,
    });

    if (user) {
        res.status(201).json({ 
            _id: user.id, 
            email: user.email,
            profilePicture: user.profilePicture
        });
    } else {
        res.status(400);
        throw new Error("User data not valid");
    }
});

// @desc Login User
// @route POST /api/users/login 
// @access PUBLIC
const loginUser = asyncHandler(async(req, res) =>{
    const {email, password} = req.body;
    if(!email, !password){
        res.status(400)
        throw new Error("All fields are mandatory!!")
    }
    const user = await User.findOne({ email })
    //compare password with hashed password
    if(user &&(await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id
            },

        }, process.env.ACCESS_TOKEN_SECRET, 
        {expiresIn: "240m"}    
    )
        res.status(200).json({accessToken,  user: {
            id: user.id,
            username: user.username,
            email: user.email
        }})
    }
    else{
        res.status(401)
        throw new Error("Email or Password not valid!")
    }
})

// @desc current User
// @route GET /api/users/current 
// @access PRIVATE
const currentUser = (req, res) =>{
    res.json(req.user)
}


const updateUserProfile = asyncHandler(async (req, res) => {
    try {
        const userId = req.user.id;
        const { bio } = req.body;
        const profilePicture = req.file ? `/uploads/${req.file.filename}` : null; // Only update if new file uploaded

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update bio if provided
        if (bio) user.bio = bio;

        // Update profile picture if a new one is uploaded
        if (profilePicture) user.profilePicture = profilePicture;

        await user.save();

        res.json({
            id: user._id,
            username: user.username,
            email: user.email,
            bio: user.bio,
            profilePicture: user.profilePicture,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



module.exports = {registerUser, loginUser, currentUser, updateUserProfile}