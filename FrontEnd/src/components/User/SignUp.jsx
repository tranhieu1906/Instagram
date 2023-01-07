// import React, { useEffect, useState } from "react";
import Auth from "./Auth";
import TextField from "@mui/material/TextField";
// import { Link } from "react-router-dom";
function SignUp() {
  return (
    <>
      <Auth>
        <div className="bg-white border flex flex-col gap-2 p-4 pt-10">
          <img
            draggable="false"
            className="mx-auto h-30 w-36 object-contain"
            src="https://assets.stickpng.com/images/5a4e432a2da5ad73df7efe7a.png"
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
              fullWidth
              label="Email"
              type="email"
              name="email"
              // value={email}
              // onChange={handleDataChange}
              required
              size="small"
            />
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              // value={name}
              // onChange={handleDataChange}
              required
              size="small"
            />
            <TextField
              label="Username"
              type="text"
              name="username"
              // value={username}
              // onChange={handleDataChange}
              size="small"
              required
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              // value={password}
              // onChange={handleDataChange}
              required
              size="small"
              fullWidth
            />
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
            {/* <Link
              to="/password/forgot"
              className="text-sm font-medium  text-blue-800"
            >
              Forgot password?
            </Link> */}
          </form>
        </div>

        <div className="bg-white border p-5 text-center">
          <span>
            Already have an account?{" "}
            {/* <Link to="/login" className="text-primary-blue">
              Log in
            </Link> */}
          </span>
        </div>
      </Auth>
    </>
  );
}
export default SignUp;
