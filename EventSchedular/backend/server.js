const express = require('express');
const { connectToDatabase } = require('./db/mongodb')
const { PORT } = require('./constants/constant')
const cors = require('cors')

const eventRoutes = require('./routes/eventRoutes')

const app = express();

connectToDatabase();

// express middlewares
app.use(express.json());
app.use(cors());

// Define routes
app.use('/api', eventRoutes);

// starting my server
app.listen(PORT, () => console.log("server started on port" + PORT))