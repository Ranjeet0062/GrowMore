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
          withCredentials: true,
        }
      ).then((res)=>{
        dispatch(setUser(res.data.data));
        toast.success("profile picture is updated")
      }).catch((error)=>{
        toast.error("failed updating")
      });

      
    } catch (error) {
      console.error("UPDATE_DISPLAY_PICTURE_API API ERROR............", error);
      toast.error("Could Not Update Display Picture");
    } finally {
      toast.dismiss(toastId);
    }
  };
}
