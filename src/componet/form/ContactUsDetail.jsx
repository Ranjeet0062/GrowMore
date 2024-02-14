import React from 'react'
import { IoChatbubblesOutline } from "react-icons/io5"
import { FaEarthAfrica } from "react-icons/fa6";
import { LuPhoneCall } from "react-icons/lu";
function ContactUsDetail() {
    return (
        <div className=' flex  flex-col gap-3 max-w-[450px] bg-richblack-400 border border-richblack-500 h-[400px] p-4 rounded-2xl'>
            <div className='flex gap-2 justify-start place-items-baseline '>
                <IoChatbubblesOutline />
                <div>
                    <p className='font-semibold text-lg'>Chat on us</p>
                    <p>Our friendly team is here to help.</p>
                    <p>info@studynotion.com</p>
                </div>
            </div>

            <div className='flex gap-2 justify-start place-items-baseline'>
                <FaEarthAfrica />
                <div>
                    <p className='font-semibold text-lg'>Visit us</p>
                    <p>Come and say hello at our office HQ.</p>
                    <p>Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016</p>
                </div>
            </div>
            <div className='flex gap-2 justify-start place-items-baseline '>

                <LuPhoneCall />
                <div>
                    <p className='font-semibold text-lg'>Call us</p>
                    <p>Mon - Fri From 8am to 5pm
                    </p>
                    <p>+123 456 7869</p>
                </div>
            </div>

        </div>
    )
}

export default ContactUsDetail