import React, { useState } from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch } from 'react-redux';
import HighlightText from "./HighlightText"
import {sendrestPassword} from "../services/opration/authApi"
function ResetPassword() {
  const [email, setEmail] = useState("");
  const [emailflag, sentEmail] = useState(false);
  const dispatch = useDispatch();
  const onClickhendeler = (e) => {
    e.preventDefault();
    dispatch(sendrestPassword(email, sentEmail))
  }
  return (

    <div className='text-white h-[100vh]'>
      <Navbar />
      {emailflag ?
        (
          <div className='flex gap-2  flex-col max-w-[450px] h-[500px] p-12 mx-auto  mt-[120px]'>
            <h className=" font-bold text-3xl">Check your email</h>
            <p>We have sent the reset email to</p>
            <p className='font-bold text-2xl'><HighlightText text={email}/></p>
            
            <button
              type="submit"
              className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
            >
              Resend Email
            </button>
            <Link to="/login" className='flex items-center gap-2 text-lg'>
              <IoIosArrowRoundBack />Back to login
            </Link>
          </div>
        ) : (
          <div className='flex gap-4  flex-col max-w-[450px] h-[500px] p-12 mx-auto'>
            <h className=" font-bold text-3xl">Reset your password</h>
            <p className=' font-medium '>
              Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery
            </p>
            <label htmlFor='email'> Email Adress <span className='text-red-100'>*</span></label>
            <input
              required
              id='email'
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              className="rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none w-full"
            />
            <button
              type="submit"
              className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
              onClick={onClickhendeler}
            >
              Submit
            </button>
            <Link to="/login" className='flex items-center gap-2 text-lg'>
              <IoIosArrowRoundBack />Back to login
            </Link>
          </div>)}

    </div>
  )
}

export default ResetPassword