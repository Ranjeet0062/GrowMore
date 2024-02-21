import React, { useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import {IoIosArrowRoundBack } from "react-icons/io"
import axios from 'axios';
import toast from 'react-hot-toast';
import {setLoading} from "../redux/slices/auth.slice"
import { useDispatch } from 'react-redux';
function UpdatePassword() {
    // const token=useParams("id")
    const token=useLocation().pathname.split("/")[2];
    const [password,setpassword]=useState("");
    const [confirmpassword,setconfirmpassword]=useState("");
    const dispatch=useDispatch()
    const hendalOnsubmit= async(e)=>{
        e.preventDefault();
        dispatch(setLoading(true))
       const toastId= toast.loading("Loading..")
       await axios.put("http://localhost:3000/user/api/restPassword",
        {password,confirmpassword,token},{withCredentials:true})
        .then((res)=>{
            res.data.success?( toast.success("Password updated")):( toast.error("token expire"))
           
        }).catch((error)=>{
            toast.error(error);
            console.log("error",error)
        })
        toast.dismiss(toastId);
        dispatch(setLoading(false))

    }
    return (
        <div className='text-white'>
            <form action="" onSubmit={hendalOnsubmit}>
            <div className='flex gap-4  flex-col max-w-[450px] h-[500px] p-12 mx-auto'>
                <h1 className=" font-bold text-3xl">Choose new Password</h1>
                <p className=' font-medium '>
                Almost done. Enter your new password and youre all set
                </p>
                <label htmlFor='password'> New Password <span className='text-red-100'>*</span></label>
                <input
                    required
                    id='password'
                    type="text"
                    name="password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    placeholder="Enter Password"
                    className="rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none w-full"
                />
                <label htmlFor='password'> Confirm Password <span className='text-red-100'>*</span></label>
                <input
                    required
                    id='password'
                    type="text"
                    name="password"
                    value={confirmpassword}
                    onChange={(e) => setconfirmpassword(e.target.value)}
                    placeholder="confirm password"
                    className="rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none w-full"
                />
                <button
                    type="submit"
                    className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
                >
                    Submit
                </button>
                <Link to="/login" className='flex items-center gap-2 text-lg'>
                    <IoIosArrowRoundBack />Back to login
                </Link>
            </div>
            </form>
        </div>
    )
}

export default UpdatePassword