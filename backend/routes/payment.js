const express=require("express")
const payrouter=express.Router()
const {capturePayment,verifyPayment}=require("../controller/payment")
const {auth, isStudent } = require("../middleware/auth")
payrouter.post("/capturePayment",auth,isStudent,capturePayment)
payrouter.post("/verifyPayment",auth,isStudent,verifyPayment)
module.exports=payrouter