import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/auth.slice"

const rootReducers=combineReducers({
    auth:authReducer
})
export default rootReducers