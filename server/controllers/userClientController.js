const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const jwt = require("jsonwebtoken")
const registerUser = expressAsyncHandler(async (req, res) => {
    const {name, email, password, pic, isAdmin} = req.body;
    //Kiem tra nguoi dung co nhap thong tin hay ko
    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please Enter all the Feilds");
    }

    //Kiem tra xem tai khoan da ton tai chua
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error("User already exists");
    }
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(password, salt);
    //Neu khong ton tai thi nhap thong dang ki
    const user = await User.create({
        name, 
        email,
        password : hashedPassword,
        pic,
        isAdmin: false,
    })
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic, 
            token: generateToken(user._id), 
        });
    } else{
        res.status(400);
        throw new Error("Failed to Create the User");
    }
});

const authUser = expressAsyncHandler(async (req, res, next) => {
    try {
        //todo user joi to validate data
        const { email, password } = req.body;
        // get user from database
        const user = await User.findOne({ email });

        if (!user) {
            res.status(400);
            throw new Error("user not found!");
        }
        //compare the password
        const isCorrect = await bcrypt.compare(password, user.password);
        if (!isCorrect) {
            res.status(400);
            throw new Error("incorrect password!");

        }
        //generate token set 
        //set cookie
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.cookie("jwt", token);

        const { password: userPassword, ...rest } = user._doc;
        return res.status(201).json({
            ...rest,
            isAdmin: user.isAdmin,
            token: generateToken(user._id), 
        });
    } catch (error) {
        next(error);
    }
});

// /api/userClient?search=lebar
const allUsers = expressAsyncHandler( async(req, res) => {
    const keyword = req.query.search 
        ? {
            $or: [
                { name: { $regex: req.query.search, $options: "i"}},
                { email: { $regex: req.query.search, $options: "i"}},
            ],
        }
        : {};
    const users = await User.find(keyword).find({_id: { $ne: req.user._id } }); // Tìm tất cả người dùng của keyword trên bỏ qua người dùng hiện tại
    res.send(users);
});

// /api/userClient/admins
const adminUsers = expressAsyncHandler(async (req, res) => {
    try {
        // Tìm tất cả user có isAdmin = true
        const users = await User.find({ 
            isAdmin: true,
            _id: { $ne: req.user._id } // Loại trừ user hiện tại
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy danh sách admin", error: error.message });
    }
});

module.exports = {
    registerUser,
    authUser,
    allUsers,
    adminUsers,
}