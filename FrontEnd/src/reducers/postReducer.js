import {
  NEW_POST_REQUEST,
  NEW_POST_SUCCESS,
  NEW_POST_RESET,
  NEW_POST_FAIL,
  CLEAR_ERRORS,
} from "../constants/postConstants";

export const postReducer = (state = { post: {} }, { type, payload }) => {
  switch (type) {
    case NEW_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        post: payload,
      };
    case NEW_POST_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case NEW_POST_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
