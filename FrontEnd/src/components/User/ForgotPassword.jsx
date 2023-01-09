import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Auth from "./Auth";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  return (
    <>
      <Auth>
        <div className="bg-white border flex flex-col gap-2 p-4 pt-10">
          <img
            draggable="false"
            className="mx-auto h-30 w-36 object-contain"
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt=""
          />
          <form
            // onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center gap-3 m-3 md:m-8"
          >
            <TextField
              label="Email"
              variant="outlined"
              size="small"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-primary-blue font-medium py-2 rounded text-white w-full"
            >
              Gửi liên kết đăng nhập
            </button>
            <span className="my-3 text-gray-500">Hoặc</span>
            <Link to="/login" className="text-sm font-medium text-blue-800">
              Quay lại đăng nhập ?
            </Link>
          </form>
        </div>

        <div className="bg-white border p-5 text-center">
          <span>
            Không có tài khoản ư?{" "}
            <Link to="/register" className="text-primary-blue">
              Đăng Ký
            </Link>
          </span>
        </div>
      </Auth>
    </>
  );
}

export default ForgotPassword;
