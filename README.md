
# ConnectStud Backend

## Project Overview

ConnectStud is a FYP - Project. Its platform that connects users. This backend service is built using Node.js, Express, and MongoDB. It provides APIs for user authentication, connection requests, messaging, and other core functionalities necessary for the platform.

## Features

- **User Authentication:** Secure user registration and login using JWT tokens.
- **Connection Requests:** Users can send, accept, or decline connection requests.
- **Messaging:** Real-time messaging between connected users, with chat history.
- **Event Management:** Create, edit, and view events.
- **Community Features:** Join or leave communities, post content, and interact within communities.

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/connectstud-backend.git
   cd connectstud-backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```


4. **Configure environment variables:**

   - Create a `.env` file in the root directory and configure the following variables:

     ```
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

    - Or You can use existing MongoDB:

    ```
    PORT=5000
    CONNECTION_STRING="mongodb+srv://admin:admin@faizancluster.ftags8a.mongodb.net/connectStud-backend?retryWrites=true&w=majority&appName=FaizanCluster/connectStud-backend"
    ACCESS_TOKEN_SECRET=your_jwt_secret
     ```

## Environment Variables

| Variable   | Description                            | Example                       |
|------------|----------------------------------------|-------------------------------|
| `PORT`     | Port on which the server will run      | 5000                          |
| `MONGO_URI`| MongoDB connection string              | mongodb://localhost:27017/connectstud |
| `JWT_SECRET`| Secret key for JWT authentication      | your-secret-key               |

## API Endpoints

### User Authentication

- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/login` - User login

### Connections

- **GET** `/api/connections/requests` - Get all connection requests for the logged-in user
- **POST** `/api/connections/requests` - Send a connection request
- **POST** `/api/connections/requests/confirm` - Confirm or decline a connection request

### Messaging

- **GET** `/api/messages/:userId` - Get chat history with a specific user
- **POST** `/api/messages/send` - Send a message to a user

### Events

- **GET** `/api/events/:id` - Get event details by ID
- **POST** `/api/events` - Create a new event

### Communities

- **POST** `/api/communities/join` - Join a community
- **POST** `/api/communities/leave` - Leave a community
- **POST** `/api/communities/post` - Post content in a community

## Usage

1. **Start the server:**

   ```bash
   npm start
   ```

   The server will run on `http://localhost:5000`.

2. **API Testing:**

   Use tools like Postman or cURL to test the APIs. Ensure you include the necessary JWT token in the `Authorization` header for protected routes.

