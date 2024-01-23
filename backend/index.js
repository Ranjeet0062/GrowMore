const express=require("express");
const database=require("./config/database.js");
const router=require("./routes/user.js")
const categoryrouter=require("./routes/category.js")
const courserouter=require("./routes/caurses.js")
const fileUpload = require("express-fileupload");
const cookieParser=require("cookie-parser")
const {cloudinaryConnect}=require("./config/cloudnary.js")
const app=express();
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

app.get("/",(req,res)=>{
    res.send("hello");
})
app.listen(3000,()=>{
    console.log("app is running")
})