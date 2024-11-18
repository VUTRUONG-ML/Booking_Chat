const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
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
            res.status(401).json({});
            throw new Error("User not found!");
        }
        //compare the password
        const isCorrect = await bcrypt.compare(password, user.password);
        if (!isCorrect) {
            res.status(401);
            throw new Error("incorrect password!");
        }
        //generate token set 
        //set cookie
        const token = generateToken(user._id);
        res.cookie("jwt", token);

        const { password: userPassword, ...rest } = user._doc;
        return res.status(201).json({
            ...rest,
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
module.exports = {
    registerUser,
    authUser,
    allUsers,
}