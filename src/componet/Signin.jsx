import React, { useState } from 'react'
import SigninForm from "../componet/form/SigninForm"
import signin from "../assets/Images/login.webp"
import HighlightText from "./HighlightText"


export default function Login() {

   
    return (
        <div className=' w-11/12 flex mx-auto gap-6 text-white justify-evenly mt-20 mb-20'>
            <div className='w-[50%] max-w-[450px]'>
                <h1 className=' font-bold text-3xl '>
                Join the millions learning to code with <HighlightText text={"GrowMore"}/> for free
                </h1>
                <p className=' font-medium text-lg mt-4 opacity-65'>Build skills for today, tomorrow, and beyond. <span className=' opacity-100 text-blue-50'>Education to future-proof your career.</span></p>
                <SigninForm />
            </div>
            <div className='w-[50%]'>
                <img src={signin} alt="" />
            </div>
        </div>
    )
}
