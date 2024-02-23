const express = require("express")
const categoryrouter = express.Router()
const {auth,isAdmin}=require("../middleware/auth")
const {createCategory,showAllCategories,categoryPageDetails}=require("../controller/Category")
categoryrouter.post("/createCategory",auth,isAdmin,createCategory);
categoryrouter.get("/showAllCategories",showAllCategories);
categoryrouter.post("/categoryPageDetails",categoryPageDetails)
module.exports = categoryrouter