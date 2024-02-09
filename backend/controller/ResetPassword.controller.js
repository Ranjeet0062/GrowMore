const User = require("../model/user.model")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const mailSender = require("../utils/mailSender")
exports.sendresetPsswordToken = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: `user does not found `
            })
        }
        const token = crypto.randomBytes(20).toString("hex");
        const updateuser = await User.findOneAndUpdate(
            { email },
            { resetPasswordToken: token, tokenExpire: Date.now() + 360000 },
            { new: true })
        const url = `http://localhost:5173/update-password/${token}`
        await mailSender(
            email,
            "Password Rest",
            `Your Link for email verification is ${url}. Please click this url to reset your password.`
        )
            return res.status(200).json({
                success:true,
                message:"token is sent suucessfully",
                token:token
            })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `something went to wrong while sending token and error is ${error}`
        })
    }
}
exports.restPassword=async(req,res)=>{
    try{
        const {token,password,confirmpassword}=req.body;
        if(!password&&!confirmpassword){
            return res.status(404).json({
                success:false,
                message:"please provide all contains"
            })
        }
        if(password!==confirmpassword){
            return res.status(200).json({
                success:false,
                message:"Password and Confirm Password is not same"
            })
        }
        const user=await User.findOne({resetPasswordToken:token})
        if(!user){
            return res.status(404).json({
                success:false,
                message:"Token is Invalide"
            })
        }
        if(user.tokenExpire<Date.now()){
            return res.status(403).json({
                success:false,
                message:"Tonek Expired Please regenerate new token"
            })
        }
		const encryptedPassword = await bcrypt.hash(password, 10);
		await User.findOneAndUpdate(
			{ resetPasswordToken: token },
			{ password: encryptedPassword },
			{ new: true }
		);
        return res.status(200).json({
            success:true,
            message:"Password Reset Successfully"
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:`something went to wring  while reseting password and error is ${error}`
        })
    }
}