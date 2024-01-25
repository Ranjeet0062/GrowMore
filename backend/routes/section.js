const express=require("express");
const sectionroute=express.Router();
const {createSection,updateSection,deleteSection}=require("../controller/Section.controller")
const {createSubSection,updateSubSection,deleteSubSection}=require("../controller/SubSection.controller")
const {auth,isInstructer}=require("../middleware/auth")
sectionroute.post("/createSection",auth,isInstructer,createSection)
sectionroute.put("/updateSection",auth,isInstructer,updateSection)
sectionroute.delete("/deleteSection",auth,isInstructer,deleteSection)
sectionroute.post("/createSubSection",auth,isInstructer,createSubSection)
sectionroute.put("/updateSubSection",auth,isInstructer,updateSubSection)
sectionroute.delete("/deleteSubSection",auth,isInstructer,deleteSubSection)
module.exports=sectionroute
