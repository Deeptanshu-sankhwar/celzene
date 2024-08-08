const express = require('express'); // npm install express

var cors = require('cors')
const redis = require('redis');
// My goal is to integrate my Redis cluster into my Node JS server

const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express();

// create my redis connection cluster configs here
const client = redis.createClient();
// by default my redis client is gonna connect to 127.0.0.1, 6379, '', '', 0

// Add a redis event listener which tells me whenever there is an error connecting to my redis cluster
client.on('error', (err) => {
    console.log("There was an error connecting to my redis cluster", err)
})

// connect to the redis cluster
client.connect();

// middleware
app.use(express.json());
app.use(cors())

const port = 4040

app.get('/ping', (req, res) => {
    res.send('Pong')
})

// Create some endpoints to perform  operations on Redis Cluster
// [X] Create an endpoint for creating a string key-value pair
// [X] Create an endpoint for getting a string key
// [X] Create an endpoint for deleting a string key-value pair
// [X] Create an endpoint for inserting a list key value
// [X] Create an endpoint for fetching a list key values
// [X] Create an endpoint for inserting a set key values
// [X] Create an endpoint for getting the set key values
// [X] Create an endpoint for inserting hash values
// [X] Create an endpoint for getting all the fields-values of a hash
// [X] Create an endpoint for getting the values only of a given hash field

app.post('/set', async (req, res) => {
    const { key, value } = req.body;

    try {
        await client.set(key, value)

        res.status(201).json({
            success: true,
            data: {
                key,
                value
            }
        })
    } catch (err)   {
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

app.get('/get/:key', async (req, res) => {
    const { key } = req.params;

    try {
        const data = await client.get(key)

        res.status(200).json({
            success: true,
            data: data
        })
    } catch (err)   {
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

app.delete('/del/:key', async (req, res) => {
    const { key } = req.params;

    try {
        const data = await client.del(key);

        res.status(200).json({
            success: true,
            data: data
        })
    } catch (err)   {
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

app.post('/rpush', async (req, res) => {
    const { key, values } = req.body;

    try {
        const data = await client.rPush(key, values);
        
        res.status(200).json({
            success: true,
            data: data
        })
    } catch (err)   {
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

app.get('/lrange/:key', async (req, res) => {
    const { key } = req.params;
    const { start, end } = req.query;

    try {
        const data = await client.lRange(key, start, end);

        res.status(200).json({
            success: true,
            data: data
        })
    } catch (err)   {
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

app.post('/sadd', async (req, res) => {
    const { key, values } = req.body;

    try {
        const data = await client.sAdd(key, values);

        res.status(201).json({
            success: true,
            data: data
        })
        
    } catch (err)   {
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

app.get('/smembers/:key', async (req, res) => {
    const { key } = req.params

    try {
        const data = await client.sMembers(key)

        res.status(200).json({
            success: true,
            data: data
        })
    } catch (err)   {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

app.post('/hset', async (req, res) => {
    const { key, field, value } = req.body;

    const pairs = [];
    for (let i = 0; i < field.length; i++) {
        pairs.push(field[i])
        pairs.push(value[i])
    }

    try {
        const data = await client.hSet(key, pairs);

        res.status(201).json({
            success: true,
            data: data
        })
    } catch (err)   {
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

app.get('/hgetall/:key', async (req, res) => {
    const { key } = req.params;

    try {
        const data = await client.hGetAll(key);

        res.status(200).json({
            success: true,
            data: data
        })
    } catch (err)   {
        console.error(err)
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

app.get('/hget/:key', async (req, res) => {
    const { key } = req.params
    const { field } = req.query

    try {
        const data = await client.hGet(key, field)

        res.status(200).json({
            success: true,
            data: data
        })
    } catch (err)   {
        console.error(err);
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);


// listen on port 4040 and start my server
app.listen(port, () => {
    console.log("My server has started on the port " + port)
})


// 201 -> Created successfully
// 500 -> Internal Server Error
// 401 -> Unauthorised 
// 200 -> OK
// 404 -> Not Found