import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/auth.slice"
import profileSlice from"../slices/profile.slice"
const rootReducers=combineReducers({
    auth:authReducer,
    profile:profileSlice
})
export default rootReducers