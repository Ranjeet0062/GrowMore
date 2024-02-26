const express = require("express")
const courserouter = express.Router()
const {auth,isAdmin,isInstructer,isStudent}=require("../middleware/auth")
const {createCourse,getAllCourses,getCourseDetails,getFullCourseDetails,getInstructorCourses,editeCourseDetails,deleteCourses,enrolledinCourse}=require("../controller/Course")
const {updateCourseProgress}=require("../controller/courseProgress.controller")

courserouter.post("/createcourse",auth,isInstructer,createCourse);
courserouter.get("/getAllCourses",getAllCourses);
courserouter.post("/getCourseDetails",getCourseDetails)
courserouter.post("/getFullCourseDetails",auth,getFullCourseDetails)
courserouter.post("/updateCourseProgress",auth,updateCourseProgress)
courserouter.put("/editeCourseDetails",auth,isInstructer,editeCourseDetails)
courserouter.get("/getInstructorCourses",auth,isInstructer,getInstructorCourses)
courserouter.post("/enrolledinCourse",auth,isStudent,enrolledinCourse)
courserouter.delete("/deleteCourses",auth,isInstructer,deleteCourses)
module.exports = courserouter