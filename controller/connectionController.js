const asyncHandler = require("express-async-handler");
const ConnectionRequest = require("../models/connectionRequestModel");
const User = require("../models/userModel");

const sendConnectionRequest = asyncHandler(async (req, res) => {
    const { receiverId } = req.body;
    const senderId = req.user.id;

    const existingRequest = await ConnectionRequest.findOne({
        sender: senderId,
        receiver: receiverId,
        status: "pending"
    });

    if (existingRequest) {
        res.status(400);
        throw new Error("Connection request already sent");
    }

    const connectionRequest = await ConnectionRequest.create({
        sender: senderId,
        receiver: receiverId,
    });

    res.status(201).json(connectionRequest);
});

const getPendingRequests = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const pendingRequests = await ConnectionRequest.find({ receiver: userId, status: "pending" })
        .populate("sender", "username email");

    res.status(200).json(pendingRequests);
});

const confirmConnectionRequest = asyncHandler(async (req, res) => {
    const { requestId, status } = req.body; // 'accepted' or 'declined'

    // Validate the status
    if (!['accepted', 'declined'].includes(status)) {
        res.status(400);
        throw new Error("Invalid status. Must be 'accepted' or 'declined'.");
    }

    try {
        const connectionRequest = await ConnectionRequest.findById(requestId);

        // Check if the connection request exists and belongs to the current user
        if (!connectionRequest) {
            res.status(404);
            throw new Error("Connection request not found");
        }

        if (connectionRequest.receiver.toString() !== req.user.id) {
            res.status(403);
            throw new Error("You are not authorized to update this connection request");
        }

        // Update the status of the connection request
        connectionRequest.status = status;
        await connectionRequest.save();

        res.status(200).json({ message: `Connection request ${status}`, connectionRequest });
    } catch (error) {
        res.status(500);
        throw new Error(`Failed to confirm connection request: ${error.message}`);
    }
});

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({ _id: { $ne: req.user.id } }).select("username email");
    res.status(200).json(users);
});

module.exports = {
    sendConnectionRequest,
    getPendingRequests,
    confirmConnectionRequest,
    getAllUsers,
};
