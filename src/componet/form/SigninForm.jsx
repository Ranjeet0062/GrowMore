import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import {AiOutlineEye,AiOutlineEyeInvisible} from "react-icons/ai"
import { userlogin } from '../../services/opration/authApi';
import { useDispatch } from 'react-redux';
export default function LoginForm() {
    const dispatch=useDispatch();
    const navigate = useNavigate()
    const [showPassword,setShowPassword]=useState(false)
    const [formData,setFromData]=useState({email:"",password:""})

    function submitHandler(e) {
        e.preventDefault();
        dispatch(userlogin(formData.email,formData.password,navigate));
    }
    const hendaleOnchange=(e)=>{
     setFromData((prev)=>({
         ...prev,[e.target.name]:e.target.value
     }))
    }
    
    return (
        <form
            onSubmit={submitHandler}
            className="flex flex-col w-full gap-y-4 mt-6"
        >
            <label className="w-full">
                <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                    Email Address
                    <sup className="text-pink-200">*</sup>
                </p>

                <input
                    type="email"
                    required
                    value={formData.email}
                    placeholder="Enter your email address"
                    onChange={hendaleOnchange}
                    name="email"
                    className="rounded-[0.75rem] bg-richblack-800  w-full p-[12px] text-richblack-5"
                />
            </label>

            <label className="w-full relative">
                <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
                    Password
                    <sup className="text-pink-200">*</sup>
                </p>

                <input
                type={showPassword?"text":"password"}
                    required
                    value={formData.password}
                    placeholder="Enter Password"
                    onChange={hendaleOnchange}
                    onBlur={()=>{setShowPassword(false)}}
                    name="password"
                    className="bg-richblack-800 rounded-[0.75rem] w-full p-[12px] text-richblack-5"
                />

                <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-[38px] cursor-pointer ">
                    {showPassword ? <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' /> : <AiOutlineEye fontSize={24} fill='#AFB2BF' />}
                </span>

                <Link to="#">
                    <p className="text-base mt-1 text-blue-100 max-w-max ml-auto">Forgot Password</p>
                </Link>
                <Link to="/signup">
                    <p className="text-base mt-1 text-blue-100 max-w-max ml-auto">Register Here</p>
                </Link>
            </label>

            <button className="bg-yellow-50 py-[8px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900">Sign in</button>
        </form>
    )
}
