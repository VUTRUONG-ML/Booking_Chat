import { Tooltip } from "../../components/ui/tooltip"
import { Box, Button,Spinner,Text, useDisclosure,   } from '@chakra-ui/react';
import React, { useState } from 'react'
import { FaBell } from "react-icons/fa";
import { ChatState } from "../../Context/ChatProvider";
import { MenuContent, MenuItem,MenuRoot,MenuTrigger,} from "../../components/ui/menu"
import { useNavigate  } from "react-router-dom";
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/ui/drawer";
import { Input, Stack } from "@chakra-ui/react"
import { toaster, Toaster } from "../../components/ui/toaster"
import axios from "axios";
import ChatLoading from "../ChatLoading"; 
import UserListItem from "../UserClientAvatar/UserListItem";
import { getSender } from "../../config/ChatLogic";
import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';

const SideDrawer = () => {
    const { user, setSelectedChat, chats, setChats, notification,setNotification } = ChatState();
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);

    const {isOpen, onOpen} = useDisclosure();
    const navigate = useNavigate(); 
    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        navigate("/");
    };

    const handleSearch = async () =>{
        if(!search){
            toaster.create({
                title: "Please Fill all the feilds",
                type: "warning",
                placement:"bottom-end"
            });
            return; 
        }

        try {
            setLoading(true)

            const config = {
                headers: {
                    Authorization: `Bearer ${user?.token || ''}`,
                },
            };

            const {data} = await axios.get(`/api/userClient?search=${search}`, config);

            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            toaster.create({
                title: "Error Occured",
                description: "Failed to Load the Search Results",
                type: "error",
                placement:"bottom-end"
            });
        }

    };

    const accessChat = async(userId) => {
        
        try {
            setLoadingChat(true);
            const config = {
                headers: {
                    "Content-type":"application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const {data} = await axios.post('/api/chat', {userId}, config);
            if(!chats.find((c) => c._id === data._id)) {
                setChats([data, ...chats]);
            }

            setSelectedChat(data);
            
            setLoadingChat(false);
           
        } catch (error) {
            toaster.create({
                title: "Error fetching the chat",
                description: error.message,
                type: "error",
            });
            setLoadingChat(false);
        }
    };
    return <>

        <Toaster/>
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            bg="white"
            w="100%"
            padding="5px 10px 5px 10px"
            borderWidth="5px"
        >
            <Tooltip
                label="Search Users to chat"
                hasArrow
                placement="bottom-end"
            >
                
                <DrawerRoot placement="start" size="xs" isOpen={isOpen} >
                    <DrawerTrigger asChild>
                        <Button variant="ghost"  onClick={onOpen}> 
                            <i class="fa-solid fa-magnifying-glass"></i>
                            <Text display={{ base: "none", md: "flex"}} px="4">Search User</Text>
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle >Search User</DrawerTitle>
                        </DrawerHeader>
                        <DrawerBody>
                            <Box display="flex" pb={2}>
                                <Input
                                    placeholder="Search by name or email" 
                                    mr={2}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}    
                                />
                                <Button onClick={handleSearch}>
                                    Go
                                </Button>
                            </Box>
                            {loading ? 
                                (
                                    <ChatLoading/>
                                ) : 
                                (
                                    searchResult?.map(user => (
                                        <UserListItem
                                            key={user._id}
                                            user={user}
                                            handleFunction = {() => accessChat(user._id)}
                                        />
                                    ))
                                )
                            }
                            {loadingChat && <Spinner ml="auto" display="flex" />}
                        </DrawerBody>
                        <DrawerFooter>
                        <DrawerActionTrigger asChild>
                            <Button variant="outline" >Cancel</Button>
                        </DrawerActionTrigger>
                        <Button>Save</Button>
                        </DrawerFooter>
                    </DrawerContent>
                </DrawerRoot>    
            </Tooltip>
            <Text d="inline-block" flex="1" fontSize="2xl" textAlign="center" right='10px'>
                Support
            </Text>
            <div>
                <MenuRoot p={1}>
                    <MenuTrigger asChild>
                        <Button variant="outline" size="sm"  >
                            <FaBell />
                            <NotificationBadge
                                count = {notification.length}
                                effect={Effect.SCALE}
                            />
                            
                        </Button>
                    </MenuTrigger>
                    <MenuContent style={{ paddingRight: '20px' }}>
                        {!notification.length && "No New Messages"}
                        {notification.map(notif => (
                            <MenuItem key={notif._id} onClick={() => {
                                setSelectedChat(notif.chat);
                                setNotification(notification.filter((n) => n !== notif));
                            }}
                            >
                                {notif.chat?.isGroupChat === true ? `New Message in ${notification.chat.chatName}` : `New Message from ${getSender(user, notif.chat.users)}`}
                            </MenuItem>
                        ))}
                    </MenuContent>
                 </MenuRoot>

                <Button variant="outline" size="sm" borderRadius="md" w="80px" onClick={logoutHandler}>
                    Logout
                </Button>
            </div>

        </Box>
    </>
}

export default SideDrawer