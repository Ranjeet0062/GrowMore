import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/auth.slice"
import profileSlice from"../slices/profile.slice"
import cartSlice from "../slices/cart.slice"
import courseSlice from "../slices/course.slice";
const rootReducers=combineReducers({
    auth:authReducer,
    profile:profileSlice,
    cart:cartSlice,
    course:courseSlice
})
export default rootReducers