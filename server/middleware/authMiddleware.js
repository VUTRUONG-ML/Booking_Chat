const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Not authorized!" });
        }

        // Verify token  
        const data = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(data.id);
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error.message);
        return res.status(401).json({ message: "Invalid token!" });
    }
};

module.exports = {
    auth,
};