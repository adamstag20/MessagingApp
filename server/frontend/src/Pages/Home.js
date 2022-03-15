import { useEffect} from "react";
import { useHistory} from "react-router-dom";
import { Container} from "@chakra-ui/react"; 
import Home from "./Login_SignUp";

function Homepage() {
  let history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (!user) history.push("/chats");
  }, [history]); 
    return(

     <Container maxW = 'xl' centerContent>
       <Home/>
    </Container>
    );
}
export default Homepage;