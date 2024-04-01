import React, { useEffect, useState } from 'react'
import IconBtn from '../IconBtn'
import { HiOutlinePlus } from "react-icons/hi"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import CourseTable from './CourseTable'
import { useDispatch } from 'react-redux'
import { setCourse, setEditCourse } from "../../redux/slices/course.slice"
function MyCourse() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [courseInMycuorse, setCourseInMycourse] = useState([]);
    const getInstructor = async () => {
        await axios.get(`${import.meta.env.VITE_BASE_URL}/course/api/getInstructorCourses`, { withCredentials: true })
            .then((res) => {
                setCourseInMycourse(res.data.data);

            }).catch((error) => {
                console.log("something went to wrong in mycourse...", error)
            })
    }
    useEffect(() => {
        function checkTokenInCookie() {
            // Get all cookies
            const cookies = document.cookie.split(';');

            // Loop through cookies to find the one containing the token
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();

                // Check if the cookie contains the token
                if (cookie.startsWith('token=')) {
                    // Token exists in the cookie
                    return true;
                }
            }

            // Token does not exist in the cookie
            return false;
        }

        // Example usage
        if (checkTokenInCookie()) {
            console.log('Token exists in the cookie');
        } else {
            console.log('Token does not exist in the cookie');
        }
        getInstructor();
    }, [])
    return (
        <>
            <div className='flex justify-between'>
                <h1 className="mb-14 text-3xl font-medium text-richblack-5">
                    My Profile
                </h1>
                <div>
                    <IconBtn text={"Add Course"} onclick={() => { navigate("/dashboard/add-course") }} >
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