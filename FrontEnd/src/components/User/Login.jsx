import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import Auth from "./Auth";

import logo from "../../assests/images/5a4e432a2da5ad73df7efe7a.png";

function SignUp() {
  const [user, setUser] = useState({
    account: "",
    password: "",
  });
  const { account, password } = user;
  const handleDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    console.log(user);
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
          <form
            onSubmit={handleLogin}
            className="flex flex-col justify-center items-center gap-3 m-3 md:m-8"
          >
            <TextField
              fullWidth
              label="Tên người dùng hoặc email"
              name="account"
              value={account}
              onChange={handleDataChange}
              required
              size="small"
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
                name="password"
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
            <button
              type="submit"
              className="bg-primary-blue font-medium py-2 rounded text-white w-full"
            >
              Đăng Nhập
            </button>
            <div className="flex">
              <span className="my-3 text-gray-500">Hoặc</span>
            </div>
            <Link
              to="/password/forgot"
              className="text-sm font-medium  text-blue-800"
            >
              Quên mật khẩu?
            </Link>
          </form>
        </div>

        <div className="bg-white border p-5 text-center drop-shadow-md">
          <span>
            Bạn chưa có tài khoản ư?{" "}
            <Link to="/register" className="text-primary-blue">
              Đăng Ký
            </Link>
          </span>
        </div>
      </Auth>
    </>
  );
}
export default SignUp;
