import { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { loadUser } from "./service/userAction";
import axios from "./api/axios";
import { ToastContainer } from "react-toastify";

import PrivateRoute from "./Router/PrivateRouter";
import Header from "./components/NavBar/Header";
import ForgotPassword from "./components/User/ForgotPassword";
import NotFound from "./components/Errors/NotFound";
import Profile from "./components/User/Profile";

const SignUp = lazy(() => import("./components/User/SignUp"));
const Login = lazy(() => import("./components/User/Login"));
const Home = lazy(() => import("./components/Home/Home"));
const UpdateProfile = lazy(() =>
  import("./components/User/Update/UpdateProfile")
);
const Update = lazy(() => import("./components/User/Update/Update"));

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    setHeaderApi();
  }, []);
  const setHeaderApi = async () => {
    await (axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token"));
  };
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />

      {isAuthenticated && <Header />}
      <Suspense>
        <Routes>
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route
            path="/:username"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/accounts/edit"
            element={
              <PrivateRoute>
                <Update>
                  <UpdateProfile />
                </Update>
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
