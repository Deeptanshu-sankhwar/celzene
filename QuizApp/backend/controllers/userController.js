const User = require('../models/userModel');
const jwt = require('jsonwebtoken')

const secretKey = "hello"

// Generate a token
const generateToken = (id) => {
    return jwt.sign({ id: id }, secretKey, {
        expiresIn: '24h'
    })
}

// Creating a new user with a given name and email
exports.signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // user is a mongodb document
        const user = new User({
            name: name,
            email: email,
            password: password
        });
    
        // save this user inside mongodb. We are inserting the user mongodb document inside User mongoDb collectin
        await user.save();
    
        // generate the token for this user who has just been registered on the library management system
        const token = generateToken(user._id)
    
        res.status(201).json({
            success: true,
            token: token,
            data: user
        })
    } catch (err)   {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // mongoDb operation to find the user
        const user = await User.findOne({ email: email })

        if (user && (await user.matchPassword(password)))   {
            const token = generateToken(user._id);

            res.json({
                success: true,
                token: token,
                data: user
            })
        }
    } catch (err)   {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
