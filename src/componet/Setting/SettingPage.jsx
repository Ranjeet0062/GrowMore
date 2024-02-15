import React from 'react'
import UpdateProfilePhoto from './UpdateProfilePhoto'
import { useSelector } from 'react-redux'
import IconBtn from '../IconBtn';

function SettingPage() {
 
  return (
    <>
      <h1 className='mb-14 text-3xl font-medium text-richblack-5'>Edit Profile</h1>
      <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
       <UpdateProfilePhoto/>
      </div>
    </>
  )
}

export default SettingPage