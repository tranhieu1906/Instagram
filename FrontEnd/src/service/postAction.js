import axios from "../api/axios";

import {
  NEW_POST_REQUEST,
  NEW_POST_SUCCESS,
  NEW_POST_FAIL,
  CLEAR_ERRORS,
} from "../constants/postConstants";

export const addNewPost = (postData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_POST_REQUEST });
    const { data } = await axios.post("/api/v1/post/new", postData);
    dispatch({
      type: NEW_POST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_POST_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};