const { Timestamp } = require("mongodb")
const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the user name"],
    },
    email: {
        type: String,
        required: [true, "Please add the email address"],
        unique: [true, "Email address already taken"]
    },
    password: {
        type: String,
        required: [true, "Please add the user password"],
    },
    profilePicture: {
        type: String,
        required: false,
        default: "/uploads/default-avatar.jpg"
    },
    bio: {
        type: String
    },


},
    {
        timestamps: true
    }

)

module.exports = mongoose.model("User", userSchema)