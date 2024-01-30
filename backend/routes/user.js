const express = require("express")
const router = express.Router()
const {auth,isStudent,isAdmin}=require("../middleware/auth")
const {sendotp,signup,login,changePassword}=require("../controller/signup.controller");
const {sendresetPsswordToken,restPassword}=require("../controller/ResetPassword.controller")
router.post("/sendotp", sendotp)
router.post("/signup", signup)
router.post("/login", login)
router.put("/changePassword",auth,changePassword)
router.post("/sendresetPsswordToken",sendresetPsswordToken)
router.put("/restPassword",restPassword)

module.exports = router