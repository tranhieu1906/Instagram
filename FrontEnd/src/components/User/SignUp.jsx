import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PasswordStrengthBar from "react-password-strength-bar";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import logo from "../../assests/images/5a4e432a2da5ad73df7efe7a.png";
import Auth from "./Auth";


function SignUp() {
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Không được để trống").min(4, "Tên quá ngắn"),
      email: Yup.string()
        .required("Không được để trống")
        .matches(
          /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
          "Vui lòng nhập đúng định dạng Email"
        ),
      password: Yup.string()
        .required("Không được để trống")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,17}$/,
          "Tối thiểu 8 và tối đa 17 ký tự, ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt"
        ),
      username: Yup.string().required("Không được để trống"),
    }),
    onSubmit: (values) => {
      axios
        .post("http://localhost:8080/api/v1/signup", values)
        .then((response) =>
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
        )
        .catch((error) =>
          toast.error(error.response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
        );
    },
  });
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
          <p className="mx-auto text-slate-400 font-bold text-lg max-w-xs text-center	">
            Đăng ký để xem ảnh và video từ bạn bè.
          </p>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col justify-center items-center gap-3 m-3 md:m-8"
          >
            <TextField
              fullWidth
              label="Email"
              type="email"
              name="email"
              size="small"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={!!formik.errors.email && formik.touched.email}
              helperText={
                formik.errors.email && formik.touched.email
                  ? formik.errors.email
                  : null
              }
            />
            <TextField
              fullWidth
              label="Tên đầy đủ"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={!!formik.errors.name && formik.touched.name}
              helperText={
                formik.errors.name && formik.touched.name
                  ? formik.errors.name
                  : null
              }
              size="small"
            />
            <TextField
              label="Tên người dùng"
              type="text"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={!!formik.errors.username && formik.touched.username}
              helperText={
                formik.errors.username && formik.touched.username
                  ? formik.errors.username
                  : null
              }
              size="small"
              fullWidth
            />
            <FormControl
              error={!!formik.errors.password && formik.touched.password}
              fullWidth
              size="small"
              value={formik.values.password}
              onChange={formik.handleChange}
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
              <PasswordStrengthBar password={formik.values.password} />

              {formik.errors.password && formik.touched.password ? (
                <FormHelperText style={{ color: "#d32f2f" }}>
                  {formik.errors.password}
                </FormHelperText>
              ) : null}
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
              Quên mật khẩu?
            </Link>
          </form>
        </div>

        <div className="bg-white border p-5 text-center drop-shadow-md">
          <span>
            Bạn đã có tài khoản ?{" "}
            <Link to="/login" className="text-primary-blue">
              Đăng nhập
            </Link>
          </span>
        </div>
      </Auth>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </>
  );
}
export default SignUp;
