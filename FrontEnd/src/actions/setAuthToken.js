import axios from "../api/axios";

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
  } else {
    axios.defaults.headers.common["Authorization"] = null;
  }
};
