const express=require("express");
const database=require("./config/database.js");
const router=require("./routes/user.js")
const categoryrouter=require("./routes/category.js")
const courserouter=require("./routes/caurses.js")
const profilerouter=require("./routes/profile.js")
const secctionrouter=require("./routes/section.js")
const ratingandraviewrouter=require("./routes/ratingandriew.js")
const payrouter =require("./routes/payment.js")
const cors = require('cors');
const fileUpload = require("express-fileupload");
const cookieParser=require("cookie-parser")
const {cloudinaryConnect}=require("./config/cloudnary.js")
const app=express();
app.use(cors({credentials: true,   origin: ['https://grow-more-the-leaning-paltform.vercel.app', 'http://localhost:5173GI']
}));
app.use(express.json());
app.use(cookieParser());
database.connect();
app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)
//cloudinary connection
cloudinaryConnect();
app.use("/user/api",router);
app.use("/category/api",categoryrouter)
app.use("/course/api",courserouter)
app.use("/profile/api",profilerouter)
app.use("/section/api",secctionrouter)
app.use("/rating/api",ratingandraviewrouter);
app.use("/payment",payrouter)
app.get("/",(req,res)=>{
    res.send("hello");
})
app.listen(3000,()=>{
    console.log("app is running")
})