import React, { useState } from "react";
import { useDisclosure,
Modal,
ModalOverlay,
ModalContent,
ModalHeader,
ModalBody,
ModalCloseButton,
ModalFooter,
Button,
useToast,
FormControl,
Input,
Box} from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";
import UserListItem from "../Context/UserListItem";
import UserBadgeItem from "./UserBadgeItem";
const GroupChatCreate = ({children})=>  {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult]= useState([]);
    const [loading, setLoading] = useState(false);;

    const toast = useToast();

    const { user, chats, setChats } = ChatState();

    // Searches for users to add to group chat
    const handleSearch = async (query) => {
      setSearch(query);
      if (!query) { return; }
      
      try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const {data} = await axios.get(`/users?search=${search}`,config);
        console.log(data);
        setLoading(false);
        setSearchResult(data);
      } catch (error) {
          toast({
            title: "Error Occured",
            description : "Failed to Load the Search Results",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
          });
      }
    };

    // creates group chat
    const handleSubmit = async () => {
      if (!groupChatName || !selectedUsers) {
        toast({
          title: "Please fill all the feilds",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        return;
      }
  
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.post(
          `/group`,
          {
            name: groupChatName,
            users: JSON.stringify(selectedUsers.map((u) => u._id)),
          },
          config
        );
        setChats([data, ...chats]);
        onClose();
        toast({
          title: "New Group Chat Created!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      } catch (error) {
        toast({
          title: "Failed to Create the Chat!",
          description: error.response.data,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }

    };

    // Adds users to group chat
    const handleGroup = (addToGroup) => {
      if (selectedUsers.includes(addToGroup)) {
        toast ({
          title : "User Already Added",
          status : "warning",
          duration: 5000,
          isClosable : true,
          position : "top",
        });
        return;
      }
      setSelectedUsers([...selectedUsers,addToGroup])
    };


    // Deletes users added to group chat
    const handleDelete = (deluser) => {

      setSelectedUsers(selectedUsers.filter((sel) => sel._id !== deluser._id)
      
      );

    };

    return (
      <>
        <Button onClick={onOpen}>Create Group</Button> 
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create Group Chat</ModalHeader>
            <ModalCloseButton />
            <ModalBody d ="flex" flexDir = "column" alignItems = "center">
                <FormControl>
                   <Input placeholder = "Chat Name" mb = "3px" onChange={(e) => setGroupName(e.target.value)}/>
                </FormControl>
                <FormControl>
                   <Input placeholder = "Search User" mb = "1px" onChange={(e) => handleSearch(e.target.value)}/>
                </FormControl>
                <Box w = "100%" d = "flex">
                    {selectedUsers.map((u) => (
                      <UserBadgeItem
                          key = {u._id}
                          user = {u}
                          handleFunction={() => handleDelete(u)} />

                    ))}
                </Box>
                  {loading ? (
                    <div>Loading... </div>
                    ) : (searchResult ?.slice(0,4).map((user) => (
                    <UserListItem key = {user._id} 
                    user = {user} 
                    handleFunction={() => handleGroup(user)}/>
                    ))
                    )}
            </ModalBody>
  
            <ModalFooter>
              <Button variant = 'ghost' mr={3} onClick={onClose}>
                Close
              </Button>
              <Button colorScheme = 'green'  onClick = {handleSubmit}>Create</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
};
export default GroupChatCreate;