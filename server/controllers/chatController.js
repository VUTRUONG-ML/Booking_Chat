const chatModel = require("../models/userModel");


const getChat = (req, res) => {
    const messages = [
        "Hello, this is message 1!",
        "Here's another message!",
        "Chat API is working!",
        "Have a nice day!"
    ];
    res.json(messages);
}

module.exports = {
    getChat
};
