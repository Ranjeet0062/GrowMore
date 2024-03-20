import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoAddCircleOutline } from "react-icons/io5"
import IconBtn from "../../../IconBtn"
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setCourse } from "../../../../redux/slices/course.slice"
import toast from 'react-hot-toast'
import NestedView from './NestedView'
import { setEditCourse,setStep } from '../../../../redux/slices/course.slice'
import {MdNavigateNext } from "react-icons/md"
function CourseBuilderForm() {
    const dispatch = useDispatch()
    const { course } = useSelector((state) => state.course);
    const [editSectionName, seteditSectionName] = useState(null)
    const [loading, setloading] = useState(false)
    console.log("course nnnnnnnnnnn",course)
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm()
    const onsubmit = async (data) => {
        try {
            setloading(true);
            const toastID = toast.loading("Loading...")
            console.log("inside onsubmit")
            console.log("editsectionName", editSectionName);
            if (editSectionName) {
                await axios.put(`${import.meta.env.VITE_BASE_URL}/section/api/updateSection`, {
                    sectionName: data.sectionName,
                    sectionId: editSectionName,
                    courseId: course._id
                },
                    { withCredentials: true }
                ).then((res) => {
                    setValue("sectionName", "")
                    console.log("res.data.data", res.data.data)
                    dispatch(setCourse(res.data.data))
                    toast.success("Section updated successfully")
                }).catch((error) => {
                    console.log("something went wrong while updating section", error)
                })
                seteditSectionName(null)
                setloading(false);
                toast.dismiss(toastID)
                return
            }
            console.log("colling db")
            await axios.post(`${import.meta.env.VITE_BASE_URL}/section/api/createSection`, {
                sectionName: data.sectionName,
                courseId: course._id
            },
                { withCredentials: true }
            ).then((res) => {
                setValue("sectionName", "")
                console.log("section created", res.data.data)
                dispatch(setCourse(res.data.data))
                toast.success("section created successfully")
            }).catch((error) => {
                console.log("something went wrong while creating section", error)
            })
            console.log("after finishing onsubmit")
            toast.dismiss(toastID)
            setloading(false);
        } catch (error) {
            console.log("something went wrong while onsubmit function", error)
        }
    }
    const cancelEdit = () => {
        seteditSectionName(null)
        setValue("sectionName", "")
    }
    const hendaleOnchengeSection = (sectionId, sectionName) => {
        if (editSectionName === sectionId) {
            cancelEdit();
            return
        }
        console.log("section id", sectionId)
        seteditSectionName(sectionId)
        setValue("sectionName", sectionName);
    }
    const goToNext = () => {
        if (course.courseContent.length === 0) {
            toast.error("Please add atleast one section")
            return
        }
        if (
            course.courseContent.some((section) => section.subSection.length === 0)
        ) {
            toast.error("Please add atleast one lecture in each section")
            return
        }
        dispatch(setStep(3))
    }
    const goBack = () => {
        dispatch(setStep(1))
        dispatch(setEditCourse(true))
    }
    return (
        <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
            <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>
            <form onSubmit={handleSubmit(onsubmit)}>
                <div className="flex flex-col space-y-2">
                    <label className='text-white ' htmlFor='sectionName'>Section name<sup className='text-pink-400'>*</sup></label>
                    <input
                        id="sectionName"
                        placeholder='Add section to build your course'
                        {...register('sectionName', { required: true })}
                        className="form-style w-full"
                    />
                    {
                        errors.sectionName && (
                            <span>section name is required</span>
                        )
                    }
                </div>
                <div className="flex items-end gap-x-4">
                    <IconBtn
                        type="submit"
                        disabled={loading}
                        text={editSectionName ? "Edit Section Name" : "Create Section"}
                        outline={true}
                    >
                        <IoAddCircleOutline size={20} className="text-yellow-50" />
                    </IconBtn>
                    {editSectionName && (
                        <button
                            type="button"
                            onClick={cancelEdit}
                            className="text-sm text-richblack-300 underline"
                        >
                            Cancel Edit
                        </button>
                    )}
                </div>
            </form>
            {course?.courseContent?.length > 0 ? < NestedView hendaleOnchengeSection={hendaleOnchengeSection} /> : (<div></div>)
            }
            <div className="flex justify-end gap-x-3">
                <button
                    onClick={goBack}
                    className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
                >
                    Back
                </button>
                <IconBtn disabled={loading} text="Next" onclick={goToNext}>
                    <MdNavigateNext />
                </IconBtn>
            </div>
        </div>
    )
}

export default CourseBuilderForm