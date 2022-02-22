import React, { useState } from "react";
import { Container, 
    Box, 
    Text,
    Heading,
    InputGroup,
    InputRightElement,
    Button
} from '@chakra-ui/react';

import { VStack } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/react";


const Home = () => {

    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    return <Container maxW = 'xl' centerContent>
        <Box bg = {"#68D391"}
         w = '150%' 
         h = '75%'
         p = {4}
         d = "flex" 
         justifyContent= "center" 
         m="50px 0 50px 0"
        borderRadius="lg"
        borderWidth="1px" 
         >
        <VStack spacing = "5px" color = 'black'
            mt = "20px" >
        <Heading>Leap Frog Chat</Heading> 

        <FormControl id = "user-name" isRequired>
            <FormLabel mt = "45px">Username</FormLabel>

            <Input placeholder = 'Enter Username : ' 
                onChange = {(e)=> setName(e.target.value)} >
            </Input>
        </FormControl>
        <FormControl id = "password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
                <Input type = { show ? "text" : "password"}
                placeholder = 'Enter Password'
                    onChange = {(e) => setPassword(e.target.value)} >
                 </Input>
                 <InputRightElement>
                    <Button h = "1.75rem" size= "sm" onClick = {handleClick}>
                        {show ? "Hide" : "Show"}
                    </Button>
                 </InputRightElement>
            </InputGroup>

        </FormControl>

        </VStack>
        </Box>
    </Container>;
};

export default Home;