const User = require('../models/userModel');

const redis = require('redis');

// create my redis connection cluster configs here
const client = redis.createClient();
// by default my redis client is gonna connect to 127.0.0.1, 6379, '', '', 0

// Add a redis event listener which tells me whenever there is an error connecting to my redis cluster
client.on('error', (err) => {
    console.log("There was an error connecting to my redis cluster", err)
})

// connect to the redis cluster
client.connect();

exports.getAllUsers = async (req, res) => {
    const isNewUserAdded = await client.get('isNewUserAdded');

    try {
        if (isNewUserAdded == 'true')   {
            User.findAll(async (err, users) => {
                if (err)    {
                    console.error(err);
                    return res.status(500).json({ success: false, message: err.message });
                }
    
                return res.status(200).json({
                    success: true,
                    data: users
                })
            })
        }
        if (isNewUserAdded == 'false')  {
            // fetch and return all the users from Redis
            const users = await client.sMembers('users')

            return res.status(200).json({
                success: true,
                data: JSON.parse(users)
            })
        }

    } catch (err)   {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
};

exports.getUserById = (req, res) => {
    const { id } = req.params;
    try {
        User.findById(id, async (err, user) => {
            if (err)    {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: err.message
                })
            }
    
            res.status(200).json({
                success: true,
                data: user
            })
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })   
    }
};

exports.updateUser = (req, res) => {
    // Complete it
};

exports.deleteUser = (req, res) => {
    // Complete it
};
