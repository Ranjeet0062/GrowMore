const mongoose=require("mongoose");
const courseSchema=new mongoose.Schema(
    {
        courseName:{
            type:String,
            required:true,
        },
        courseDescription:{
            type:String,
            required:true,
        },
        instructor:{
            type:mongoose.Schema.type.ObjectId,
            ref:"User",
        },
        whatyouWillLearn:{
            type:String,
        },
        courseContent:[
            {
                type:mongoose.Schema.type.ObjectId,
                ref:"Section",

            }
        ],
        ratingAndReviews:[
            {
                type:mongoose.Schema.type.ObjectId,
                ref:"RatingAndReview"
            }
        ],
        price:{
            type:Number,
            required:true
        },
        thumnail:{
            type:String,
            
        },
        tag:{
            type:[String],
            required:true,
        },
        category:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Category",
        },
        studentsEnrolled:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            }
        ],
        instructions: {
            type: [String],
        },
        status: {
            type: String,
            enum: ["Draft", "Published"],
        },

    },{timestamps:true}
)