import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth";
import { todosSlice } from "./slices/todos";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    todos: todosSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
