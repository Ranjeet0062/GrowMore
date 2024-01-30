const mongoose = require("mongoose")
const userSechma = mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true,
            trim:true
        },
        lastName:{
            type:String,
            required:true,
            trim:true
        },
        email:{
            type:String,
            required:true,
            trim:true
        },
        password:{
            type:String,
            required:true,
        },
        additionalDetails:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Profile"
        },
        active:{
            type:Boolean,
            default:true,
        },
        approved:{
            type:Boolean,
            default:true,
        },
        courses: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Course",
			},
		],
        courseProgress: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "courseProgress",
			},
		],
        image:{
            type:String
        },
        accountType:{
            type:String,
            required:true
        },
        resetPasswordToken:{
            type:String,
        },
        tokenExpire:{
            typre:Date
        }

    },{timestamps:true}
)
module.exports = mongoose.model("User", userSechma);