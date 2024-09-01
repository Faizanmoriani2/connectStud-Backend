const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');
const dotenv = require('dotenv').config();
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const Chat = require('./models/ChatModel');
const Message = require('./models/messageModel');

connectDb();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["*", "http://localhost:5173"], // replace with your frontend URL
        methods: ["GET", "POST"],
    },
});

// Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/communities', require('./routes/communityRoutes'));
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/comments', require('./routes/commentRoutes'));
app.use('/api/connections', require('./routes/connectionRoutes'));
app.use('/api/chats', require('./routes/chatRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/newsfeed', require('./routes/newsfeedRoutes'))
app.use(errorHandler);

// Socket.IO connection
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('joinChat', (chatId) => {
        socket.join(chatId);
        console.log('User joined chat:', chatId);
    });

    socket.on('sendMessage', async ({ chatId, senderId, message }) => {
        const newMessage = new Message({ chatId, sender: senderId, message });
        await newMessage.save();

        io.to(chatId).emit('receiveMessage', newMessage);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server running on port ${port}`));
