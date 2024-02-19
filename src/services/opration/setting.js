import { toast } from "react-hot-toast";
import { setUser } from "../../redux/slices/profile.slice";
import axios from "axios";

export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/profile/api/updateDisplayPicture`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true
        }
      ).then((res) => {
        console.log(res)
        toast.success("Display Picture Updated Successfully");
        dispatch(setUser(res?.data?.data));
        localStorage.setItem("user", JSON.stringify(res.data.data))
      }).catch((error) => {
        toast.error("Could Not Update Display Picture");
      });

      console.log("UPDATE_DISPLAY_PICTURE_API API RESPONSE............",);


    } catch (error) {
      console.error("UPDATE_DISPLAY_PICTURE_API API ERROR............", error);
      toast.error("Could Not Update Display Picture");
    } finally {
      toast.dismiss(toastId);
    }
  };
}
export function updateProfile(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/profile/api/updateProfile`,
        formData,
        {
          // headers: {
          //   "Content-Type": "multipart/form-data",
          //   Authorization: `Bearer ${token}`,
          // },
          withCredentials: true
        }
      ).then((res) => {
        console.log("ghdfjkslkjhdsk", res)
        dispatch(setUser(res.data.data));
        localStorage.setItem("user", JSON.stringify(res.data.data))
        toast.success("profile updated succefully");

      }).catch((error) => {
        toast.error("Could Not Update Display Picture");
      });

      console.log("UPDATE_DISPLAY_PICTURE_API API RESPONSE............",);


    } catch (error) {
      console.error("UPDATE_DISPLAY_PICTURE_API API ERROR............", error);
      toast.error("Could Not Update Display Picture");
    } finally {
      toast.dismiss(toastId);
    }
  };
}
export function changePassword(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("loading...");
    try {
      await axios.put(`${import.meta.env.VITE_BASE_URL}/user/api/changePassword`, formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials:true
        }).then((res)=>{
          toast.success("password chenge succesfully")
        })
    } catch (error) {
      console.log("error  accure while chenging password...",error);
      toast.error("failed")
    }finally{
      toast.dismiss(toastId);
    }
  }
}