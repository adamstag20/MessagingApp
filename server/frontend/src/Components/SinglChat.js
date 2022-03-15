import { Box, FormControl, Input, Text } from "@chakra-ui/react";
import React , {useEffect, useState }from "react";
import { ChatState } from "../Context/ChatProvider";
import { getSender } from "../Context/chatLogics";
import axios from "axios";
import ScrollableChat from "./ScrollableChat";


const SingleChat = ({fetchAgain, setFetchAgain}) => {

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState();
    
    const { user, selectedChat, setSelectedChat } = ChatState();
    
    const fetchMessages = async () => {
        if (!selectedChat) return;

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const {data} = await axios.get(`/api/messages/${selectedChat._id}`, config);
            setMessages(data);
            
        } catch (error) {
            
        }
    };

    useEffect (() => {
        fetchMessages();
    }, [selectedChat]);

    const sendMessage = async (event) => {
        if(event.key === "Enter" && newMessage){
            try {
                const config = {
                    headers : {
                        "Content-Type" : "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                setNewMessage("");
                const {data} = await axios.post('/api/messages', {
                    content : newMessage,
                    chatId: selectedChat._id,
                }, config);
                setMessages([...messages, data]);
            } catch (error) {
                
            }
        }

    }
    const typingHandler = (e) => {
        setNewMessage(e.target.value);

    }
    return (
        <> 
        {selectedChat ? (
            <>
            <Text
            fontSize = {{base : "28px", md: "30px"}}
            pb = {3}
            px = {2}
            w = "100%"
            d = "flex"
            justifyContent={{ base: "space-between"}}
            alignItems = "center" >
                {(!selectedChat.isGroupChat ? (
                <>
                {getSender(user, selectedChat.users)}
                </>
            ) : (
                <> {selectedChat.chatName.toUpperCase()}</>
            ))}
                </Text>
                <Box
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
              <div display = "flex"
              flex-direction = "column"
              overflow-y = "scroll"
              scrollbar-width = "none">
                  <ScrollableChat messages = {messages} />
              </div>
              <FormControl onKeyDown={sendMessage} isRequired mt = {3}>
                  <Input variant = "filled"
                  bg = "#E0E0E0"
                  placehodler = "Enter Message"
                  onChange={typingHandler}
                  value = {newMessage}></Input>
                

              </FormControl>
          </Box>
                </>
            ) : (
            <Box d = "flex" alignItems = "center" justifyContent = "center" h = "100%">
            <Text fontSize = "3xl" pb = {3} > Click On User to Chat</Text>
        
            </Box>
            

        )}
        </>
        );

};

export default SingleChat;