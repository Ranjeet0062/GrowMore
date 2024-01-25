const express=require("express");
const profileroute=express.Router();
const {updateProfile,getAllUserDetails,updateDisplayPicture,instructorDashboard}=require("../controller/Profile.controller");
const{auth,isInstructer}=require("../middleware/auth")
profileroute.put("/updateProfile",updateProfile);
profileroute.get("/getAllUserDetails",getAllUserDetails);
profileroute.get("/updateDisplayPicture",auth,updateDisplayPicture);
profileroute.get("/instructorDashboard",auth,isInstructer,instructorDashboard);
module.exports = profileroute

