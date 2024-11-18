const chatModel = require("../models/chatModel");
const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");


const accessChat = expressAsyncHandler( async (req, res) => {
    const {userId} = req.body;
    if(!userId){
        console.log("User request not found");
        return res.status(400).json({ message: "User ID is required!" });;
    }
    
    var isChat = await chatModel.find({
        isGroupChat: false,
        $and : [
            { users: {$elemMatch: { $eq: req.user._id }}},  // tim doan chat cua nguoi dùng hiện tại 'req.user._id' khi đã đăng nhập
            { users: {$elemMatch: { $eq: userId }}},        // với userId truyền vào 
        ],
    })
    .populate("users", "-password")
    .populate("latesMessage");

    isChat = await User.populate(isChat, {
        path: "latesMessage.sender",
        select: "name pic email",
    });

    if(isChat.length > 0){
        res.send(isChat[0]);
    }else{
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId],
        };

        try {
            const createChat = await chatModel.create(chatData);

            const fullChat = await chatModel.findOne({ _id: createChat._id }).populate("users", "-password"); // tìm lại cuộc trò chuyện vừa tạo 
            res.status(200).send(fullChat);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
});

const fetchChats = expressAsyncHandler( async(req, res) => {
    try {
        chatModel.find({ users: { $elemMatch: { $eq: req.user._id }}})
            .populate("users", "-password") // Hiển thị bảng user không hiển thị hàng password
            //.populate("groupAdmin", "-password")
            .populate("latesMessage")
            .sort({updateAt: -1})
            .then( async (result) =>{
                result = await User.populate(result, {
                path: "latesMessage.sender",
                select: "name pic email",
                });
                res.status(200).send(result);
            });
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

const createGroupChat = expressAsyncHandler( async(req, res) => {
    if(!req.body.users || !req.body.name) {
        return res.status(400).send({message: "Please fill all the feilds"});
    }
    
    var users = JSON.parse(req.body.users);
    if(users.length < 2){
        return res.status(400).send("More than 2 users are required to from a group chat");  
    }

    users.push(req.user); // them thong tin nguoi dang dang nhap 

    try {
        const groupChat = await chatModel.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
        });

        //Sau khi tạo group chat thì giờ hiển thị ra group chat đó luôn 
        const fullGroupChat = await chatModel.findOne({_id: groupChat._id})
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

            res.status(200).json(fullGroupChat);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }

});

const renameGroupChat =  expressAsyncHandler( async(req, res) => {
    const {chatId, chatName} = req.body;

    const updateChat = await chatModel.findByIdAndUpdate(
        chatId,
        {
            chatName,
        },
        {
            new: true,
        }
    )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
    if(!updateChat){
        res.status(400);
        throw new Error("Chat not found!");
    }else{
        res.status(200).json(updateChat);
    }
});

const addToGroup = expressAsyncHandler( async(req, res) => {
    const {chatId, userId} = req.body;

    const added = await chatModel.findByIdAndUpdate(
        chatId,
        {
            $push: {users : userId},
        },
        {
            new: true,
        }
    )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

    if(!added){
        res.status(400);
        throw new Error("Chat not found!");
    }else{
        res.status(200).json(added);
    }
});

const removeFromGroup = expressAsyncHandler( async(req, res) => {
    const {chatId, userId} = req.body;

    const removed = await chatModel.findByIdAndUpdate(
        chatId,
        {
            $pull: {users : userId},
        },
        {
            new: true,
        }
    )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

    if(!removed){
        res.status(400);
        throw new Error("Chat not found!");
    }else{
        res.status(200).json(removed);
    }
});
module.exports = {
    accessChat,
    fetchChats,
    createGroupChat,
    renameGroupChat,
    addToGroup,
    removeFromGroup
};
