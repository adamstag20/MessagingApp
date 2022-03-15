import React from "react";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Box, Heading } from "@chakra-ui/react";




const Home = () => {
    let history = useHistory();
    const toast = useToast();
    const [show, setShow] = useState(false); // to show password to user
    const handleClick = () => setShow(!show); // handles the click to see password
    const [username, setName] = useState();
    const [password, setPassword] = useState();


    ///////////////////////////////////////////////////////////////////////////////
    // Handles the sign up aspect of HomePage 

    const SignUpHandler = async () => {
      // User forgets to add username or password
      if ( !username || !password){
            toast({
                title: "Please Fill all the Fields",
                status:"warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",

            });
        
            return;
        }
            try {
              const { data } = await axios.post(
                '/add_user',
                {
                  username,
                  password,
                },
              );
              console.log(data);
              //User successfully creates an account
              toast({
                title: "Registration Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
              });
            } catch (error) {
              // Something has gone wrong not allowing user to create account
              toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
              });
            }
          };
      /////////////////////////////////////////////////////////////////////////////
      // Handles Login Aspect of Homepage
      const LogInHandler = async () => {
        // User forgets to add username or password
        if ( !username || !password){
              toast({
                  title: "Please Fill all the Fields",
                  status:"warning",
                  duration: 5000,
                  isClosable: true,
                  position: "bottom",
  
              });
          
              return;
          }
              // Attempts to log user in 
              try {
                const config = {
                  headers: {
                    "Content-type": "application/json",
                  },
                };

                const { data } = await axios.post(
                  '/login',
                  {
                    username,
                    password,
                  }, config
                );
                console.log(data);
                //User successfully logins in
                toast({
                  title: "Login Successful",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                  position: "bottom",
                });
                localStorage.setItem("userInfo", JSON.stringify(data));
                history.push("/chat");
              } catch {
                toast({
                  title: "Error Occured!",
                  description: "Check Username or Password",
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                  position: "bottom",
                });

              }
            }

            return(

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
   
           <FormControl id = "name" isRequired>
               <FormLabel mt = "45px">Username</FormLabel>
   
               <Input placeholder = "Enter Username" value = {username} 
                   onChange = { (e) => setName(e.target.value)} />
           </FormControl>
           <FormControl id = "password" isRequired>
               <FormLabel>Password</FormLabel>
               <InputGroup>
                   <Input type = { show ? "text" : "password"} value = {password}
                   placeholder = "Enter Password"
                       onChange = { (e) => setPassword(e.target.value)} />
                    <InputRightElement>
                       <Button h = "1.75rem" size= "sm" onClick = {handleClick}>
                           {show ? "Hide" : "Show"}
                       </Button>
                    </InputRightElement>
               </InputGroup>
   
           </FormControl>
           <Button onClick = {LogInHandler} 
           colorScheme='green' variant ='solid' mt = '20px' mr = '80px'>Sign In</Button>
       
           <Button 
           onClick = {SignUpHandler}
           colorScheme='green' variant ='outline' mt = '20px'
           >Sign Up</Button>
   
           </VStack>
           </Box>
            )
            };
            export default Home;