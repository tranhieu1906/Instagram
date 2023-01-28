import { Suspense, lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import io from "socket.io-client";
import axios from "./api/axios";

import { loadUser } from "./service/userAction";

import PrivateRoute from "./Router/PrivateRouter";
import ViewChat from "./components/Chats/ViewChat";
import NotFound from "./components/Errors/NotFound";
import Header from "./components/NavBar/Header";
import ForgotPassword from "./components/User/ForgotPassword";
import Profile from "./components/User/Profile";

const SignUp = lazy(() => import("./components/User/SignUp"));
const Login = lazy(() => import("./components/User/Login"));
const Home = lazy(() => import("./components/Home/Home"));
const ResetPassword = lazy(() => import("./components/User/ResetPassword"));
const UpdateProfile = lazy(() =>
  import("./components/User/Update/UpdateProfile")
);
const Update = lazy(() => import("./components/User/Update/Update"));
const setHeaderApi = async () => {
  await (axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("token"));
};
const RefreshToken = () => {
  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;

      if (originalConfig.url !== "/login" && err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          // try {
          //   const rs = await axios.post("/auth/refreshtoken", {
          //     refreshToken: TokenService.getLocalRefreshToken(),
          //   });

          //   const { accessToken } = rs.data;
          //   TokenService.updateLocalAccessToken(accessToken);

          //   return axios(originalConfig);
          // } catch (_error) {
          //   return Promise.reject(_error);
          // }
        }
      }

      return Promise.reject(err);
    }
  );
};

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const [socket, setSocket] = useState(null);

  let jwt = localStorage.getItem("token");
  if (jwt) {
    setHeaderApi();
  }

  useEffect(() => {
    RefreshToken();
    if (
      window.location.pathname !== "/login" &&
      window.location.pathname !== "/register" &&
      window.location.pathname !== "/password/forgot"
    ) {
      dispatch(loadUser());
    }
  }, [dispatch]);

  useEffect(() => {
    setSocket(io("http://localhost:8080"));
  }, []);
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

      {isAuthenticated && <Header socket={socket} />}
      <Suspense>
        <Routes>
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home socket={socket} />
              </PrivateRoute>
            }
          />
          <Route path="/direct/inbox" element={<ViewChat socket={socket} />} />
          <Route
            path="/:username"
            element={
              <PrivateRoute>
                <Profile />
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
