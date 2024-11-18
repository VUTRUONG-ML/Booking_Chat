
import { Box } from "@chakra-ui/react";
import { ChatState } from "../../Context/ChatProvider";
import SideDrawer from "../../component/miscellaneous/SideDrawer";
import MyChats from "../../component/MyChats";
import ChatBox from "../../component/ChatBox";
import './Chat.scss';
const Chat = () => {
    const { user } = ChatState();
    return (
    <div style={{ width: "100%" }} className="Chat">
        {user && <SideDrawer/>}
        <Box display='flex' justifyContent='space-between' w='100%' h="91.5vh" padding='10px'>
            {user && <MyChats/>}
            {user && <ChatBox/>}
        </Box>
    </div>
    );
    
};

export default Chat
