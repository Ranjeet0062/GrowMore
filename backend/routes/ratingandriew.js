const express=require("express");
const ratingandraviewrouter=express.Router();
const {createRating,getAverageRating,getAllRating}=require("../controller/RatingAndReview.controller");
const{auth}=require("../middleware/auth")
ratingandraviewrouter.post('/createRating',auth,createRating)
ratingandraviewrouter.get("/getAverageRating",getAverageRating);
ratingandraviewrouter.get("/getAllRating",getAllRating);
module.exports=ratingandraviewrouter;