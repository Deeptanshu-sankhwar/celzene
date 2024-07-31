const express = require('express'); // npm install express

var cors = require('cors')

const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express();

// middleware
app.use(express.json());
app.use(cors())

const port = 4040

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);


// listen on port 4040 and start my server
app.listen(port, () => {
    console.log("My server has started on the port " + port)
})
