const express=require("express");
const profileroute=express.Router();
const {updateProfile,getAllUserDetails,updateDisplayPicture,instructorDashboard}=require("../controller/Profile.controller");
const{auth,isInstructer}=require("../middleware/auth")
profileroute.put("/updateProfile",auth,updateProfile);
profileroute.get("/getAllUserDetails",auth ,getAllUserDetails);
profileroute.put("/updateDisplayPicture",auth,updateDisplayPicture);
profileroute.get("/instructorDashboard",auth,isInstructer,instructorDashboard);
module.exports = profileroute

