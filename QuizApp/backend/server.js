const express = require('express'); // npm install express

const mongoose = require('mongoose'); // npm install mongoose
var cors = require('cors')

const app = express();

// middleware
app.use(express.json());
app.use(cors())

const port = 5789

const mongoUrl = "mongodb+srv://celzene:celzene@cluster0.6e2alkk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

// Connect to MongoDB
mongoose.connect(mongoUrl, {});

// Event listeners for MongoDB connection
mongoose.connection.on('connected', () => {
    console.log("Connected to MongoDB successfully");
})

const userRoutes = require('./routes/userRoute')
const questionRoutes = require('./routes/questionRoute')
const gameRoutes = require('./routes/gameRoute')

app.use('/api/user', userRoutes)
app.use('/api/question', questionRoutes)
app.use('/api/game', gameRoutes)

// listen on port 5000 and start my server
app.listen(port, () => {
    console.log("My server has started on the port " + port)
})