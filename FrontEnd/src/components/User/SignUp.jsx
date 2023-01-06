import React, { useEffect, useState } from "react";
import Auth from "./Auth";
import TextField from "@mui/material/TextField";
import { LazyLoadImage } from "react-lazy-load-image-component";
import InputLabel from "@mui/material/InputLabel";
// import FilledInput from "@mui/material/FilledInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import { Link } from "react-router-dom";

import logo from "../../assests/images/5a4e432a2da5ad73df7efe7a.png";

function SignUp() {
  const [user, setUser] = useState({
    email: "",
    name: "",
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { email, name, username, password } = user;

  const handleDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Auth>
        <div className="bg-white border flex flex-col gap-2 p-4 pt-10 drop-shadow-md">
          <LazyLoadImage
            draggable="false"
            className="mx-auto h-30 w-36 object-contain"
            src={logo}
            alt="logo"
          />
          <p className="mx-auto text-slate-400 font-bold text-lg max-w-xs text-center	">
            Đăng ký để xem ảnh và video từ bạn bè.
          </p>
          <form
            // onSubmit={handleRegister}
            className="flex flex-col justify-center items-center gap-3 m-3 md:m-8"
          >
            <TextField
              //   error
              //   helperText="Incorrect entry."
              fullWidth
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={handleDataChange}
              required
              size="small"
            />
            <TextField
              fullWidth
              label="Tên đầy đủ"
              name="name"
              value={name}
              onChange={handleDataChange}
              required
              size="small"
            />
            <TextField
              label="Tên người dùng"
              type="text"
              name="username"
              value={username}
              onChange={handleDataChange}
              size="small"
              required
              fullWidth
            />
            <FormControl
              fullWidth
              required
              size="small"
              value={password}
              onChange={handleDataChange}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Mật Khẩu
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            <p className="mx-auto max-w-xs text-center text-xs text-slate-400">
              Những người dùng dịch vụ của chúng tôi có thể đã tải thông tin
              liên hệ của bạn lên Instagram.{" "}
              <a
                href="https://www.facebook.com/help/instagram/261704639352628"
                className="text-blue-400"
              >
                Tìm hiểu thêm
              </a>
            </p>
            <button
              type="submit"
              className="bg-primary-blue font-medium py-2 rounded text-white w-full"
            >
              Đăng Ký
            </button>
            <span className="my-3 text-gray-500">OR</span>
            <Link
              to="/password/forgot"
              className="text-sm font-medium  text-blue-800"
            >
              Forgot password?
            </Link>
          </form>
        </div>

        <div className="bg-white border p-5 text-center drop-shadow-md">
          <span>
            Already have an account?{" "}
            <Link to="/login" className="text-primary-blue">
              Log in
            </Link>
          </span>
        </div>
      </Auth>
    </>
  );
}
export default SignUp;
