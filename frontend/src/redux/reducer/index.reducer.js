import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/auth.slice"
import profileSlice from"../slices/profile.slice"
import cartSlice from "../slices/cart.slice"
import courseSlice from "../slices/course.slice";
import viewCourseSlice from "../slices/viewCourseSlice"
const rootReducers=combineReducers({
    auth:authReducer,
    profile:profileSlice,
    cart:cartSlice,
    course:courseSlice,
    viewCourse:viewCourseSlice
})
export default rootReducers