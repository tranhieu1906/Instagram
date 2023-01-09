import { Route, Routes } from "react-router-dom";
// import io from "socket.io-client";
import Header from "./components/NavBar/Header";
import ForgotPassword from "./components/User/ForgotPassword";
import Login from "./components/User/Login";
import SignUp from "./components/User/SignUp";
// import ViewChat from "./components/Chats/ViewChat";
// const socket = io.connect("http://localhost:8080");


function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/" element={<Header />} />
        {/* <Route path="/chat" element={<ViewChat socket={socket}/>} /> */}
      </Routes>
    </>
  );
}

export default App;
