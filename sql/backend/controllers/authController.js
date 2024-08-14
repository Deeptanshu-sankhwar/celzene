const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const { generateToken } = require('../config/auth')

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

// [X] Create a variable isNewUserAdded to be stored inside Redis
// [X] Update this variable during insertion of a user
// [X] In get all users, fetch the user based upon the value of this variable


exports.register = async (req, res) => {
    // We are parsing the request body
    const { name, email, password, role, age } = req.body;

    // create the new variable isNewUserAdded and set it to true
    await client.set('isNewUserAdded', 'true')

    try {
        // We are hashing password
        const hashedPassword = await bcrypt.hash(password, 10)

        // We are inserting a user inside SQL database
        User.create({name, email, password: hashedPassword, role, age}, async (err, user) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, message: err.message });
            }

            // We need to insert this same user inside Redis as well
            const userRedis = JSON.stringify({name, email, password: hashedPassword, role, age})
            try {
                await client.sAdd('users', userRedis);
                await client.set('isNewUserAdded', 'false')
            } catch (err)   {
                return res.status(500).json({
                    success: false,
                    message: 'Error while inserting user inside Redis'
                })
            }

            const token = generateToken(user);

            res.status(201).json({
                success: true,
                token: token,
                data: user
            })
        });

    } catch (err)   {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      User.findByEmail(email, async (err, user) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ success: false, message: 'Server error' });
        }
  
        if (!user) {
          return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
  
        const checkPasswordMatching = await bcrypt.compare(password, user.password);
  
        if (!checkPasswordMatching) {
          return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
  
        const token = generateToken(user);
  
        res.status(200).json({
          success: true,
          token: token,
          data: user
        });
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: err.message
      });
    }
  };