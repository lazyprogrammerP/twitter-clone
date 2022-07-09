import { createWrapper } from "next-redux-wrapper";
import { combineReducers, createStore } from "redux";
import postsReducer from "./reducers/posts.reducer";

// root reducer
const rootReducer = combineReducers({
  posts: postsReducer,
});

// creating store
export const store = createStore(rootReducer);
export const wrapper = createWrapper(() => store);
