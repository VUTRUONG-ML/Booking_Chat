import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box, IconButton, Input, Spinner, Text, Timeline } from '@chakra-ui/react';
import { Field } from "../components/ui/field"
import { IoArrowBack } from "react-icons/io5";
import { getSender } from '../config/ChatLogic';
import axios from 'axios';
import { toaster, Toaster } from '../components/ui/toaster';
import "./style.css"
import ScrollableChat from './ScrollableChat';
import io from 'socket.io-client'
import Lottie from "lottie-react";
import animationData from '../animation/typing.json'

const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;


const SingleChat = ({fetchAgain, setFetchAgain}) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState();
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [socketConnected, setSocketConnected] = useState(false); 

    const {user, selectedChat, setSelectedChat, notification,setNotification} = ChatState();

const fetchMessage = async () => {
    if (!selectedChat) return;

    try {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        setLoading(true);
        const { data } = await axios.get(`/api/message/${selectedChat._id}`, config);
        
        setMessages(data);
        console.log("Messages fetched:", data);
    } catch (error) {
        toaster.create({
            title: "Error Occurred!",
            description: "Failed to fetch messages",
            type: "error", 
            placement: "bottom"
        });
    } finally {
        setLoading(false); // Đặt loading thành false ở đây
    }
};

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("setup", user);
        socket.on("connected", () => setSocketConnected(true));
        socket.on("typing", () => setIsTyping(true));
        socket.on("stop typing", () => setIsTyping(false));

        // Dọn dẹp khi component unmount
        return () => {
            socket.disconnect();
        };
    }, []);


    useEffect(() => {
        if (selectedChat) {
            fetchMessage();
            selectedChatCompare = selectedChat; // Cập nhật biến so sánh
        }
    }, [selectedChat]);

    
    useEffect(() => {
        socket.on('message recieved', (newMessageRecieved) => {
            console.log("Message received:", newMessageRecieved);
            if (!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id) {
                if (!notification.includes(newMessageRecieved)) {
                    setNotification([newMessageRecieved, ...notification]);
                    setFetchAgain(!fetchAgain);
                }
            } else {
                setMessages((prevMessages) => [...prevMessages, newMessageRecieved]); // Sử dụng callback để cập nhật state
            }
        });

        // Dọn dẹp khi component unmount hoặc selectedChatCompare thay đổi
        return () => {
            socket.off('message recieved');
        };
    }, [messages, selectedChatCompare]);

    const sendMessage = async(event) => {
        if(event.key==="Enter" && newMessage){
            socket.emit('stop typing', selectedChat._id);
            try {
                const config = {
                    headers:{
                        "Content-type": "application/json", 
                        Authorization: `Bearer ${user.token}`,
                    },
                };

 
                const {data} = await axios.post('/api/message',{
                    content: newMessage,
                    chatId: selectedChat._id,
                }, config);
                

                if (data) { // Check if data is valid
                    socket.emit('new message', data);
                    setMessages((prevMessages) => [...prevMessages, data]); // Use callback to ensure state is updated correctly
                    setNewMessage(""); // Clear the input after sending
                }
            } catch (error) {
                toaster.create({
                    title:"Error Occured!",
                    description: "Failed to send the Message",
                    type: "error",
                    placement:"bottom"
                });
            }
        }
    }

    const typingHandler = (e) => {
        setNewMessage(e.target.value);

        if (!socketConnected) return;

        if (!typing) {
            setTyping(true);
            socket.emit('typing', selectedChat._id);
        }
        
        let lastTypingTime = new Date().getTime();
        const timerLength = 3000;

        setTimeout(() => {
            const timeNow = new Date().getTime();
            const timeDiff = timeNow - lastTypingTime;

            if (timeDiff >= timerLength && typing) {
                socket.emit('stop typing', selectedChat._id);
                setTyping(false);
            }
        }, timerLength);
    };
    useEffect(() => {
        console.log("Is typing:", isTyping);
    }, [isTyping]);
  return (<>{
    selectedChat ? (
        <>
            <Text
                fontSize={{base: "28px", md: "30px"}}
                pb={3}
                px={2}
                w="100%"
                display="flex"
                justifyContent={{base:"space-between"}}
                alignItems="center"
            >
                <IconButton>
                    <IoArrowBack
                        display={{base:"flex", md:"none"}}
                        onClick={() => setSelectedChat("")}
                    />
                </IconButton>
                {!selectedChat.isGroupChat ? (
                    <>
                        {getSender(user, selectedChat.users)}
                    </>
                ) : (<>
                     <Text color="red.500" fontSize="sm">
                        Error: Unexpected group chat detected. Please check the model.
                    </Text>
                </>
            )}
            </Text>
            <Box
                display="flex"
                flexDir="column"
                justifyContent="flex-end"
                p={3}
                bg="#E8E8E8"
                w="100%"
                h="100%"
                borderRadius="lg"
                overflowY="hidden"
            >
                {loading ?(
                    <Spinner
                        size="xl"
                        w={20}
                        h={20}
                        alignContent="center"
                        margin="auto"
                    />
                ) :(
                    <div className='message'>
                        <ScrollableChat messages = {messages}/>
                    </div>
                ) }
                <Field onKeyDown={sendMessage} required style={{marginTop:"20px"}}>
                {isTyping ? <div>
                    <Lottie
                        animationData={animationData}
                        loop={true}
                        style={{ width: "50px", height: "50px", marginBottom: 15, marginLeft: 0 }}
                    />
                </div>: <></>} 
                    <Input
                        variant="filled"
                        bg="#E0E0E0"
                        placeholder="Enter a message..."
                        onChange={typingHandler}
                        value={newMessage}
                        focusBorderColor="blue.500" /* Đổi viền sang màu xanh khi nhấn */
                        border="1px solid #ccc" /* Viền mặc định */
                        _hover={{ borderColor: "blue.300" }} /* Hiển thị viền khi di chuột */
                        _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500" }} /* Kiểu viền khi nhấn vào */
                        borderRadius="md"
                    />
                </Field>
            </Box>
        </> 
    ) : (
        <Box display="flex" alignItems="center" justifyContent="center" h="100%">
            <Text fontSize="3xl" pb={3}>
                Click on a user to start chatting
            </Text>
        </Box>
    )
  }
  </>);
};

export default SingleChat