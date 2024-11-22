import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatProvider';
import axios from 'axios';
import { toaster, Toaster } from '../components/ui/toaster';
import { Box, Button, Stack, Text } from '@chakra-ui/react';
import ChatLoading from './ChatLoading'
import { getSender } from '../config/ChatLogic';
const MyChats = ({ fetchAgain }) => {
    const [ loggedUser, setLoggedUser] = useState();
    const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState() || {};

    const fetchChats = async () => {
      // console.log(user._id);
      if (!user || !user.token) {
          console.error("User is not authenticated.");
          return;
      }
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        const {data} = await axios.get("/api/chat", config);
        console.log(data);
        setChats(data);
      } catch (error) {
        toaster.create({
          title: "Error Occured!",
          description: "Faild to Load the chats",
          type: "error",
          placement: "bottom"
        });
      }
    };

    useEffect(() => {
      setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
      fetchChats();
    }, [ fetchAgain]);
  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{base: "100%", md: "31%"}}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Toaster/>
      <Box
        pb={3}
        px={3}
        fontSize={{base: "28px", md: "30px"}}
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat? (
                    getSender(loggedUser, chat.users)
                  ) : (chat.chatName)}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading/>
        )}
      </Box>
    </Box>
  )
}

export default MyChats