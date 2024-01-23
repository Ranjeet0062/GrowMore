const express = require("express")
const courserouter = express.Router()
const {auth,isAdmin,isInstructer}=require("../middleware/auth")
const {createCourse}=require("../controller/Course")
courserouter.post("/createcourse",auth,isInstructer,createCourse);
// courserouter.get("/showAllCategories",showAllCategories);
// courserouter.get("/categoryPageDetails",categoryPageDetails)
module.exports = courserouter