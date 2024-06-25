// Library Management System: Role: Admin, Student, Teacher

// [X] we need to encrypt the password before storing inside the database - decrypt password using a secret key
// [X] make the apis protected - security layer 2
// [X] authorise the APIs - data is restricted to every user - jwt token! (json web token) - security layer 3
// [X] role level authorisation
// [X] error handling / exception handling
// [X] Pagination and filtering at an API level - 40000 posts - NO, 40, 40, 40..... reached rock bottom of the number 40,000
// [] soft delete and hard delete
// [X] middleware

// file uploading
// validations
// Websockets!

// 5,000,000 users = 5,000,000 * 0.2 = 1,000,000kB = 1000mB = 1gB
// 3,000,000,000 users = 3,000,000,000 * 0.2 = 6,000,000,000kB = 6,000,000mB = 6000gB 1
// 100 users = 100 * 0.2 = 20kB -> 20kB -> 20 kB 2
// 5 - 1kB ~ 1 - 0.2kB

// google and understand the difference between authentication and authorization

const express = require('express'); // npm install express

// import mongoose package - has functions required to perform operations in mongodb starting all the way connecting to the cluser to making changes in the data
const mongoose = require('mongoose'); // npm install mongoose

const app = express();

// middleware
app.use(express.json());

const port = 4000

const mongoUrl = "mongodb+srv://consultingleera:SY1RX8KXb8cwP8Bu@cluster0.frz9sdy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

// Connect to MongoDB
mongoose.connect(mongoUrl, {});

// Event listeners for MongoDB connection
mongoose.connection.on('connected', () => {
    console.log("Connected to MongoDB successfully");
})

const userRoutes = require('./routes/userRoute')

app.use('/api', userRoutes)

// listen on port 8080 and start my server
app.listen(port, () => {
    console.log("My server has started on the port " + port)
})
