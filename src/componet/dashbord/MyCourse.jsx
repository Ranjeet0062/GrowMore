import React, { useEffect, useState } from 'react'
import IconBtn from '../IconBtn'
import { HiOutlinePlus } from "react-icons/hi"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import CourseTable from './CourseTable'
import { useDispatch } from 'react-redux'
import {setCourse, setEditCourse} from "../../redux/slices/course.slice"
function MyCourse() {
    const navigate = useNavigate()
    const dispatch=useDispatch();
    const [courseInMycuorse, setCourseInMycourse] = useState([]);
    const getInstructor = async () => {
        await axios.get(`${import.meta.env.VITE_BASE_URL}/course/api/getInstructorCourses`,{withCredentials:true})
            .then((res) => {
                console.log("hello hello hello",res.data.data)
                setCourseInMycourse(res.data.data);
               
            }).catch((error) => {
                console.log("something went to wrong in mycourse...", error)
            })
    }
    useEffect(() => {
        getInstructor();
        console.log("sdfhjkjsdfklsdfgfkdlj",courseInMycuorse)
    }, [])
    return (
        <>
            <div className='flex justify-between'>
                <h1 className="mb-14 text-3xl font-medium text-richblack-5">
                    My Profile
                </h1>
                <div>
                    <IconBtn text={"Add Course"}>
                        <HiOutlinePlus />
                    </IconBtn>
                </div>
            </div>
            <div>
                {courseInMycuorse && <CourseTable courses={courseInMycuorse} setCourses={setCourseInMycourse} />}

            </div>
        </>
    )
}

export default MyCourse