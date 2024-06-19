const express = require("express")
const errorHandler = require("./middleware/errorHandler")
const dotenv = require("dotenv").config()

const port = process.env.PORT ||  5000

const app = express()

//internal middleware to handle json respone req.body
app.use(express.json())

app.use("/api/users", require("./routes/userRoutes"))

app.use(errorHandler)

app.listen(port, () => console.log(`App running on port: ${port}`))