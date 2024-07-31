const User = require('../models/userModel');

exports.getAllUsers = (req, res) => {
    try {
        User.findAll(async (err, users) => {
            if (err)    {
                console.error(err);
                return res.status(500).json({ success: false, message: err.message });
            }

            res.status(200).json({
                success: true,
                data: users
            })
        })
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
