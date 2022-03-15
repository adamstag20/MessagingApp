import { Box, Button, Tooltip, Text, Heading, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { ChatState } from '../Context/ChatProvider';
import { useDisclosure } from '@chakra-ui/hooks';
import { useToast } from "@chakra-ui/toast";
import ChatLoading from './ChatLoading';
import UserListItem from '../Context/UserListItem';
import axios from "axios";
const SideBar = () => {
    const {user, setSelectedChat, chats, setChats} = ChatState();
    let history = useHistory();
    const toast = useToast();
    const [search, setSearch] = useState();
    const [searchResult, setSearchResult] = useState([]); 
    const [loading, setLoading ] = useState(false);
    const [loadingChat, setLoadingChat ] = useState();
    const { isOpen, onOpen, onClose } = useDisclosure();

    // Logs Current User Out
    const logoutHandler = () => {
       localStorage.removeItem("userInfo");
       history.push("/");
    };

    const handleSearch = async () => {
        if (!search) {
            toast({
                title: "Please Enter Username to Search",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-left",
            });
            return;
        }
        try {
            setLoadingChat(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const {data} = await axios.get(`/users?search=${search}`,config);
            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            toast({
                title: "Error Occured",
                description: "Failed to Load the Search",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
            
        }

    };

    const accessChat = async (userId) => {
            try {
                setLoadingChat(true);

                const config = {
                 headers : {
                    "Content-type" : "application/json",
                    Authorization : `Bearer ${user.token}`,
                },
            };
            const {data} = await axios.post('/api/chat', {userId}, config);

            if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
            setSelectedChat(data);
            setLoadingChat(false);
            onClose();
        } catch(error){
            toast({
                title: "Error fetching Chat",
                description : error.message,
                status: "error",
                isClosable: true,
                duration: 5000,
                position: "bottom-left",
            });
        }
    };

    return (
        <>
        <Box>
            <Tooltip label="Search Users" hasArrow placement="bottom-end">
                <Button variant="ghost" onClick={onOpen}>
                    <i className ="fas fa-search"></i>
                    <Text d={{ base: "none", md: "flex" }} px='4'>Search</Text>
                </Button>
            </Tooltip>
        <Button onClick = {logoutHandler} colorScheme = "green" variant = 'outline' ml = "1100px">Log Out</Button>
        <Heading fontSize="2xl" ml = "580px">Leap Frog Chat </Heading>
        </Box>
       <Drawer placement='left' onClose={onClose} isOpen={isOpen} colorScheme="green">
          <DrawerOverlay></DrawerOverlay> 
          <DrawerContent>
              <DrawerHeader borderBottomWidth='1px'> Search Users</DrawerHeader>
          <DrawerBody>
              <Box d='flex' pb= {2}>
                  <Input placeholder ="Search username"
                  mr = {2}
                  value = {search}
                  onChange={(e) => setSearch(e.target.value)}/>
                  <Button 
                 onClick={handleSearch}
                  >Go</Button>
              </Box>
              {loading ? (<ChatLoading/> ) : 
              (
                  searchResult?.map((user) => (
                        <UserListItem
                            key = {user._id}
                            user = {user}
                            handleFunction={() => accessChat(user._id)} />
                  ))
              )}

          </DrawerBody>
        </DrawerContent>
           </Drawer> 
        </>
    )

}

export default SideBar;