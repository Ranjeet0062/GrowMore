const mongoose = require("mongoose")
const coursesSechma = mongoose.Schema(
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
        profile:{
            type:mongoose.Schema.type.ObjectId,
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

    },{timestamps:true}
)
module.exports = mongoose.model("Course", coursesSechma);