import axios from "../api/axios";

export const setAuthToken = (token) => {
  console.log(token)
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    axios.defaults.headers.common["Authorization"] = null;
  }
};
