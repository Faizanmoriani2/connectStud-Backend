const express = require("express")
const errorHandler = require("./middleware/errorHandler")
const connectDb = require("./config/dbConnection")
const dotenv = require("dotenv").config()
const cors = require("cors")
const port = process.env.PORT ||  5000
const path = require('path')
connectDb()
const app = express()

//internal middleware to handle json respone req.body
app.use(express.json())

app.use(cors())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static('uploads'));
app.use("/api/users", require("./routes/userRoutes"))
app.use('/api/communities', require("./routes/communityRoutes"));
app.use('/api/events', require("./routes/eventRoutes"))
app.use('/api/posts', require("./routes/postRoutes"))
app.use('/api/comments', require("./routes/commentRoutes"));

app.use(errorHandler)

app.listen(port, () => console.log(`App running on port: ${port}`))
