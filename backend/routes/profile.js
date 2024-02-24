const express=require("express");
const profileroute=express.Router();
const {updateProfile,getAllUserDetails,updateDisplayPicture,instructorDashboard,getEnrolledCourses}=require("../controller/Profile.controller");
const{auth,isInstructer, isStudent}=require("../middleware/auth")
profileroute.put("/updateProfile",auth,updateProfile);
profileroute.get("/getAllUserDetails",auth ,getAllUserDetails);
profileroute.put("/updateDisplayPicture",auth,updateDisplayPicture);
profileroute.get("/instructorDashboard",auth,isInstructer,instructorDashboard);
profileroute.get("/getEnrolledCourses",auth,isStudent,getEnrolledCourses);
module.exports = profileroute

