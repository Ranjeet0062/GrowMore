import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import signup from "../../assets/Images/signup.webp"
import instructor from "../../assets/Images/Instructor.png"
import { setSignupData } from "../../redux/slices/auth.slice"
import {  useDispatch } from 'react-redux';
import { sendOtp } from '../../services/opration/authApi';
export default function SignupForm({ setsignupphoto }) {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [accountType, setaccountType] = useState("Student");
    const [formData, setFromData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
    })
    const hendaleOnchange = (e) => {
        setFromData((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }
    const hendalOnsubmit = (e) => {
        e.preventDefault();
        dispatch(setSignupData({ ...formData, accountType }));
        dispatch(sendOtp(formData.email, navigate));
    }
    return (
        <div>
            <div className=' pr-3 bg-richblack-800  pl-3 pb-2 pt-2 rounded-full w-[50%] flex justify-evenly h-[70px] font-semibold text-lg shadow-md '>
                <button onClick={() => { setaccountType("Student"); setsignupphoto(signup) }} className={accountType === "Student" ? ' border border-black bg-black  rounded-full  w-[50%] flex items-center justify-center' : " lex items-center justify-center w-[50%]"}>Student</button>
                <button onClick={() => { setaccountType("Instructor"); setsignupphoto(instructor) }} className={accountType === "Instructor" ? 'border border-black bg-black  rounded-full  w-[50%] flex items-center justify-center ' : " lex items-center justify-center w-[50%]"}>Instructor</button>
            </div>
            <form className="flex flex-col w-full gap-y-4 mt-6" onSubmit={(e) => {
                hendalOnsubmit(e)
            }}>
                <div className='w-full flex gap-3 text-richblack-5'>
                    <label className=''>
                        <p>
                            first name
                        </p>
                        <input
                            type='text'
                            className='rounded-[0.75rem] bg-richblack-800  w-full p-[12px] text-richblack-5'
                            placeholder='last name'
                            name='firstName'
                            onChange={hendaleOnchange}
                        />

                    </label>
                    <label>
                        <p>
                            last name
                        </p>
                        <input
                            type='text'
                            className='rounded-[0.75rem] bg-richblack-800  w-full p-[12px] text-richblack-5'
                            placeholder='last name'
                            name='lastName'
                            onChange={hendaleOnchange}

                        />
                    </label>
                </div>
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
                <div className='w-full flex gap-3 text-richblack-5'>
                    <label className='w-[47.5%] relative '>
                        <p>
                            creat password
                        </p>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className='rounded-[0.75rem] bg-richblack-800 w-[88%]  p-[12px] text-richblack-5'
                            placeholder='Create password'
                            name='password'
                            onBlur={() => setShowPassword(false)}
                            onChange={hendaleOnchange}

                        />
                        <span onClick={() => setShowPassword(!showPassword)} className="absolute right-11 top-[38px] cursor-pointer ">
                            {showPassword ? <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' /> : <AiOutlineEye fontSize={24} fill='#AFB2BF' />}
                        </span>

                    </label>
                    <label className='w-[47.5%] relative'>
                        <p>
                            confirm password
                        </p>
                        <input
                            type={showConfirm ? "text" : "password"}
                            className='rounded-[0.75rem] bg-richblack-800 w-full   p-[12px] text-richblack-5'
                            placeholder='last name'
                            name='confirmPassword'
                            onChange={hendaleOnchange}
                            onBlur={() => { setShowConfirm(false) }}
                        />
                        <span onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-[38px] cursor-pointer ">
                            {showConfirm ? <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' /> : <AiOutlineEye fontSize={24} fill='#AFB2BF' />}
                        </span>
                    </label>
                </div>
                <button className="bg-yellow-50 py-[8px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900">creat Account</button>
            </form>
        </div>
    )
}
