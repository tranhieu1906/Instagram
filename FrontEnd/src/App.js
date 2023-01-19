import { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
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
const UpdateProfile = lazy(() =>
  import("./components/User/Update/UpdateProfile")
);
const Update = lazy(() => import("./components/User/Update/Update"));
const setHeaderApi = async () => {
  await (axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("token"));
};

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  let jwt = localStorage.getItem("token");
  if (jwt) {
    setHeaderApi();
  }

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
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/direct/inbox" element={<ViewChat />} />
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
