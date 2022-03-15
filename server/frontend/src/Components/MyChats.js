import React, {useEffect,useState }from "react";
import { Box, Button, Stack, useToast, Text } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import { getSender } from "../Context/chatLogics";
import ChatLoading from "./ChatLoading";
import axios from "axios";
import GroupChatCreate from "./GroupChatCreate";


const MyChats = ({fetchAgain}) => {
    const [loggedUser, setLoggedUser] = useState();
    const {selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

    const toast = useToast();

    const fetchChats = async () => {
        try {
            const config = {
                headers: {
                    Authorization : `Bearer ${user.token}`,
                },
            };
        
            const {data} = await axios.get("/api/chat",config);
            setChats(data);
        } catch (error) {
            toast({
                title : "Error Occured",
                description: "Failed to load Chats",
                status: "error",
                duration : 5000,
                isClosable : true,
                position : "bottom-left",
            });
            
        }
    };
    
   useEffect(() => {
            setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
            fetchChats();

    },[fetchAgain]);



    return ( 
    <Box
    d = {{ base: selectedChat ? "none" : "flex", md: "flex"}}
   flexDir = "column" 
   alignItems = "center"
   p = {3}
   bg = "white"
   w = {{ base: "30%"}}
   borderRadius = "lg"
   borderWidth = "1px"
    >
<Box 
pb = {3}
px = {3}
d = "flex"
w = "100%"
fontSize = {{ base: "20px", md: "25px"}}
justifyContent= "space-between"
alignitems = "center"
> Chats
<GroupChatCreate>

<Button d = "flex"
fontSize = {{base: "17px", md : "10px", lg : "17px"}}
>
    New Group Chat
</Button>
</GroupChatCreate>
</Box>
<Box
d = "flex"
flexDir = "column"
p = {3}
bg ="#68D391"
w = "100%"
h = "100%"
borderRadius="lg"
overFlowY = "hidden">
    {chats ? (
        <Stack overflowY = 'scroll'>
            {chats.map((chat)=> (
                <Box
                onClick={()=> setSelectedChat(chat)}
                cursor = "pointer"
                bg={selectedChat === chat ? "white" : "green"}
                color = {selectedChat === chat ? "black" : "white"}
                px = "3"
                py = "2"
                borderRadius="lg"
                key = {chat._id}>
                    <Text>
                        {!chat.isGroupChat ? ( getSender(loggedUser,chat.users)) : chat.chatName}
                    </Text>
                </Box>
            ))}
        </Stack>
    ) :
    (
        <ChatLoading/>
    )}

</Box>
</Box>
    )
};

export default MyChats;