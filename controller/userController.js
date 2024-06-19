// @desc Register User
// @route POST /api/users/register
// @access PUBLIC
const registerUser = (req, res) => {
    res.json({
        message: "User Registered!"
    })
}

// @desc Login User
// @route POST /api/users/login 
// @access PUBLIC
const loginUser = (req, res) =>{
    res.json({
        message:"User Login"
    })
}

// @desc current User
// @route GET /api/users/current 
// @access PRIVATE
const curretnUser = (req, res) =>{
    res.json({
        message:"Current User "
    })
}

module.exports = {registerUser, loginUser, curretnUser}