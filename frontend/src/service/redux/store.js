import { configureStore } from "@reduxjs/toolkit";
import logReducer from "./reducers/log/logSlice";
import postsReducer from "./reducers/posts/postsSlice";
import profileReducer from "./reducers/profile/profileSlice";
import chatReducer from "./reducers/chat/chatSlice";

export default configureStore({
  reducer: {
    log: logReducer,
    posts: postsReducer,
    profile: profileReducer,
    chat:chatReducer
  },
});
