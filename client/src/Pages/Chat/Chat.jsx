import { Button } from "@chakra-ui/react"
import axios from "axios";
import { useEffect, useState } from "react";
const Chat = () => {
    const [chats, setChats] = useState([]);

    const fetchChats = async () => {
        const {data} = await axios.get("/api/chat");
        setChats(data);
    };
    
    useEffect(() => {
        fetchChats();
    }, []);
    return <div> {chats.map((chat, index) => <div key={index}>{chat}</div>)} </div>;
    
};

export default Chat
