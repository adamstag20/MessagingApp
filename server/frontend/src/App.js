import './App.css';
import { Route } from "react-router-dom";
import Home from "./Pages/Home";
import Chat from "./Pages/Chats";
    /* Route allows me to connect to my different pages within my App
    the exact keyword is for only going to the page exactly specified */
function App() {
  return   <div className="App">
    <Route path = "/" component={Home}exact/>
    <Route path = "/chat" component={Chat}/>
    </div>
}

export default App;
