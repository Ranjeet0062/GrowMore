import React, { useState } from 'react'
import SignupForm from './form/SignupForm'
import signup from "../assets/Images/signup.webp"
import HighlightText from "./HighlightText"
export default function Signup() {
    const [signupphoto,setsignupphoto]=useState(signup)
    return (
        <div className=' w-11/12 flex mx-auto gap-6 text-white justify-evenly mt-20 mb-20'>
            <div className='w-[50%] max-w-[450px]'>
                <h1 className=' font-bold text-3xl '>
                Join the millions learning to code with <HighlightText text={"GrowMore"}/> for free
                </h1>
                <p className=' font-medium text-lg mt-4 opacity-65'>Build skills for today, tomorrow, and beyond. <span className=' opacity-100 text-blue-50'>Education to future-proof your career.</span></p>
                <SignupForm  setsignupphoto={setsignupphoto}/>
            </div>
            <div className='w-[50%]'>
                <img src={signupphoto} alt="" />
            </div>
        </div>
    )
}
