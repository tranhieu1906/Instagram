import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {userReducer} from "./reducers/userReducer";
import { postReducer } from "./reducers/postReducer";
const reducer = combineReducers({
  user: userReducer,
  newPost: postReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;