import { configureStore } from "@reduxjs/toolkit";
import toggleReducer from "../store/themeSlice";
import authReducer from "../store/authSlice";

export const store = configureStore({
  reducer: {
    theme: toggleReducer,
    auth:authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;