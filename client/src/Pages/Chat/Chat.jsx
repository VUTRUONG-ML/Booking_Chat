import { Box } from "@chakra-ui/react";
import { ChatState } from "../../Context/ChatProvider";
import SideDrawer from "../../component/miscellaneous/SideDrawer";
import MyChats from "../../component/MyChats";
import ChatBox from "../../component/ChatBox";
import './Chat.scss';
import { useState } from "react";

const Chat = () => {
    const { user } = ChatState();
    const [fetchAgain, setFetchAgain] = useState(false);
    return (
        <div className="background">

            {user && <SideDrawer />}
            <Box className="chat-container">
                {user && <MyChats fetchAgain={fetchAgain} />}
                {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
            </Box>

        </div>
    );
};

export default Chat;