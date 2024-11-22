const expressAsyncHandler = require("express-async-handler");
const messageModel = require("../models/messageModel");
const userModel = require("../models/userModel");
const chatModel = require("../models/chatModel");

const sendMessage = expressAsyncHandler ( async(req, res) => {
    const {content, chatId} = req.body;
    if(!content || !chatId){
        console.log("Invalid data passed into request");
        return res.sendStatus(400);
    }

    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId,
    };

    try {
        var message = await messageModel.create(newMessage);

        message = await message.populate("sender", "name pic");
        message = await message.populate("chat");
        message = await userModel.populate(message, {
            path: 'chat.users',
            select: "name email pic",
        });

        await chatModel.findByIdAndUpdate(req.body.chatId,{
            latesMessage: message,
        })

        res.json(message);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

const allMessage = expressAsyncHandler( async(req, res) => {
    try {
        const message = await messageModel.find({ chat : req.params.chatId})
            .populate("sender", "name pic email")
            .populate("chat");
        res.json(message);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});
module.exports = { 
    sendMessage,
    allMessage,
}