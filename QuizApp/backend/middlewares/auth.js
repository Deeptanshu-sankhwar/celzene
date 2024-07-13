const jwt = require('jsonwebtoken'); // npm install jsonwebtoken

const secretKey = "hello"

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))    {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, secretKey)
            req.user = decoded;
            next();

        } catch (error) {
            res.status(401).json({
                success: false,
                message: error.message
            })
        }
    }
    if (!token) {
        res.status(401).json({
            message: 'Token is invalid or expired'
        })
    }
}

module.exports = { protect }
