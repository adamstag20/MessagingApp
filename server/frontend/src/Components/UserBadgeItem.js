import { Badge, CloseButton } from "@chakra-ui/react";
import React from "react";

const UserBadgeItem = ({user, handleFunction}) => {
    return (
        <Badge
            px = {2}
            py = {1}
            borderRadius= "md"
            m= {1}
            mb = {2}
            variant = "solid"
            fontSize = {9}
            colorScheme = "green"
            cursor = "pointer"
            onClick = {handleFunction}>
                {user.username}
                <CloseButton pl = {1}/>
            </Badge>
    );
};

export default UserBadgeItem;