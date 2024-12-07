import { configureStore } from "@reduxjs/toolkit";
import habitReducer from "./habit-slice";
const store = configureStore({
  reducer: {
    habits: habitReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>; //getState is function and to infer the return tpe of the function *ReturnType<>* is used,wheres dispatch is a object type
export type AppDispatch = typeof store.dispatch;
export default store;
