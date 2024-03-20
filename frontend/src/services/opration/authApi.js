import { authapi } from "../../api/api";
import { toast } from "react-hot-toast"
import { setLoading, setToken } from "../../redux/slices/auth.slice"
import axios from "axios";
import { useSelector } from "react-redux";
import { setUser } from "../../redux/slices/profile.slice";
const { login, signup,sendotp ,resetpassword} = authapi;
export const userlogin = (email, password, navigate) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading("Loading....");
        try {
           await axios.post(`${login}`, { email, password }, { withCredentials: true })
                .then((res) => {
                    toast.success("Login  successfully")
                    dispatch(setToken(res.data.user.token))
                    dispatch(setUser(res.data.user));
                    localStorage.setItem("token", JSON.stringify(res.data.token))
                    localStorage.setItem("user", JSON.stringify(res.data.user))
                    navigate("/dashboard/my-profile")
                })
        } catch (error) {
            console.log("LOGIN API ERROR............", error)
            toast.error("Login Failed")
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId)
    }

}
export const sendOtp = (email, navigate) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading("Loading...");
        try {
            console.log("endotp url is",sendotp)
          await axios.post(`${sendotp}`, { email }, { withCredentials: true })
                .then((res) => {
                    toast.success("otp-sent")
                    navigate("/verify-email");
                }).catch((error)=>{
                    toast.error("could not sent otp")
                    navigate("/signup")
                    console.log(error)
                })
        } catch (error) {
            console.log("something went to wrong while sending a otp and error is", error);
            toast.error("could not sent otp");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);

    }
}
export const signUp = (
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
) => {
    return async (dispatch) => {
        const toastId=toast.loading("Loading...");
        dispatch(setLoading(true));
        try{
          await  axios.post(`${signup}`, {
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp }, { withCredentials: true })
                .then((res) => {
                    toast.success("signup-succesfully")
                    navigate("/login");
                }).catch((error)=>{
                    toast.error("signup-failed")
                    navigate("/signup")
                })
        }catch(error){
            console.log("something went wrong while signup the user")
            toast.error("signup-failed")
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}
export const sendrestPassword=(email,sentEmail)=>{
    return async(dispatch)=>{
        const toastId=toast.loading("Loading...");
        dispatch(setLoading(true));
        try{
            await axios.post(`${resetpassword}`,{email},{withCredentials:true})
            .then((res)=>{
                sentEmail(true);
                toast.success("Email sent successfully")
            }).catch((error)=>{
                toast.error(error);
                console.log("something went wrongwhile axios request of reset token")
            })
        }catch(error){
            console.log("error accure while sending resetpassword link")
            toast.error(error);
        }
        toast.dismiss(toastId)
        dispatch(setLoading(false));
    }
}
export function logout(navigate) {
    return (dispatch) => {
      dispatch(setToken(null))
      dispatch(setUser(null))
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      toast.success("Logged Out")
      navigate("/")
    }
}