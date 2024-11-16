const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    chatName:{
        type: String, 
        trim: true
    },
    isGroupChat:{
        type: Boolean,
        default: false
    },
    // Mang luu danh sach user, lấy id từ bảng user
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    latesMessage:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    },
    groupAdmin:{
        type: mongoose.Schema.Types.ObjectId, // lay id tu bang user
        ref: "User",
    }
},{
    timestamps:true,
}
);

module.exports = mongoose.model("Chat", chatSchema);