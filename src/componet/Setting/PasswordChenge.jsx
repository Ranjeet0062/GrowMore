import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { changePassword } from "../../services/opration/setting"
import IconBtn from "../IconBtn"
function PasswordChenge() {
   
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const submitProfileForm = async (data) => {
        console.log("Form Data - ", data)
        try {
            dispatch(changePassword(token, data))
        } catch (error) {
            console.log("ERROR MESSAGE - ", error.message)
        }
    }
    return (
        <form onSubmit={handleSubmit(submitProfileForm)} className="w-full">
            {/* Profile Information */}
            <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                <h2 className="text-lg font-semibold text-richblack-5">
                    Chenge Password
                </h2>
                <div className="flex flex-col gap-5 lg:flex-row">
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="oldPassword" className="lable-style text-richblack-5 font-semibold">
                            Old password
                        </label>
                        <input
                            type="password"
                            name="oldPassword"
                            id="oldPassword"
                            placeholder="Enter oldpassword"
                            className="rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none;"
                            {...register("oldPassword", { required: true })}

                        />
                        {errors.oldPassword && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Please enter oldPassword.
                            </span>
                        )}
                    </div>
                   
                </div>

                <div className="flex flex-col gap-5 lg:flex-row">
                <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="newPassword" className="lable-style text-richblack-5 font-semibold">
                            newPassword
                        </label>
                        <input
                            type="password"
                            name="newPassword"
                            id="newPassword"
                            placeholder="Enter newpassword"
                            className="rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none;"
                            {...register("newPassword", {
                                required: {
                                    value: true,
                                    message: "Please enter your confirmNewPassword.",
                                },
                            })}

                        />
                        {errors.newPassword && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Please enter newPassword.
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="confirmNewPassword" className="lable-style text-richblack-5 font-semibold">
                            confirmNewPassword
                        </label>
                        <input
                            type="password"
                            name="confirmNewPassword"
                            id="confirmNewPassword"
                            placeholder='confirmNewPassword'
                            className="rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none;"
                            {...register("confirmNewPassword", {
                                required: {
                                    value: true,
                                    message: "Please enter your confirmNewPassword.",
                                },
                            })}
                        />
                        {errors.confirmNewPassword && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                {errors.dateOfBirth.message}
                            </span>
                        )}
                    </div>
                </div>

                {/* <div className="flex flex-col gap-5 lg:flex-row">
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="contactNumber" className="lable-style text-richblack-5">
                            Contact Number
                        </label>
                        <input
                            type="tel"
                            name="contactNumber"
                            id="contactNumber"
                            placeholder="Enter Contact Number"
                            className="rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none;"
                            {...register("contactNumber", {
                                required: {
                                    value: true,
                                    message: "Please enter your Contact Number.",
                                },
                                maxLength: { value: 12, message: "Invalid Contact Number" },
                                minLength: { value: 10, message: "Invalid Contact Number" },
                            })}
                            defaultValue={user?.additionalDetails?.contactNumber}
                        />
                        {errors.contactNumber && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                {errors.contactNumber.message}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor="about" className="lable-style text-richblack-5">
                            About
                        </label>
                        <input
                            type="text"
                            name="about"
                            id="about"
                            placeholder="Enter Bio Details"
                            className="rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none;"
                            {...register("about", { required: true })}
                            defaultValue={user?.additionalDetails?.about}
                        />
                        {errors.about && (
                            <span className="-mt-1 text-[12px] text-yellow-100">
                                Please enter your About.
                            </span>
                        )}
                    </div>
                </div> */}
            </div>

            <div className="flex justify-end gap-2">
                <button
                    onClick={() => {
                        navigate("/dashboard/my-profile")
                    }}
                    className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                >
                    Cancel
                </button>
                <IconBtn type="submit" text="Save" />
            </div>
        </form>
    )
}

export default PasswordChenge