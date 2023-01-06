import { Routes, Route, useLocation } from "react-router-dom";
import SignUp from "./components/User/SignUp";
import Login from "./components/User/Login";
import ForgotPassword from "./components/User/ForgotPassword";
function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
      </Routes>
    </>
  );
}

export default App;
