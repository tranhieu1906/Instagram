import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
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
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
import logo from "../../assests/images/5a4e432a2da5ad73df7efe7a.png";
import Auth from "./Auth";

function SignUp() {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      account: "",
      password: "",
    },
    validationSchema: Yup.object({
      account: Yup.string().required("Không được để trống"),
      password: Yup.string().required("Không được để trống"),
    }),
    onSubmit: (values) => {
      setIsLoading(true);
      axios
        .post("http://localhost:8080/api/v1/login", values)
        .then((res) => {
          setIsLoading(false);
          navigate("/");
        })
        .catch((error) => {
          setIsLoading(true);
          toast.error(error.response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      {isLoading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <Auth>
        <div className="bg-white border flex flex-col gap-2 p-4 pt-10 drop-shadow-md">
          <LazyLoadImage
            draggable="false"
            className="mx-auto h-30 w-36 object-contain"
            src={logo}
            alt="logo"
          />
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col justify-center items-center gap-3 m-3 md:m-8"
          >
            <TextField
              fullWidth
              label="Tên người dùng hoặc email"
              name="account"
              value={formik.values.account}
              onChange={formik.handleChange}
              error={!!formik.errors.account && formik.touched.account}
              helperText={
                formik.errors.account && formik.touched.account
                  ? formik.errors.account
                  : null
              }
              required
              size="small"
            />
            <FormControl
              error={!!formik.errors.password && formik.touched.password}
              fullWidth
              required
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
                autoComplete="on"
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
              {formik.errors.password && formik.touched.password ? (
                <FormHelperText style={{ color: "#d32f2f" }}>
                  {formik.errors.password}
                </FormHelperText>
              ) : null}
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
      <ToastContainer />
    </>
  );
}
export default SignUp;
