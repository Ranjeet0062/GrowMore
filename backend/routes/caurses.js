const express = require("express")
const courserouter = express.Router()
const {auth,isAdmin,isInstructer}=require("../middleware/auth")
const {createCourse,getAllCourses,getCourseDetails,getFullCourseDetails,getInstructorCourses,editeCourseDetails}=require("../controller/Course")
const {updateCourseProgress}=require("../controller/courseProgress.controller")

courserouter.post("/createcourse",auth,isInstructer,createCourse);
courserouter.get("/getAllCourses",getAllCourses);
courserouter.get("/getCourseDetails",getCourseDetails)
courserouter.get("/getFullCourseDetails",auth,getFullCourseDetails)
courserouter.get("/updateCourseProgress",auth,updateCourseProgress)
courserouter.put("/editeCourseDetails",auth,isInstructer,editeCourseDetails)
courserouter.get("/getInstructorCourses",auth,isInstructer,getInstructorCourses)
module.exports = courserouter