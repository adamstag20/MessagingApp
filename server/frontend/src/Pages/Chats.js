import React from "react";
import { ChatState } from "../Context/ChatProvider";
import SideBar from "../Components/sideBar";
import MyChats from "../Components/MyChats";
import { Box } from "@chakra-ui/react";
import ChatBox from "../Components/ChatBox";
import { useState } from "react";

const Chat= () => {
     const { user } = ChatState();
     const [fetchAgain , setFetchAgain ] = useState(false);
    return(


   <div mt = "10px" style ={{width : "100%"}}>
       {user && <SideBar/>}
       <Box mt = "10px" d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
       {user && <MyChats fetchAgain = {fetchAgain}/>}
       {user && <ChatBox fetchAgain = {fetchAgain} setFetchAgain = {setFetchAgain}/>}
       </Box>

   </div>

    )
};

export default Chat;