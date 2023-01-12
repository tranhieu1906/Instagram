import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userReducer,
  allUsersReducer,
  followUserReducer,
} from "./reducers/userReducer";
import {
  postReducer,
  postOfFollowingReduct,
  likePostReducer,
  newCommentReducer,
} from "./reducers/postReducer";
const reducer = combineReducers({
  user: userReducer,
  newPost: postReducer,
  allUsers: allUsersReducer,
  followUser: followUserReducer,
  postOfFollowing: postOfFollowingReduct,
  likePost: likePostReducer,
  newComment: newCommentReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
