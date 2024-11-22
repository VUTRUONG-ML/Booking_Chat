const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const expressAsyncHandler = require("express-async-handler");

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
      return res.status(404).json({ message: "User  not found!" });
    }

    // Kiểm tra thuộc tính isAdmin
    if (!user.isAdmin) {
      return res.status(403).json({ message: "User  not admin!" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ message: "Invalid token!" });
  }
}

const protect = expressAsyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});


module.exports = {
  auth,
  protect
}
