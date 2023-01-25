import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import usersState from "./../reducers/users";
import authState from "./../reducers/auth";
import profileState from "./../reducers/profile";
import appSlice from "./../reducers/app"

const reducers = combineReducers({
    UsersData: usersState,
    AuthData: authState,
    ProfileData: profileState,
    AppData: appSlice
})

export const store = configureStore({
    reducer: reducers
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

export default store;