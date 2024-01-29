import { authapi } from "../../api/api";
import { toast } from "react-hot-toast"
import { setLoading, setToken } from "../../redux/slices/auth.slice"
import axios from "axios";
const { login } = authapi;
export const userlogin = (email, password, navigate) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
       const toastId= toast.loading("Loading....");
        try {
            axios.post(`${login}`, { email, password }, { withCredentials: true })
                .then((res) => {
                    toast.success("Login  successfully")
                    dispatch(setToken(res.data.user.token))
                    localStorage.setItem("token", JSON.stringify(response.data.token))
                    localStorage.setItem("user", JSON.stringify(response.data.user))
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