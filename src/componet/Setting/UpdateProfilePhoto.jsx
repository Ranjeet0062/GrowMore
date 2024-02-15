import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import IconBtn from '../IconBtn';
import { RiUpload2Line } from "react-icons/ri"
import { preview } from 'vite';
function UpdateProfilePhoto() {
    const [file,setFile]=useState(null);
    const [previewSourceFile,setPriview]=useState(null)
    const { user } = useSelector((sate) => sate.profile);
    const fileUploaderRef=useRef()
     const hedleclick=()=>{
        fileUploaderRef.current.click()
     }
     const previewFile=(fileSource)=>{
            const reader=new FileReader()
     }
     const hendlefileChenge=(e)=>{
        const files=e.target.files[0];
        setFile(files);
        previewFile(files);
        console.log(files);
     }
     
    return (
        <>
            <div className="flex items-center gap-x-4">
                <img
                    src={previewSourceFile||user?.image}
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
                            text="Upload"
                            onclick={() => {
                                navigate("/dashboard/settings")
                            }}
                        >
                            <RiUpload2Line />
                        </IconBtn>
                    </div>
                </div>
            </div>


        </>
    )
}

export default UpdateProfilePhoto