import React, { useRef, useState } from 'react'
import IconBtn from '../IconBtn';
import { RiUpload2Line } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import {updateDisplayPicture}from "../../services/opration/setting"
function UpdateProfilePhoto() {
    const dispatch=useDispatch()
    const fileUploaderRef = useRef()
    const { user } = useSelector((state) => state.profile)
    const {token}=useSelector((state)=>state.auth)
    console.log("token inside profilephoto",token)
    const [File,setFile]=useState(null);
    const [priviewSource,setPreviewSource]=useState(null);
    const [loading, setLoading] = useState(false)
    const hendlefileChenge = (e) => {
        console.log(e.target.files[0]);
        setFile(e.target.files[0]);
        const reader=new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onloadend = () => {
          setPreviewSource(reader.result)
          console.log("previewsource",reader.result);
        }
    }
    const hedleupdoald=()=>{
        try {
            console.log("uploading...")
            setLoading(true)
            const formData = new FormData()
            formData.append("displayPicture", File)
            console.log("formdata", formData)
            dispatch(updateDisplayPicture(token, formData)).then(() => {
                setLoading(false)
            })
          } catch (error) {
            setLoading(false)
            console.log("ERROR MESSAGE - ", error.message)
          }
     
    }
    const hedleclick = () => {
        fileUploaderRef.current.click();
    }
    return (
       
        <div className="flex items-center gap-x-4">
                <img
                    src={priviewSource||user?.image}
                    alt={`profile-${user?.firstName}`}
                    className="aspect-square w-[78px] rounded-full object-cover"
                />
                <div className="space-y-1">
                    <p className="text-lg font-semibold text-richblack-5">
                        {user?.firstName + " " + user?.lastName}
                    </p>
                    <p className="text-sm text-richblack-300">{user?.email}</p>
                    <div className='flex gap-4'>
                        <input type="file" hidden ref={fileUploaderRef}  onChange={hendlefileChenge}/>
                        <button className='cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50' onClick={hedleclick}>Select</button>
                        <IconBtn
                            text={loading?"Uploading...":"Upload"}
                            onclick={() => {
                               hedleupdoald()
                            }}
                        >
                            <RiUpload2Line />
                        </IconBtn>
                    </div>
                </div>
            </div>
    )
}

export default UpdateProfilePhoto