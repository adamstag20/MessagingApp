import React from "react";
import { Box, Text } from "@chakra-ui/react";

const UserListItem = ({user, handleFunction}) => {

    return (
        <Box
        onClick={handleFunction}
        cursor="pointer"
        bg="#48BB78"
        _hover={{
          background: "white",
          color: "#48BB78",
        }}
        w="100%"
        d="flex"
        alignItems="center"
        color="black"
        px={3}
        py={2}
        mb={2}
        borderRadius="lg"
      >
            <Text>{user.username}</Text>
    </Box>
    )
}

export default UserListItem;