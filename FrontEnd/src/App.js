import { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { loadUser } from "./actions/userAction";
import axios from "./api/axios";

import PrivateRoute from "./Router/PrivateRouter";
import Header from "./components/NavBar/Header";
import ForgotPassword from "./components/User/ForgotPassword";

const SignUp = lazy(() => import("./components/User/SignUp"));
const Login = lazy(() => import("./components/User/Login"));
const Home = lazy(() => import("./components/Home/Home"));


function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

   useEffect(() => {
     axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");
  
   }, []);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <>
      {isAuthenticated && <Header />}
      <Suspense>
        <Routes>
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
