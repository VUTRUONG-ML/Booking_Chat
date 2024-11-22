const dotenv = require("dotenv").config();
const express = require("express");
const { errorHandler, notFound } = require("./middleware/errorHandler");
const app = express();
const connectDB = require("./config/db");
const roomRoutes = require("./routes/roomRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const userRoutes = require("./routes/userRoutes");
const userClientRoutes = require("./routes/userClientRoutes");
const chatRoute = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

const cookieParser = require("cookie-parser");
const { auth } = require("./middleware/authMiddleware");
const port = process.env.PORT || 5000;
//connect to database
connectDB();

//setup middlewares
app.use(cookieParser());
app.use(express.json()); // To accept JSON Data
require("dotenv").config();



//setup routes
app.use("/auth", auth)
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoute);
app.use("/api/message", messageRoutes);

app.use("/api/userClient", userClientRoutes);


app.use(notFound);
app.use(errorHandler);


const server = app.listen(port, () => console.log(`listening on on port ${port}`));

const io = require('socket.io')(server,{
    pingTimeout: 60000,
    cors:{
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket)=>{
    console.log('connected to socket.io');
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
    });

    socket.on('join chat', (room) =>{
        socket.join(room);
        console.log('User Joined Room: ' + room);
    });

    socket.on('typing',(room) => socket.in(room).emit('typing'));
    socket.on('stop typing',(room) => socket.in(room).emit('stop typing'));


    socket.on('new message', (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;
        console.log("Chat data:", chat);
        if(!chat.users) {return console.log('chat.users not defined'); }
        chat.users.forEach(user => {
            if(user._id == newMessageRecieved.sender._id) return; 
            socket.in(user._id).emit("message recieved", newMessageRecieved); 
        });
    })

    socket.off("setup", ()=>{
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
    });
}); 