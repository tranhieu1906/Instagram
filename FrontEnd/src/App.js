import { Routes, Route, useLocation } from "react-router-dom";
import SignUp from "./components/User/SignUp";
import Login from "./components/User/Login";
function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
