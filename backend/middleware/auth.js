require("dotenv").config();
const jwt=require("jsonwebtoken")
exports.auth = (req, res, next) => {
  try {
    console.log("inside auth middleware")
    const token = req.body.token || req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "token missing",
      });
    }
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decode;
    } catch (e) {
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }

    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      success: false,
      message: "Something went wrong while verifying token",
    });
  }
};
exports.isStudent=(req,res,next)=>{
  try{
    const role=req.user.accountType
    if(role==="Student"){
        next();
    }else{
      return res.status(200).json({
        success:false,
        message:"this is protected route only for  Student"
      })
    }
  }catch(error){
    res.status(500).json({
      success:false,
      message:"something went in isStudent middleware",
      error:error
    })
  }
}
exports.isAdmin=(req,res,next)=>{
  try{
    const role=req.user.accountType
    console.log("roleeeee",req.user)
    if(role==="Admin"){
        next();
    }else{
      return res.status(200).json({
        success:false,
        message:"this is protected route only for  Admin"
      })
    }
  }catch(error){
    res.status(500).json({
      success:false,
      message:"something went in isAdmin middleware",
      error:error
    })
  }
}
exports.isInstructer=(req,res,next)=>{
  try{
    console.log("dghfduchhjh",req.user.accountType)
    const role=req.user.accountType
    if(role==="Instructor"){
        next();
    }else{
      return res.status(200).json({
        success:false,
        message:"this is protected route only for  Instructer"
      })
    }
  }catch(error){
    res.status(500).json({
      success:false,
      message:"something went in isInstructer middleware",
      error:error
    })
  }
}