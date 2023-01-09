import { Routes, Route, useLocation } from "react-router-dom";
import SignUp from "./components/User/SignUp";
import Login from "./components/User/Login";
import ForgotPassword from "./components/User/ForgotPassword";
import Header from "./components/NavBar/Header";
import ViewChat from "./components/chat/ViewChat";
import io from "socket.io-client";
const socket = io.connect("http://localhost:8080");


function App() {
  // return (
  //   <>
  //     <Routes>
  //       <Route path="/register" element={<SignUp />} />
  //       <Route path="/login" element={<Login />} />
  //       <Route path="/password/forgot" element={<ForgotPassword />} />
  //       <Route path="/" element={<Header />} />
  //     </Routes>
  //   </>
  // );

    return (
        <ViewChat socket={socket}/>
    )
}

export default App;
