import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import signup from "../../assets/Images/signup.webp"
import instructor from "../../assets/Images/Instructor.png"
import { setSignupData } from "../../redux/slices/auth.slice"
import { useDispatch } from 'react-redux';
import { sendOtp } from '../../services/opration/authApi';

function ContactForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [accountType, setaccountType] = useState("Student");
  const [formData, setFromData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phonNo: "",
    message: "",
  })
  const hendaleOnchange = (e) => {
    setFromData((prev) => ({
      ...prev, [e.target.name]: e.target.value
    }))
  }
  const hendalOnsubmit = (e) => {
    e.preventDefault();
  }
  return (
    <div className='w-full md:w-[50%] flex flex-col items-center font-semibold text-xl border border-richblack-600 rounded-2xl p-5 mt-4'>
      <h className=" font-bold text-4xl">Get in touch</h>
      <form className="flex flex-col w-full gap-y-4 mt-6" onSubmit={(e) => {
        hendalOnsubmit(e)
      }}>
        <div className='w-full md:flex gap-3 text-richblack-5'>
          <label className='w-[50%]'>
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
          <label className='w-[50%]'>
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
          <label className='relative w-full'>
            <p>
              Phon Number
            </p>
            <input
              type="number"
              className='rounded-[0.75rem] bg-richblack-800 w-full p-[12px] text-richblack-5'
              placeholder='Phone Number'
              name='phonNo'
              onBlur={() => setShowPassword(false)}
              onChange={hendaleOnchange}
            />
          </label>

        </div>
        <div className='w-full flex gap-3 text-richblack-5'>
          <label className='relative w-full'>
            <p>
              Message
            </p>
            <textarea
              rows={5} // Corrected attribute name from 'row' to 'rows'
              className='rounded-[0.75rem] bg-richblack-800 w-full p-[12px] text-richblack-5'
              placeholder='Message'
              name='message'
              onBlur={() => setShowPassword(false)}
              onChange={hendaleOnchange} // Assuming 'handleOnChange' is the correct function name
            />
          </label>

        </div>
        <button className="bg-yellow-50 py-[8px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900">Send Message</button>
      </form>
    </div>
  )
}

export default ContactForm


